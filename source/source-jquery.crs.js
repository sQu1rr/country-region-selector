/**
 * country-region-selector
 * -----------------------
 * <%=__VERSION__%>
 * @author Ben Keen
 * @repo https://github.com/benkeen/country-region-selector
 * @licence MIT
 */
(function(root, factory) {
  if (typeof define === 'function' && define.amd) {
    // AMD. Register as an anonymous module
    define([], factory);
  } else if (typeof exports === 'object') {
    // Node. Does not work with strict CommonJS, but only CommonJS-like environments that support module.exports,
    // like Node
    module.exports = factory(require());
  } else {
    // browser globals (root is window)
    root.crs = factory(root);
  }
}(this, function() {
	"use strict";

	var _countryClass = "crs-country";
	var _defaultCountryStr = "Select country";
	var _defaultRegionStr = "Select region";

  // included during grunt build step (run `grunt generate` on the command line)
  //<%=__DATA__%>

	var _init = function() {
		$("." + _countryClass).each(_populateCountryFields);
	};

	var _populateCountryFields = function() {
		var countryElement = this;

    // ensure the dropdown only gets initialized once
    var loaded = countryElement.getAttribute("data-crs-loaded");
    if (loaded === "true") {
      return;
    }

    countryElement.length = 0;
		var customOptionStr = $(countryElement).attr("data-default-option");
		var defaultOptionStr = customOptionStr ? customOptionStr : _defaultCountryStr;

		var defaultSelectedValue = $(countryElement).attr("data-default-value");
		var customValue = $(countryElement).attr("data-value");
		var foundIndex = 0;

		this.options[0] = new Option(defaultOptionStr, '');
		for (var i=0; i<_data.length; i++) {
			var val = (customValue === "2-char") ? _data[i][1] : _data[i][0];
			countryElement.options[countryElement.length] = new Option(_data[i][0], val);

			if (defaultSelectedValue != null && defaultSelectedValue === val) {
				foundIndex = i + 1; // needed to offset the default option
			}
		}
		this.selectedIndex = foundIndex;

		var regionID = $(countryElement).attr("data-region-id");
		if (regionID) {
			var regionElement = $("#" + regionID)[0];
			if (regionElement) {
				_initRegionField(regionElement);

				$(this).on("change", function() {
					_populateRegionFields(countryElement, regionElement);
				});

				// if the country dropdown has a default value, populate the region field as well
				if (defaultSelectedValue) {
					_populateRegionFields(countryElement, regionElement);

					var defaultRegionSelectedValue = $(regionElement).attr("data-default-value");
					if (defaultRegionSelectedValue !== null) {
						var data = _data[countryElement.selectedIndex-1][2].split("|");
						_setDefaultRegionValue(regionElement, data, defaultRegionSelectedValue);
					}
				}
			} else {
				console.error("Region dropdown DOM node with ID " + regionID + " not found.");
			}
		}

    countryElement.setAttribute("data-crs-loaded", "true");
	};

	var _initRegionField = function(el) {
		var customOptionStr = $(el).attr("data-blank-option");
		var defaultOptionStr = customOptionStr ? customOptionStr : "-";
		el.length = 0;
		el.options[0] = new Option(defaultOptionStr, "");
		el.selectedIndex = 0;
	};

	var _setDefaultRegionValue = function(field, data, val) {
		for (var i=0; i<data.length; i++) {
			if (data[i] === val) {
				field.selectedIndex = i+1;
				break;
			}
		}
	};

	var _populateRegionFields = function(countryElement, regionElement) {
		var selectedCountryIndex = countryElement.selectedIndex-1;

		var customOptionStr = $(regionElement).attr("data-default-option");
		var defaultOptionStr = customOptionStr ? customOptionStr : _defaultRegionStr;
        var dataValue = regionElement.getAttribute("data-value");
        var abbreviate = dataValue === "abbr";

		if (countryElement.value === "") {
			_initRegionField(regionElement);
		} else {
			regionElement.length = 0;
			regionElement.options[0] = new Option(defaultOptionStr, '');

			var regions = _data[selectedCountryIndex][2].split("|");
			for (var i=0; i<regions.length; i++) {
                var region = regions[i];
                var value = region;
                if (region.search('~') !== -1) {
                    var split = region.split('~');
                    region = value = split[0];
                    if (abbreviate) value = split[1];
                }
				regionElement.options[regionElement.length] = new Option(region, value);
			}

			regionElement.selectedIndex = 0;
		}
	};

	$(_init);

  return {
    init: _init
  };

}));
