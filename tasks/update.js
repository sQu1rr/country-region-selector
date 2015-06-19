module.exports = function (grunt) {
    "use strict";

    const cachePath = './cache/data-synced.json';
    const cachePathPart = './cache/data-synced.part.json';

    let request = require('request');
    let fs = require('fs');

    const countryMappings = {
        'CW': 'Curaçao',
        'BA': 'Bosnia and Herzegovina',
        'CG': 'Congo, Republic of the (Brazzaville)',
        'CD': 'Congo, the Democratic Republic of the',
        'FM': 'Micronesia, Federated States of',
        'GM': 'Gambia, The',
        'IR': 'Iran, Islamic Republic of',
        'KP': "Korea, Democratic People's Republic of (North)",
        'KR': 'Korea, Republic of (South)',
        'LA': "Lao People's Democratic Republic",
        'MK': 'Macedonia, Republic of', // Former Yugoslav was for UN
        'RU': 'Russian Federation',
        'SY': 'Syrian Arab Republic',
        'TW': 'Taiwan, Republic of China', // Official name
        'TZ': 'Tanzania, United Republic of',
        'VE': 'Venezuela, Bolivarian Republic of',
        'AR': 'Argentina',
        'AI': 'Anguilla',
        'VG': 'Virgin Islands, British',
        'TL': 'Timor-Leste',
        'FK': 'Falkland Islands (Islas Malvinas)',
        'TF': 'French Southern and Antarctic Lands',
        'CI': "Côte d'Ivoire, Republic of",
        'PS': 'Palestine, State of',
        'EH': 'Western Sahara',
        'BL': 'Saint Barthélemy',
        'MF': 'Saint Martin (French part)',
        'PM': 'Saint Pierre and Miquelon',
        'SH': 'Saint Helena, Ascension and Tristan da Cunha',
        'SX': 'Sint Maarten (Dutch part)',
        'VI': 'Virgin Islands, U.S.',
    };

    let regionMappings = {};

    grunt.registerTask('update', 'Update data file', function () {
        let done = this.async();
        const url = 'http://www.mapanet.eu/EN/Resources/Admin-Regions.asp';

        // read from cache
        if (grunt.file.exists(cachePath)) {
            let countries = grunt.file.readJSON(cachePath);
            parse(grunt, countries);
            compare(grunt, countries);
            save(countries);
            return done();
        }
        
        grunt.log.writeln('Loading country page');
        request.get(url, function (error, response, page) {
            if (error || response.statusCode != 200) {
                grunt.fail.fatal('Cannot fetch file "' + url + '"');
            }
            grunt.log.writeln('Country page loaded');
            parsePage(grunt, page, done);
        });
    });

    function parse(grunt, countries) {
        for (let code in countries) {
            let country = countries[code];
            if (countryMappings[code]) {
                country.name = countryMappings[code];
            }

            if (!Object.keys(country.regions).length) {
                country.regions[country.name] = code;
            }

            for (let region in country.regions) {
                let rcode = country.regions[region];
                if (rcode.search(code + '-') !== -1) {
                    rcode = country.regions[region] = rcode.replace(
                        code + '-', ''
                    );
                }
                if (regionMappings[code]) {
                    // change the name
                }
            }
        }
    }

    function parsePage(grunt, page, done) {
        const url = 'http://www.mapanet.eu/EN/Resources/Admin-Regions-2.asp?C='

        let Q = require('q');
        let cheerio = require('cheerio');
        
        let progress = {};
        let countries = {};
        let requests = [];

        if (grunt.file.exists(cachePathPart)) {
            countries = grunt.file.readJSON(cachePathPart);
        }

        let $ = cheerio.load(page);
        let $table = $('table.tbl tr').each(function () {
            let $tr = $(this);
            let $tds = $tr.find('td');
            if ($tds.length == 0) return;

            let countryCode = $tds.eq(1).text().trim();
            let countryName = $tds.eq(2).text().trim();

            if (countries[countryCode]) return; // cached already

            let country = {
                name: countryName,
                regions: {}
            };
            progress[countryCode] = false;
            countries[countryCode] = country;

            let def = Q.defer();
            grunt.log.writeln('Loading "' + countryName + '" page');
            request.get(url + countryCode, function (error, response, page) {
                if (error || response.statusCode != 200) {
                    grunt.fail.fatal('Cannot fetch file "' + url + '"');
                    def.reject();
                }
                progress[countryCode] = true;
                showProgress(countryName, progress);
                let $ = cheerio.load(page);

                let $table = $('table.tbl tr').each(function () {
                    let $tr = $(this);
                    let $tds = $tr.find('td');
                    if ($tds.length == 0) return;

                    let regionCode = $tds.eq(1).text().trim();
                    let regionName = $tds.eq(2).text().trim()
                        .replace(/\s*\(.*$/, '');
                    let regionIso = $tds.eq(3).text().trim();

                    country.regions[regionName] = regionIso || regionCode;
                });

                // save temp file since the server can't handle so many
                // requests i have to ctrl+c from the update :(
                fs.writeFileSync(cachePathPart, JSON.stringify(countries));
                def.resolve();
            });
            requests.push(def.promise);
        });

        Q.all(requests).then(function () {
            fs.writeFileSync(cachePath, JSON.stringify(countries));
            if (grunt.file.exists(cachePart)) {
                fs.unlinkSync(cachePathPart);
            }
            parse(grunt, countries);
            compare(grunt, countries);
            save();
            done();
        });
    }

    function showProgress(name, progress) {
        let p = Object.keys(progress).filter(function (key) {
            return !progress[key];
        });
        grunt.log.write(
            '"' + name + '" page loaded (' + p.length + ' left)'
        );
        if (p.length < 5) {
            grunt.log.writeln(': ' + p.join(', '));
        }
        else grunt.log.writeln();
    }

    function loadCurrentCountries(grunt) {
        const path = 'source/data-with-abbrev.js';
        if (!grunt.file.exists(path)) {
            grunt.fail.fatal('Cannot read current countries: "' + path + '"');
        }
        let file = grunt.file.read(path);
        let startIndex = file.search(/\[/) - 1;
        file = file.substr(startIndex, file.search(/;/) - startIndex);

        let json = JSON.parse(file);

        let countries = {};
        json.forEach(function (country) {
            let countryName = country[0],
                countryCode = country[1];
            let regions = {};

            country[2].split('|').forEach(function (region) {
                let regionName = null,
                    regionCode = null;
                if (region.search('~') !== -1) {
                    let regionSplit = region.split('~');
                    regionName = regionSplit[0];
                    regionCode = regionSplit[1];
                }
                else {
                    regionName = region;
                }
                regions[regionName] = regionCode;
            });

            countries[countryCode] = {
                name: countryName,
                regions: regions
            };
        });
        return countries;
    }

    function compare(grunt, countries) {
        let currentCountries = loadCurrentCountries(grunt);

        let keys = Object.keys(countries),
            currentKeys = Object.keys(currentCountries);

        if (keys.length != currentKeys.length) {
            let added = keys.filter(function (key) {
                return currentKeys.indexOf(key) < 0;
            });
            if (added.length) {
                title('New Countries');
                print(countries, added);
            }

            let removed = currentKeys.filter(function (key) {
                return keys.indexOf(key) < 0;
            });
            if (removed.length) {
                title('Removed Countries');
                print(currentCountries, removed);
            }
        }

        title('By-Country changes');
        let changedCountries = [];
        keys.forEach(function (key) {
            let country = countries[key],
                current = currentCountries[key];

            if (!current) return;

            country.changes = { regions: {} };
            if (country.name != current.name) {
                country.changes.name = current.name;
            }

            let keys = Object.keys(country.regions),
                currentKeys = Object.keys(current.regions),
                added = [],
                removed = [],
                changed = []

            let merged = keys.concat(currentKeys)
            merged = merged.filter(function (item, pos) {
                return merged.indexOf(item) === pos;
            }).sort();

            merged.forEach(function (key) {
                var code = country.regions[key] || current.regions[key];
                var similar = findSimilar(key, code, current.regions);
                if (!similar) {
                    var info = {
                        action: 'added',
                        name: key,
                        code: country.regions[key]
                    }
                }
                else if (!findSimilar(key, code, country.regions)) {
                    var info = {
                        action: 'removed',
                        name: key,
                        code: current.regions[key]
                    }
                }
                else if (keys.indexOf(key) !== -1 &&
                         (current.regions[key] != country.regions[key] ||
                         similar != key)) {
                    var info = {
                        action: 'changed',
                        name: key,
                        before: {
                            code: current.regions[key] || '--',
                            name: similar
                        },
                        after: {
                            code: country.regions[key] || '--',
                            name: key
                        }
                    }
                }
                if (info) {
                    if (!info.code) info.code = '--';
                    country.changes.regions[key] = info;
                }
            });

            if (country.changes.name || country.changes.regions.length) {
                changedCountries.push(key);
            }
        });
        print(countries, changedCountries);
    }

    function title(title) {
        let line = ': ' + new Array(79 - title.length).join('-');
        title = grunt.log.wordlist([title + line], { color: 'yellow' });
        grunt.log.writeln(title);
    }

    function print(countries, keys) {
        keys.forEach(function (key) {
            let country = countries[key];
            let name = '[' + key + '] ' + country.name + ':';
            name = grunt.log.wordlist([name], { color: 'cyan' });
            grunt.log.writeln(name);

            let changes = country.changes;
            let changed = changes && (changes.name || changes.regions.length);


            if (changed && changes.name) {
                let oldName = grunt.log.wordlist([changes.name], {
                    color: 'red'
                });
                let newName = grunt.log.wordlist([country.name], {
                    color: 'green'
                });
                grunt.log.writeln('\t' + oldName + ' => ' + newName);
                if (Object.keys(changes.regions).length) grunt.log.writeln();
            }

            let regions = country.regions;
            if (changed) regions = changes.regions;
            
            for (let region in regions) {
                if (!changed) {
                    let code = country.regions[region];
                    grunt.log.writeln('\t[' + code + '] ' + region);
                }
                else {
                    let info = regions[region];
                    if (info.action == 'removed') {
                        var line = '- ' + grunt.log.wordlist([
                            '[' + info.code + '] ' + info.name
                        ], {
                            color: 'red'
                        });
                    }
                    else if (info.action == 'added') {
                        var line = '+ ' + grunt.log.wordlist([
                            '[' + info.code + '] ' + info.name
                        ], {
                            color: 'green'
                        });
                    }
                    else if (info.action == 'changed') {
                        let before = grunt.log.wordlist([
                            '[' + info.before.code + '] ' + info.before.name
                        ], {
                            color: 'red'
                        });

                        let color = 'green';
                        if (info.before.code != info.after.code) {
                            color = 'yellow'
                        }
                        let after = '[' + info.after.code + '] ';
                        after = grunt.log.wordlist([after], { color: color });

                        color = 'green';
                        if (info.before.name != info.after.name) {
                            color = 'yellow'
                        }
                        let name = info.after.name;
                        name = grunt.log.wordlist([name], { color: color });
                        after += name;

                        var line = '  ' + before + ' => ' + after;
                    }
                    grunt.log.writeln('\t' + line);
                }
            }
        });
    }

    function stripAccent(str) {
        const from = "àáäâáèéëêìíïîòóöôùúüûñç·";
        const to   = "aaaaaeeeeiiiioooouuuunc ";

        str = str.trim().toLowerCase().replace('county', '')
            .replace('city', '').replace('gwangyoksi', '')
            .replace("t'ukpyolsi", '').replace(/-do$/g, '')
            .replace(/[\W\s]/g, '');

        for(let i = 0, l = from.length ; i < l ; i++) {
            str = str.replace(new RegExp(from.charAt(i), 'g'), to.charAt(i));
        }

        return str;
    }

    function findSimilar(name, code, regions) {
        if (regions[name]) return name;

        let Levenshtein = require('levenshtein');

        name = stripAccent(name);
        for (let regionName in regions) {
            if (regions[regionName] == code) return regionName;

            let regionText = stripAccent(regionName);
            if (name == regionText) return regionName

            let lev = new Levenshtein(regionText, name);

            if (lev.distance < 3) return regionName;
        }
        return false;
    }

    function save(countries) {
        let data = [];
        let dataAbbr = [];
        for (let code in countries) {
            let country = countries[code];
            let regions = [];
            let regionsAbbr = [];
            for (let region in country.regions) {
                let code = country.regions[region];
                regions.push(region);
                regionsAbbr.push(region + '~' + code);
            }
            let line = [ country.name, code, regions.join('|') ];
            let lineAbbr = [ country.name, code, regionsAbbr.join('|') ];
            data.push('\n  ["' + line.join('","') + '"]');
            dataAbbr.push('\n  ["' + lineAbbr.join('","') + '"]');
        }
        fs.writeFileSync(
            './source/data.js',
            '\nvar _data = [' + data.join(',') + '\n];'
        );
        fs.writeFileSync(
            './source/data-with-abbrev.js',
            '\nvar _data = [' + dataAbbr.join(',') + '\n];'
        );
    }
};
