/**
 * country-region-selector
 * -----------------------
 * 0.1.7
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
  //
var _data = [
  ["Afghanistan","AF","Badakhshan~BDS|Badghis~BDG|Baghlan~BGL|Balkh~BAL|Bamyan~BAM|Daykundi~DAY|Farah~FRA|Faryab~FYB|Ghazni~GHA|Ghor~GHO|Helmand~HEL|Herat~HER|Jawzjan~JOW|Kabul~KAB|Kandahar~KAN|Kapisa~KAP|Khost~KHO|Kunahra~KNR|Kunduz~KDZ|Laghman~LAG|Logar~LOW|Nangarhar~NAN|Nimroz~NIM|Nooristan~NUR|Paktia~PIA|Paktika~PKA|Panjsher~PAN|Parwan~PAR|Samangan~SAM|Sar-I-Pul~SAR|Takhar~TAK|Urozgan~ORU|Wardak~WAR|Zabul~ZAB"],
  ["Åland Islands","AX","Ålands~FI-AL"],
  ["Albania","AL","Berat~01|Dibër~09|Durrës~02|Elbasan~03|Fier~04|Gjirokastër~05|Korçë~06|Kukës~07|Lezhë~08|Shkodër~10|Tiranë~11|Vlorë~12"],
  ["Algeria","DZ","Adrar~01|Aïn Defla~44|Aïn Témouchent~46|Alger~16|Annaba~23|Batna~05|Béchar~08|Béjaïa~06|Biskra~07|Blida~09|Bordj Bou Arréridj~34|Bouira~10|Boumerdès~35|Chlef~02|Constantine~25|Djelfa~17|El Bayadh~32|El Oued~39|El Taref~36|Ghardaïa~47|Guelma~24|Illizi~33|Jijel~18|Khenchela~40|Laghouat~03|Mascara~29|Médéa~26|Mila~43|Mostaganem~27|M'Sila~28|Naâma~45|Oran~31|Ouargla~30|Oum el Bouaghi~04|Relizane~48|Saïda~20|Sétif~19|Sidi Bel Abbès~22|Skikda~21|Souk Ahras~41|Tamanrasset~11|Tébessa~12|Tiaret~14|Tindouf~37|Tipaza~42|Tissemsilt~38|Tizi Ouzou~15|Tlemcen~13"],
  ["American Samoa","AS","American Samoa~AS"],
  ["Andorra","AD","Andorra La Vella~07|Canillo~02|Encamp~03|Escaldes-Engordany~08|La Massana~04|Ordino~05|Sant Julià de Lòria~06"],
  ["Angola","AO","Bengo~BGO|Benguela~BGU|Bié~BIE|Cabinda~CAB|Cuando Cubango~CCU|Cuanza Norte~CNO|Cuanza Sul~CUS|Cunene~CNN|Huambo~HUA|Huíla~HUI|Luanda~LUA|Lunda Norte~LNO|Lunda Sul~LSU|Malanje~MAL|Moxico~MOX|Namibe~NAM|Uíge~UIG|Zaire~ZAI"],
  ["Anguilla","AI","Anguilla~01|Anguillita Island~02|Blowing Rock~03|Cove Cay~04|Crocus Cay~05|Deadman's Cay~06|Dog Island~07|East Cay~08|Little Island~09|Little Scrub Island~10|Mid Cay~11|North Cay~12|Prickly Pear Cays~13|Rabbit Island~14|Sandy Island/Sand Island~15|Scilly Cay~16|Scrub Island~17|Seal Island~18|Sombrero/Hat Island~19|South Cay~20|South Wager Island~21|West Cay~22"],
  ["Antarctica","AQ","Australian Antarctic Territory~AQ"],
  ["Antigua and Barbuda","AG","Antigua Island~01|Barbuda Island~02|Bird Island~04|Bishop Island~05|Blake Island~06|Crump Island~09|Dulcina Island~10|Exchange Island~11|Five Islands~12|Great Bird Island~13|Green Island~14|Guiana Island~15|Hawes Island~17|Hells Gate Island~16|Henry Island~18|Johnson Island~19|Kid Island~20|Lobster Island~22|Maiden Island~24|Moor Island~25|Nanny Island~26|Pelican Island~27|Prickly Pear Island~28|Rabbit Island~29|Red Head Island~31|Redonda Island~03|Sandy Island~32|Smith Island~33|The Sisters~34|Vernon Island~35|Wicked Will Island~36|York Island~37"],
  ["Argentina","AR","Buenos Aires~B|Capital Federal~C|Catamarca~K|Chaco~H|Chubut~U|Córdoba~X|Corrientes~W|Entre Ríos~E|Formosa~P|Jujuy~Y|La Pampa~L|La Rioja~F|Mendoza~M|Misiones~N|Neuquén~Q|Río Negro~R|Salta~A|San Juan~J|San Luis~D|Santa Cruz~Z|Santa Fe~S|Santiago del Estero~G|Tierra del Fuego~V|Tucumán~T"],
  ["Armenia","AM","Aragatsotn~AG|Ararat~AR|Armavir~AV|Gegharkunik~GR|Kotayk~KT|Lori~LO|Shirak~SH|Syunik~SU|Tavush~TV|Vayots Dzor~VD|Yerevan~ER"],
  ["Aruba","AW","Aruba~AW"],
  ["Australia","AU","Australian Antarctic Territory~AQ|Australian Capital Territory~ACT|Christmas Island~CX|Cocos~CC|Heard Island~HM|Jervis Bay Territory~AQ|McDonald Islands~HM|New South Wales~NSW|Norfolk Island~NF|Northern Territory~NT|Queensland~QLD|South Australia~SA|Tasmania~TAS|Victoria~VIC|Western Australia~WA"],
  ["Austria","AT","Burgenland~1|Kärnten~2|Niederösterreich~3|Oberösterreich~4|Salzburg~5|Steiermark~6|Tirol~7|Vorarlberg~8|Wien~9"],
  ["Azerbaijan","AZ","Abşeron~BA|Daglig-Shirvan~SR|Gəncə-Qazax~GA|Kəlbəcər-Laçın~KAL|Kur~KUR|Lənkəran-Astara~LA|Nagorno-Karabakh~KAL|Naxçıvan~NX|Orta Kur~07|Quba-Xaçmaz~QBA|Şəki-Zaqatala~SAK|Yukhari-Karabakh~10"],
  ["Bahamas","BS","Acklins Island~01|Berry Islands~22|Bimini~02|Black Point~23|Cat Island~03|Central Abaco~24|Crooked Island and Long Cay~28|East Grand Bahama~29|Exuma~04|Freeport~05|Fresh Creek~06|Governor's Harbour~07|Green Turtle Cay~08|Harbour Island~09|High Rock~10|Inagua~11|Kemps Bay~12|Long Island~13|Marsh Harbour~14|Mayaguana~15|Moore’s Island~40|New Providence~16|Nichollstown and Berry Islands~17|North Abaco~42|North Andros~41|North Eleuthera~33|Ragged Island~18|Rock Sound~19|San Salvador and Rum Cay~20|Sandy Point~21|South Abaco~35|South Andros~36|South Eleuthera~37|West Grand Bahama~39"],
  ["Bahrain","BH","Al Manama~03|Middle~12|Muharraq~02|Northern~05|Southern~09"],
  ["Bangladesh","BD","Barisal~A|Chittagong~B|Dhaka~C|Khulna~D|Rajshahi~E|Rangpur~F|Sylhet~G"],
  ["Barbados","BB","Christ Church~01|Saint Andrew~02|Saint George~03|Saint James~04|Saint John~05|Saint Joseph~06|Saint Lucy~07|Saint Michael~08|Saint Peter~09|Saint Philip~10|Saint Thomas~11"],
  ["Belarus","BY","Brest voblast~BR|Gorod Minsk~HO|Homiel voblast~HO|Hrodna voblast~HR|Mahilyow voblast~MA|Minsk voblast~MI|Vitsebsk voblast~VI"],
  ["Belgium","BE","Bruxelles-Capitale~BRU|Région Flamande~VLG|Région Wallonië~WAL"],
  ["Belize","BZ","Belize District~BZ|Cayo District~CY|Corozal District~CZL|Orange Walk District~OW|Stann Creek District~BS-SC|Toledo District~TOL"],
  ["Benin","BJ","Alibori~AL|Atakora~AK|Atlantique~AQ|Borgou~BO|Collines Department~CO|Donga~DO|Kouffo~KO|Littoral Department~LI|Mono Department~MO|Ouémé~OU|Plateau~PL|Zou~ZO"],
  ["Bermuda","BM","City of Hamilton~03|Devonshire Parish~01|Hamilton Parish~02|Paget Parish~04|Pembroke Parish~05|Sandys Parish~08|Smith's Parish~09|Southampton Parish~10|St. George's Parish~07|Town of St. George~06|Warwick Parish~11"],
  ["Bhutan","BT","Bumthang~33|Chhukha~12|Dagana~22|Gasa~GA|Haa~13|Lhuntse~44|Mongar~42|Paro~11|Pemagatshel~43|Punakha~23|Samdrup Jongkhar~45|Samtse~14|Sarpang~31|Thimphu~15|Trashigang~41|Trashiyangtse~TY|Trongsa~32|Tsirang~21|Wangdue Phodrang~24|Zhemgang~34"],
  ["Bolivia","BO","Beni~B|Chuquisaca~H|Cochabamba~C|La Paz~L|Oruro~O|Pando~N|Potosí~P|Santa Cruz~S|Tarija~T"],
  ["Bonaire, Sint Eustatius and Saba","BQ","Bonaire~BO|Saba Isand~SA|Sint Eustatius~SE"],
  ["Bosnia and Herzegovina","BA","Brčko Distrikt~BRC|Federacija Bosne i Hercegovine~BIH|Republika Srpska~SRP"],
  ["Botswana","BW","Central~CE|Ghanzi~GH|Kgalagadi~KG|Kgatleng~KL|Kweneng~KW|North West~NW|North-East~NE|South East~SE|Southern~SO"],
  ["Bouvet Island","BV","Bouvet Island~BV"],
  ["Brazil","BR","Centro-Oeste~05|Nordeste~02|Norte~04|Sudeste~01|Sul~03"],
  ["British Indian Ocean Territory","IO","Chagos Islands~IO"],
  ["Virgin Islands, British","VG","Anegada~VG|Jost Van Dyke~VG|Other Islands~VG|Tortola~VG|Virgin Gorda~VG"],
  ["Brunei Darussalam","BN","Belait~BE|Brunei Muara~BM|Temburong~TE|Tutong~TU"],
  ["Bulgaria","BG","Blagoevgrad~01|Burgas~02|Dobrich~08|Gabrovo~07|Jambol~28|Khaskovo~26|Kjustendil~10|Kurdzhali~09|Lovech~11|Montana~12|Pazardzhik~13|Pernik~14|Pleven~15|Plovdiv~16|Razgrad~17|Ruse~18|Shumen~27|Silistra~19|Sliven~20|Smoljan~21|Sofija~23|Sofija-Grad~22|Stara Zagora~24|Turgovishhe~25|Varna~03|Veliko Turnovo~04|Vidin~05|Vraca~06"],
  ["Burkina Faso","BF","Balé~BAL|Bam/Lake Bam~BAM|Banwa Province~BAN|Bazèga~BAZ|Bougouriba~BGR|Boulgou Province~BLG|Boulkiemdé~BLK|Comoé/Komoe~COM|Ganzourgou Province~GAN|Gnagna~GNA|Gourma Province~GOU|Houet~HOU|Ioba~IOB|Kadiogo~KAD|Kénédougou~KEN|Komondjari~KMD|Kompienga~KMP|Kossi Province~KOS|Koulpélogo~KOP|Kouritenga~KOT|Kourwéogo~KOW|Léraba~LER|Loroum~LOR|Mouhoun~MOU|Namentenga~NAM|Naouri/Nahouri~NAO|Nayala~NAY|Noumbiel~NOU|Oubritenga~OUB|Oudalan~OUD|Passoré~PAS|Poni~PON|Sanguié~SNG|Sanmatenga~SMT|Séno~SEN|Sissili~SIS|Soum~SOM|Sourou~SOR|Tapoa~TAP|Tui/Tuy~TUI|Yagha~YAG|Yatenga~YAT|Ziro~ZIR|Zondoma~ZON|Zoundwéogo~ZOU"],
  ["Burundi","BI","Bubanza~BB|Bujumbura Mairie~BM|Bujumbura Rural~BL|Bururi~BR|Cankuzo~CA|Cibitoke~CI|Gitega~GI|Karuzi~KR|Kayanza~KY|Kirundo~KI|Makamba~MA|Muramvya~MU|Muyinga~MY|Mwaro~MW|Ngozi~NG|Rutana~RT|Ruyigi~RY"],
  ["Cambodia","KH","Banteay Meanchey~1|Battambang~2|Kampong Cham~3|Kampong Chhnang~4|Kampong Speu~5|Kampong Thom~6|Kampot~7|Kandal~8|Koh Kong~9|Kratie~10|Krong Kep~23|Krong Pailin~24|Krong Preah Sihanouk~18|Mondol Kiri~11|Oudor MeanChey~22|Phnom Penh~12|Preah Vihear~13|Prey Veng~14|Pursat~15|RatanaKiri~16|Siem Reap~17|Stung Treng~19|Svay Rieng~20|Takéo~21"],
  ["Cameroon","CM","Adamaoua~AD|Centre~CE|Est~ES|Extrême-Nord~EN|Littoral~LT|Nord~NO|Nord-Ouest~NW|Ouest~OU|Sud~SU|Sud-Ouest~SW"],
  ["Canada","CA","Alberta~AB|British Columbia~BC|Manitoba~MB|New Brunswick~NB|Newfoundland and Labrador~NL|Northwest Territories~NT|Nova Scotia~NS|Nunavut~NU|Ontario~ON|Prince Edward Island~PE|Quebec~QC|Saskatchewan~SK|Yukon Territory~YT"],
  ["Cape Verde","CV","Boa Vista~BV|Brava~BR|Calheta de São Miguel~CS|Maio~MA|Mosteiros~MO|Paúl~PA|Porto Novo~PN|Praia~PR|Ribeira Brava~RB|Ribeira Grande~RG|Sal~SL|Santa Catarina~CA|Santa Cruz~CR|São Domingos~SD|São Filipe~SF|São Nicolau~SN|São Vicente~SV|Tarrafal~TA|Tarrafal de São Nicolau~TS"],
  ["Cayman Islands","KY","Cayman Brac~KY|Grand Cayman~KY|Little Cayman~KY"],
  ["Central African Republic","CF","Bamingui-Bangoran~BB|Bangui~BGF|Basse-Kotto~BK|Haute-Kotto~HK|Haut-Mbomou~HM|Kémo~KG|Lobaye~LB|Mambéré-Kadéï~HS|Mbomou~MB|Nana-Grebizi~10|Nana-Mambéré~NM|Ombella-M'Poko~MP|Ouaka~UK|Ouham~AC|Ouham Péndé~OP|Sangha-Mbaéré~SE|Vakaga~VK"],
  ["Chad","TD","Barh el Gazel~BG|Batha~BA|Borkou~BO|Chari-Baguirmi~CB|Ennedi~EN|Guéra~GR|Hadjer-Lamis~HL|Kanem~KA|Lac~LC|Logone Occidental~LO|Logone Oriental~LR|Mandoul~MA|Mayo-Kebbi Est~ME|Mayo-Kebbi Ouest~MO|Moyen-Chari~MC|N'Djamena~ND|Ouaddaï~OD|Salamat~SA|Sila~SI|Tandjilé~TA|Tibesti~TI|Wadi Fira~WF"],
  ["Chile","CL","Aisén del General Carlos Ibáñez del Campo~AI|Antofagasta~AN|Araucanía~AR|Arica y Parinacota~AP|Atacama~AT|Bío-Bío~BI|Coquimbo~CO|Libertador General Bernardo O'Higgins~LI|Los Lagos~LL|Los Ríos~LR|Magallanes y Antartica Chilena~MA|Marga-Marga~|Maule~ML|Región Metropolitana de Santiago~RM|Tarapacá~TA|Valparaíso~VS"],
  ["China","CN","Anhui~34|Beijing~11|Chongqing~50|Fujian~35|Gansu~62|Guangdong~44|Guangxi~45|Guizhou~52|Hainan~46|Hebei~13|Heilongjiang~23|Henan~41|Hong Kong~91|Hubei~42|Hunan~43|Inner Mongolia~15|Jiangsu~32|Jiangxi~36|Jilin~22|Liaoning~21|Macau~92|Ningxia~64|Qinghai~63|Shaanxi~61|Shandong~37|Shanghai~31|Shanxi~14|Sichuan~51|Tianjin~12|Tibet~54|Xinjiang~65|Yunnan~53|Zhejiang~33"],
  ["Christmas Island","CX","Christmas Island~CX"],
  ["Cocos (Keeling) Islands","CC","Cocos~CC"],
  ["Colombia","CO","Amazonas~AMA|Antioquia~ANT|Arauca~ARA|Archipiélago de San Andrés~SAP|Atlántico~ATL|Bogotá D.C.~DC|Bolívar~BOL|Boyacá~BOY|Caldas~CAL|Caquetá~CAQ|Casanare~CAS|Cauca~CAU|Cesar~CES|Chocó~CHO|Córdoba~COR|Cundinamarca~CUN|Guainía~GUA|Guaviare~GUV|Huila~HUI|La Guajira~LAG|Magdalena~MAG|Meta~MET|Nariño~NAR|Norte de Santander~NSA|Putumayo~PUT|Quindío~QUI|Risaralda~RIS|Santander~SAN|Sucre~SUC|Tolima~TOL|Valle del Cauca~VAC|Vaupés~VAU|Vichada~VID"],
  ["Comoros","KM","Anjouan~A|Grande Comore~G|Mwali~M"],
  ["Congo, Republic of the (Brazzaville)","CG","Bouenza~11|Brazzaville~BZV|Cuvette~8|Cuvette-Ouest~15|Kouilou~5|Lékoumou~2|Likouala~7|Niari~9|Plateaux~14|Pointe-Noire~16|Pool~12|Sangha~13"],
  ["Congo, the Democratic Republic of the","CD","Bandundu~BN|Bas-Congo~BC|Équateur~EQ|Kasaï-Occidental~KE|Kasaï-Oriental~KW|Katanga~KA|Kinshasa~KN|Maniema~MA|Nord-Kivu~NK|Orientale~OR|Sud-Kivu~SK"],
  ["Cook Islands","CK","Cook Islands~CK"],
  ["Costa Rica","CR","Alajuela~2|Cartago~3|Guanacaste~5|Heredia~4|Limón~7|Puntarenas~6|San José~1"],
  ["Croatia","HR","Bjelovarsko-Bilogorska~07|Brodsko-Posavska~12|Dubrovačko-Neretvanska~19|Grad Zagreb~21|Istarska~18|Karlovačka~04|Koprivničko-Križevačka~06|Krapinsko-Zagorska~02|Ličko-Senjska~09|Međimurska~20|Osječko-Baranjska~14|Požeško-Slavonska~11|Primorsko-Goranska~08|Šibensko-Kninska~15|Sisačko-Moslavačka~03|Splitsko-Dalmatinska~17|Varaždinska~05|Virovitičko-Podravska~10|Vukovarsko-Srijemska~16|Zadarska~13|Zagrebačka~01"],
  ["Cuba","CU","Artemisa~15|Camagüey~09|Ciego de Ávila~08|Cienfuegos~06|Granma~12|Guantánamo~14|Holguín~11|Isla de la Juventud~99|La Habana~03|Las Tunas~10|Matanzas~04|Mayabeque~16|Pinar del Río~01|Sancti Spíritus~07|Santiago de Cuba~13|Villa Clara~05"],
  ["Curaçao","CW","Curaçao~NL-CW"],
  ["Cyprus","CY","Ammochostos~04|Keryneia~05|Larnaka~03|Lefkosia~01|Lemesos~02|Pafos~05"],
  ["Czech Republic","CZ","Hlavní město Praha~PR|Jihočeský kraj~JC|Jihomoravský kraj~JM|Karlovarský kraj~KA|Královéhradecký kraj~KR|Liberecký kraj~LI|Moravskoslezský kraj~MO|Olomoucký kraj~OL|Pardubický kraj~PA|Plzeňský kraj~PL|Středočeský kraj~ST|Ústecký kraj~US|Vysočina~VY|Zlínský kraj~ZL"],
  ["Denmark","DK","Hovedstaden~84|Kujalleq~GL-KU|Midtjylland~82|Norderøerne~FO-01|Nordjylland~81|Østerø~FO-06|Qaasuitsup~GL-QA|Qeqqata~GL-QE|Sandø~FO-02|Sermersooq~GL-SM|Sjælland~85|Strømø~FO-03|Suderø~FO-04|Syddanmark~83|Vågø~FO-05"],
  ["Djibouti","DJ","Ali Sabieh~AS|Arta~AR|Dikhil~DI|Obock~OB|Tadjourah~TA"],
  ["Dominica","DM","Saint Andrew Parish~02|Saint David Parish~03|Saint George Parish~04|Saint John Parish~05|Saint Joseph Parish~06|Saint Luke Parish~07|Saint Mark Parish~08|Saint Patrick Parish~09|Saint Paul Parish~10|Saint Peter Parish~11"],
  ["Dominican Republic","DO","Cibao Central~02|Del Valle~37|Distrito Nacional~01|Enriquillo~38|Norcentral~04|Nordeste~34|Noroeste~34|Norte~35|Valdesia~42"],
  ["Timor-Leste","TL","Aileu~AL|Ainaro~AN|Baucau~BA|Bobonaro~BO|Covalima~CO|Dili~DI|Ermera~ER|Lautem~LA|Liquiçá~LI|Manatuto~MT|Manufahi~MF|Oecusse~OE|Viqueque~VI"],
  ["Ecuador","EC","Azuay~A|Bolívar~B|Cañar~F|Carchi~C|Chimborazo~H|Cotopaxi~X|El Oro~O|Esmeraldas~E|Galápagos~W|Guayas~G|Imbabura~I|Loja~L|Los Ríos~R|Manabí~M|Morona-Santiago~S|Napo~N|Orellana~D|Pastaza~Y|Pichincha~P|Santa Elena~SE|Santo Domingo de los Tsáchilas~SD|Sucumbíos~U|Tungurahua~T|Zamora-Chinchipe~Z"],
  ["Egypt","EG","Alexandria~ALX|Aswan~ASN|Asyout~AST|Bani Sueif~BNS|Beheira~BH|Cairo~C|Daqahlia~DK|Dumiat~DT|El Bahr El Ahmar~BA|El Ismailia~IS|El Suez~SUZ|El Wadi El Gedeed~WAD|Fayoum~FYM|Gharbia~GH|Giza~SUZ|Helwan~HU|Kafr El Sheikh~KFS|Luxor~LX|Matrouh~MT|Menia~MN|Menofia~MNF|North Sinai~SIN|Port Said~PTS|Qalubia~KB|Qena~KN|Sharqia~SHR|Sixth of October~SU|Sohag~SHG|South Sinai~JS"],
  ["El Salvador","SV","Ahuachapán~AH|Cabañas~CA|Chalatenango~CH|Cuscatlán~CU|La Libertad~LI|La Paz~PA|La Unión~UN|Morazán~MO|San Miguel~SM|San Salvador~SS|San Vicente~SV|Santa Ana~SA|Sonsonate~SO|Usulután~US"],
  ["Equatorial Guinea","GQ","Región Continental~C|Región Insular~I"],
  ["Eritrea","ER","Anseba~AN|Debub~DU|Debub-Keih-Bahri~DK|Gash-Barka~GB|Maekel~MA|Semien-Keih-Bahri~SK"],
  ["Estonia","EE","Harjumaa~37|Hiiumaa~39|Ida-Virumaa~44|Järvamaa~41|Jõgevamaa~49|Läänemaa~57|Lääne-Virumaa~59|Pärnumaa~67|Põlvamaa~65|Raplamaa~70|Saaremaa~74|Tartumaa~78|Valgamaa~82|Viljandimaa~84|Võrumaa~86"],
  ["Ethiopia","ET","Addis Ababa~AA|Afar~AF|Amhara~AM|Benshangul-Gumaz~BE|Dire Dawa~DD|Gambela~GA|Harari~HA|Oromia~OR|Somali~SO|Southern Nations Nationalities and People's Region~SN|Tigray~TI"],
  ["Falkland Islands (Islas Malvinas)","FK","Barren Island~01|Beauchene Island~02|Beaver Island~03|Bleaker Island~04|Box Island~05|Brocken Island~06|Burnt Island~07|Carcass Island~08|Christmas Island~09|Cow Island~10|Cross Island~11|Double Creek Islands~12|Dry Island~13|Dyke Island~14|East Falkland~15|Eddystone Island~16|George Island~17|Golding Island~18|Great Island~19|Jason Islands~20|Keppel Island~21|Middle Island~22|New Island~23|Outer Island~24|Passage Island~25|Peat Island~26|Pebble Island~27|Philmore Island~28|Port Patterson~29|Ruggles Island~30|Sandbar Island~31|Saunders Island~32|Sea Lion Island~33|Sedge Island~34|Speedwell Island~35|Spring Point Island~36|Staats Island~37|Swan Island~38|Tickel Island~39|Tussac Island~40|Weddell Island~41|West Falkland~42|West Island~43|West Point Island~44|West Swan island~45|Wolfe Island~46"],
  ["Faroe Islands","FO","Borðoy~FO|Eysturoy~FO|Fugloy~FO|Hestur~FO|Kalsoy~FO|Koltur~FO|Kunoy~FO|Mykines~FO|Nólsoy~FO|Sandoy~FO|Skúvoy~FO|Stóra Dímun~FO|Streymoy~FO|Suðuroy~FO|Svínoy~FO|Vágar~FO|Viðoy~FO"],
  ["Fiji","FJ","Central~C|Eastern~E|Northern~N|Rotuma~R|Western~W"],
  ["Finland","FI","Ahvenanmaan lääni~AL|Etelä-Suomen lääni~ES|Itä-Suomen lääni~IS|Länsi-Suomen lääni~LS|Lapin lääni~LL|Oulun lääni~OL"],
  ["France","FR","Alsace~A|Aquitaine~B|Arrondissement de Saint-Martin~MF|Auvergne~C|Basse-Normandie~P|Bourgogne~D|Bretagne~E|Centre~F|Champagne-Ardenne~G|Corse~H|Franche-Comté~I|Guadeloupe~GP|Guyane française~GF|Haute-Normandie~Q|Île de Clipperton~CP|Île-de-France~J|La Réunion~RE|Languedoc-Roussillon~K|Limousin~L|Lorraine~M|Martinique~MQ|Mayotte~YT|Midi-Pyrénées~N|Nord-Pas-de-Calais~O|Nouvelle-Calédonie~NC|Pays de la Loire~R|Picardie~S|Poitou-Charentes~T|Polynésie Française~PF|Provence-Alpes-Côte d'Azur~U|Rhône-Alpes~V|Saint-Barthélemy~BL|Saint-Pierre-et-Miquelon~PM|Terres australes françaises~TF|Wallis-et-Futuna~WF"],
  ["French Guiana","GF","Guyane~FR-GF"],
  ["French Polynesia","PF","Polynésie Française~FR-PF"],
  ["French Southern and Antarctic Lands","TF","Terres australes françaises~FR-TF"],
  ["Gabon","GA","Estuaire~1|Haut-Ogooué~2|Moyen-Ogooué~3|Ngounié~4|Nyanga~5|Ogooué-Ivindo~6|Ogooué-Lolo~7|Ogooué-Maritime~8|Woleu-Ntem~9"],
  ["Gambia, The","GM","Banjul City~B|Central River~M|Lower River~L|North Bank~N|Upper River~U|Western~W"],
  ["Georgia","GE","Abashis Raioni~01|Abkhazia~AB|Adigenis Raioni~02|Ajaria~AJ|Akhalgoris Raioni~03|Akhalkalakis Raioni~04|Akhaltsikhis Raioni~05|Akhmetis Raioni~06|Ambrolauris Raioni~07|Aspindzis Raioni~08|Baghdat is Raioni~09|Bolnisis Raioni~10|Borjomis Raioni~11|Chiatura~CHI|Chkhorotsqus Raioni~12|Chokhatauris Raioni~13|Dedoplistsqaros Raioni~14|Dmanisis Raioni~15|Dushetis Raioni~16|Gardabanis Raioni~18|Gori~GOR|Goris Raioni~20|Gurjaanis Raioni~22|Javis Raioni~23|Karelis Raioni~24|Kaspis Raioni~25|Kharagaulis Raioni~27|Khashuris Raioni~28|Khobis Raioni~30|Khonis Raioni~31|Kutaisi~KUT|Lagodekhis Raioni~34|Lanchkhutis Raioni~35|Lentekhis Raioni~36|Marneulis Raioni~37|Martvilis Raioni~38|Mestiis Raioni~39|Mtskhetis Raioni~40|Ninotsmindis Raioni~41|Onis Raioni~43|Ozurget is Raioni~44|Poti~PTI|Qazbegis Raioni~45|Qvarlis Raioni~46|Rustavi~RUS|Sachkheris Raioni~47|Sagarejos Raioni~48|Samtrediis Raioni~49|Senakis Raioni~50|Sighnaghis Raioni~52|Tbilisi~TB|Telavis Raioni~54|Terjolis Raioni~55|Tetritsqaros Raioni~56|Tianetis Raioni~57|Tqibuli~TQI|Tsageris Raioni~58|Tsalenjikhis Raioni~59|Tsalkis Raioni~60|Tsqaltubo~TSQ|Vanis Raioni~61|Zestaponis Raioni~62|Zugdidi~ZUG|Zugdidis Raioni~63"],
  ["Germany","DE","Baden-Württemberg~BW|Bayern~BY|Berlin~BE|Brandenburg~BB|Bremen~HB|Hamburg~HH|Hessen~HE|Mecklenburg-Vorpommern~MV|Niedersachsen~NI|Nordrhein-Westfalen~NW|Rheinland-Pfalz~RP|Saarland~SL|Sachsen~SN|Sachsen-Anhalt~ST|Schleswig-Holstein~SH|Thüringen~TH"],
  ["Ghana","GH","Ashanti~AH|Brong-Ahafo~BA|Central~CP|Eastern~EP|Greater Accra~AA|Northern~NP|Upper East~UE|Upper West~UW|Volta~TV|Western~WP"],
  ["Gibraltar","GI","Gibraltar~GI"],
  ["Greece","GR","Attica~I|Central Greece~G|Central Macedonia~B|Crete~M|East Macedonia And Thrace~A|Epirus~D|Ionian Islands~F|North Aegean~L|Peloponnese~J|South Aegean~K|Thessaly~E|West Greece~G|West Macedonia~A"],
  ["Greenland","GL","Grønland~GL"],
  ["Grenada","GD","Carriacou and Petit Martinique~02|Frigate Island~10|Large Island~10|Mushroom Island~06|Saline Island~10"],
  ["Guadeloupe","GP","Guadeloupe~GP"],
  ["Guam","GU","Guam~GU"],
  ["Guatemala","GT","Alta Verapaz~AV|Baja Verapaz~BV|Chimaltenango~CM|Chiquimula~CQ|El Progreso~PR|Escuintla~ES|Huehuetenango~HU|Izabal~IZ|Jalapa~JA|Jutiapa~JU|Petén~PE|Quetzaltenango~QZ|Quiché~QC|Retalhuleu~RE|Sacatepéquez~SA|San Marcos~SM|Santa Rosa~SR|Sololá~SO|Suchitepéquez~SU|Totonicapán~TO|Zacapa~ZA"],
  ["Guernsey","GG","Guernsey Channel Islands~GG"],
  ["Guinea","GN","Boké~B|Conakry~C|Faranah~F|Kankan~K|Labé~L|Mamou~M|Nzérékoré~N|Préfecture de Kindia~D"],
  ["Guinea-Bissau","GW","Bafatá~BA|Biombo~BM|Bissau~BS|Bolama~BL|Cacheu~CA|Gabú~GA|Oio~OI|Quinara~QU|Tombali~TO"],
  ["Guyana","GY","Barima-Waini~BA|Cuyuni-Mazaruni~CU|Demerara-Mahaica~DE|East Berbice-Corentyne~EB|Essequibo Islands-West Demerara~ES|Mahaica-Berbice~MA|Pomeroon-Supenaam~PM|Potaro-Siparuni~PT|Upper Demerara-Berbice~UD|Upper Takutu-Upper Essequibo~UT"],
  ["Haiti","HT","Artibonite~AR|Centre~CE|Grand'Anse~GA|Nippes~NI|Nord~ND|Nord-Est~NE|Nord-Ouest~NO|Ouest~OU|Sud~SD|Sud-Est~SE"],
  ["Heard Island and McDonald Islands","HM","Heard Island~HM|McDonald Islands~HM"],
  ["Honduras","HN","Atlántida~AT|Choluteca~CH|Colón~CL|Comayagua~CM|Copán~CP|Cortés~CR|El Paraíso~EP|Francisco Morazán~FM|Gracias a Dios~GD|Intubucá~IN|Islas de la Bahía~IB|La Paz~LP|Lempira~LE|Ocotepeque~OC|Olancho~OL|Santa Bárbara~SB|Valle~VA|Yoro~YO"],
  ["Hong Kong","HK","Eastern~01|Islands~02|Kowloon City~03|Kwai Tsing~04|Kwun Tong~05|North~06|Sai Kung~07|Sha Tin~08|Sham Shui Po~09|Southern~10|Tai Po~11|Tsuen Wan~12|Tuen Mun~13|Wong Tai Sin~14|Yau Tsim Mong~15|Yuen Long~16"],
  ["Hungary","HU","Bács-Kiskun~BK|Baranya~BA|Békés~BE|Borsod-Abaúj-Zemplén~BZ|Budapest~BU|Csongrád~CS|Fejér~FE|Győr-Moson-Sopron~GS|Hajdú-Bihar~HB|Heves~HE|Jász-Nagykun-Szolnok~JN|Komárom-Esztergom~KE|Nógrád~NO|Pest~PE|Somogy~SO|Szabolcs-Szatmár-Bereg~SZ|Tolna~TO|Vas~VA|Veszprém~VE|Zala~ZA"],
  ["Iceland","IS","Austurland~7|Höfuðborgarsvæði utan Reykjavíkur~1|Norðurland eystra~6|Norðurland vestra~5|Suðurland~8|Suðurnes~2|Vestfirðir~4|Vesturland~3"],
  ["India","IN","Andaman and Nicobar Islands~AN|Andhra Pradesh~AP|Arunachal Pradesh~AR|Assam~AS|Bihar~BR|Chandigarh~CH|Chhattisgarh~CT|Dadra and Nagar Haveli~DN|Daman and Diu~DD|Delhi~DL|Goa~GA|Gujarat~GJ|Haryana~HR|Himachal Pradesh~HP|Jammu and Kashmir~JK|Jharkhand~JH|Karnataka~KA|Kerala~KL|Lakshadweep~LD|Madhya Pradesh~MP|Maharashtra~MH|Manipur~MN|Meghalaya~ML|Mizoram~MZ|Nagaland~NL|Orissa~OR|Puducherry~PY|Punjab~PB|Rajasthan~RJ|Sikkim~SK|Tamil Nadu~TN|Tripura~TR|Uttar Pradesh~UP|Uttarakhand~UL|West Bengal~WB"],
  ["Indonesia","ID","Aceh~AC|Bali~BA|Bangka-Belitung~BB|Banten~BT|Bengkulu~BE|Gorontalo~GO|Jakarta~JK|Jambi~JA|Java Central~JT|Java East~JI|Java West~JB|Kalimantan Central~KT|Kalimantan East~KI|Kalimantan South~KS|Kalimantan West~KB|Lampung~LA|Maluku~MA|Maluku North~MU|Nusa Tenggara East~NT|Nusa Tenggara West~NB|Papua~PA|Papua West~IJ|Riau~RI|Riau Islands~KR|Sulawesi Central~ST|Sulawesi North~SA|Sulawesi South~SN|Sulawesi South East~SG|Sulawesi West~SR|Sumatra North~SU|Sumatra South~SS|Sumatra West~SB|Yogyakarta~YO"],
  ["Iran, Islamic Republic of","IR","Ardabil~03|Azarbayjan-e Gharbi~02|Azarbayjan-e Sharqi~01|Bushehr~06|Chahar Mahall va Bakhtiari~08|Esfahan~04|Fars~14|Gilan~19|Golestan~27|Hamadan~24|Hormozgan~23|Ilam~05|Kerman~15|Kermanshah~17|Khuzestan~10|Kohgiluyeh va Buyer Ahmad~18|Kordestan~10|Lorestan~20|Markazi~22|Mazandaran~21|North Khorasan~31|Qazvin~28|Qom~26|Razavi Khorasan~30|Semnan~12|Sistan va Baluchestan~13|South Khorasan~29|Tehran~07|Yazd~25|Zanjan~11"],
  ["Iraq","IQ","Al Anbār~AN|Al Başrah~BA|Al Muthanná~MU|Al Qādisīyah~QA|An Najaf~NA|Arbīl~AR|As Sulaymānīyah~SU|At Ta'mīm~TS|Bābil~BB|Baghdād~BG|Dahūk~DA|Dhī Qār~DQ|Diyālá~DI|Karbalā'~KA|Maysān~MA|Nīnawá~NI|Şalāḩ ad Dīn~SD|Wāsiţ~WA"],
  ["Ireland","IE","Connacht~C|Leinster~L|Munster~M|Ulster~U"],
  ["Isle of Man","IM","Isle of Man~IM"],
  ["Israel","IL","Central District~M|Haifa District~HA|Jerusalem District~JM|Judea and Samaria Area~JS|Northern District~Z|Southern District~D|Tel Aviv District~TA"],
  ["Italy","IT","Abruzzi~65|Basilicata~77|Calabria~78|Campania~72|Emilia-Romagna~45|Friuli-Venezia Giulia~36|Lazio~62|Ligúria~42|Lombardia~25|Marche~57|Molise~67|Piemonte~21|Puglia~75|Sardegna~88|Sicilia~82|Toscana~52|Trentino-Alto Adige~32|Umbría~55|Valle D'Aosta~23|Veneto~34"],
  ["Côte d'Ivoire, Republic of","CI","Agnéby~16|Bafing~17|Bas-Sassandra~09|Denguélé~10|Dix-Huit Montagnes~06|Fromager~18|Haut-Sassandra~02|Lacs~07|Lagunes~01|Marahoué~12|Moyen-Cavally~19|Moyen-Comoé~05|N'zi-Comoé~11|Savanes~03|Sud-Bandama~15|Sud-Comoé~13|Vallée du Bandama~04|Worodougou~14|Zanzan~08"],
  ["Jamaica","JM","Clarendon~13|Hanover~09|Kingston~01|Manchester~12|Portland~04|Saint Andrew~02|Saint Ann~06|Saint Catherine~14|Saint Elizabeth~11|Saint James~08|Saint Mary~05|Saint Thomas~03|Trelawny~07|Westmoreland~10"],
  ["Japan","JP","Chubu~01|Chugoku~02|Hokkaido~04|Kansai~06|Kanto~05|Kyushu~08|Shikoku~07|Tohoku~03"],
  ["Jersey","JE","Jersey Channel Islands~JE"],
  ["Jordan","JO","Ajlun~AJ|Al Aqabah~AQ|Al Balqa~BA|Al Karak~KA|Al Mafraq~MA|Amman~AM|Area not categorized~99|At Tafilah~AT|Az Zarqa~AZ|Irbid~IR|Jarash~JA|Ma'an~MN|Madaba~MD"],
  ["Kazakhstan","KZ","Akmola~AKM|Aktobe~AKT|Almaty City~ALA|Almaty Province~ALM|Astana City~AST|Atyrau~ATY|East Kazakhstan~VOS|Karagandy~KAR|Kostanay~KUS|Kyzylorda~KZY|Mangystau region~MAN|North Kazakhstan~SEV|Pavlodar~PAV|South Kazakhstan~YUZ|West Kazakhstan~ZAP|Zhambyl~ZHA"],
  ["Kenya","KE","Central~200|Coast~300|Eastern~400|Nairobi~110|North Eastern~500|Nyanza~600|Rift Valley~700|Western~800"],
  ["Kiribati","KI","Gilbert Islands~G|Line Islands~L|Phoenix Islands~P"],
  ["Kosovo","XK","Đakovica~01|Gnjilane~02|Kosovska Mitrovica~03|Peć~04|Priština~05|Prizren~06|Uroševac~07"],
  ["Kuwait","KW","Al-Ahmadi~AH|Al-Asimah~KU|Al-Farwaniyah~FA|Al-Jahra~JA|Hawalli~HA|Mubarak Al-Kabeer~MU"],
  ["Kyrgyzstan","KG","Batken Province~B|Bishkek City~GB|Chuy Province~C|Issyk Kul Province~Y|Jalal-Abad Province~J|Naryn Province~N|Osh City~O|Osh Province~O2|Talas Province~T"],
  ["Lao People's Democratic Republic","LA","Attapeu Province~AT|Bokeo Province~BK|Bolikhamsai Province~BL|Champasak Province~CH|Houaphanh Province~HO|Khammouane Province~KH|Luang Namtha Province~LM|Luang Prabang Province~LP|Oudomxay Province~OU|Phongsaly Province~PH|Salavan Province~SL|Savannakhet Province~SV|Sayabouly Province~XA|Sekong Province~XE|Vientiane Prefecture~VT|Vientiane Province~VI|Xiangkhouang Province~XI"],
  ["Latvia","LV","Kurzemes~01|Latgales~02|Rīgas~03|Vidzemes~04|Zemgales~05"],
  ["Lebanon","LB","Akkar~AK|Baalbek Hermel~BH|Beirut~BA|Beqaa~BI|Mount Lebanon~JL|Nabatiye~NA|North Lebanon~AS|South Lebanon~JA"],
  ["Lesotho","LS","Berea~S|Butha-Buthe~B|Leribe~C|Mafeteng~E|Maseru~A|Mohale's Hoek~F|Mokhotlong~J|Qacha's Nek~H|Quthing~G|Thaba-Tseka~K"],
  ["Liberia","LR","Bomi~BM|Bong~BG|Grand Bassa~GB|Grand Cape Mount~CM|Grand Gedeh~GG|Grand Kru~GK|Lofa~LO|Margibi~MG|Maryland~MY|Monrovia / River Gee~RG|Montserrado~MO|Nimba~NI|River Cess~RI|Sinoe~SI"],
  ["Libya","LY","Al Butnan~BU|Al Jabal al Akhdar~JA|Al Jabal al Gharbi~JG|Al Jifarah~JI|Al Jufrah~JU|Al Kufrah~KF|Al Marj~MJ|Al Murqub~LB|Al Wahat~WA|An Nuqat al Khams~NQ|Az Zawiyah~ZA|Banghazi~BA|Derna~DR|Ghat~GT|Misratah~MI|Murzuq~MQ|Nalut~NL|Sabha~SB|Surt~SR|Tarabulus / Tsarrbuus~TB|Tarhunah~20|Wadi al Shatii~WS|Yafran~25|Zlitan~26"],
  ["Liechtenstein","LI","Balzers~01|Eschen~02|Gamprin~03|Mauren~04|Planken~05|Ruggell~06|Schaan~07|Schellenberg~08|Triesen~09|Triesenberg~10|Vaduz~11"],
  ["Lithuania","LT","Alytaus~AL|Kauno~KU|Klaipėdos~KL|Marijampolės~MR|Panevėžio~PN|Šiaulių~SA|Tauragės~TA|Telšių~TE|Utenos~UT|Vilniaus~VL"],
  ["Luxembourg","LU","Diekirch~D|Grevenmacher~G"],
  ["Macau","MO","Ilhas~MO"],
  ["Macedonia, Republic of","MK","East~01|Northeast~02|Pelagonia~03|Polog~04|Skopje~05|Southeast~06|Southwest~07|Vardar~08"],
  ["Madagascar","MG","Antananarivo~T|Antsiranana~D|Fianarantsoa~F|Mahajanga~M|Toamasina~A|Toliara~U"],
  ["Malawi","MW","Balaka~BA|Blantyre~BL|Chikwawa~CK|Chiradzulu~CR|Chitipa~CT|Dedza~DE|Dowa~DO|Karonga~KR|Kasungu~KS|Lilongwe~LI|Machinga~MH|Mangochi~MG|Mchinji~MC|Mulanje~MU|Mwanza~MW|Mzimba~MZ|Neno~NE|Nkhata Bay~NB|Nkhotakota~NK|Nsanje~NS|Ntcheu~NU|Ntchisi~NI|Phalombe~PH|Rumphi~RU|Salima~SA|Thyolo~TH|Zomba~ZO"],
  ["Malaysia","MY","Johor~01|Kedah~02|Kelantan~03|Melaka~04|Negeri Sembilan~05|Pahang~06|Perak~08|Perlis~09|Pulau Pinang~07|Sabah~12|Sarawak~13|Selangor~10|Terengganu~11|Wilayah Persekutuan Kuala Lumpur~14|Wilayah Persekutuan Labuan~15|Wilayah Persekutuan Putra Jaya~16"],
  ["Maldives","MV","Dhekunu~SU|Malé~MLE|Mathi-Dhekunu~US|Mathi-Uthuru~UN|Medhu~CE|Medhu-Dhekunu~SC|Medhu-Uthuru~NC|Uthuru~NO"],
  ["Mali","ML","Bamako~BKO|Gao~7|Kayes~1|Kidal~8|Koulikoro~2|Mopti~5|Ségou~4|Sikasso~3|Tombouctou~6"],
  ["Malta","MT","Comino~02|Gozo~01"],
  ["Marshall Islands","MH","Ralik Islands chain~L|Ratak chain~T"],
  ["Martinique","MQ","Région Martinique~FR-GP"],
  ["Mauritania","MR","Adrar~07|Assaba Region~03|Brakna~05|Dakhlet Nouadhibou~08|Gorgol~04|Guidimaka~10|Hodh Ech Chargui~01|Hodh El Gharbi~02|Inchiri~12|Nouakchott~NKC|Tagant~09|Tiris Zemmour~11|Trarza~06"],
  ["Mauritius","MU","Agaléga Islands~AG|Cargados Carajos~CC|Flacq~FL|Grand Port~GP|Moka~MO|Pamplemousses~PA|Plaines Wilhems~PW|Port Louis~PU|Rivière du Rempart~RR|Rivière Noire~BL|Rodrigues~RO|Savanne~SA"],
  ["Mayotte","YT","Région Mayotte~FR-YT"],
  ["Mexico","MX","Aguascalientes~AGU|Baja California~BCN|Baja California Sur~BCS|Campeche~CAM|Chiapas~CHP|Chihuahua~CHH|Coahuila~COA|Colima~COL|Distrito Federal~DIF|Durango~DUR|Guanajuato~GUA|Guerrero~GRO|Hidalgo~HID|Jalisco~JAL|México~MEX|Michoacán~MIC|Morelos~MOR|Nayarit~NAY|Nuevo León~NLE|Oaxaca~OAX|Puebla~PUE|Querétaro~QUE|Quintana Roo~ROO|San Luis Potosí~SLP|Sinaloa~SIN|Sonora~SON|Tabasco~TAB|Tamaulipas~TAM|Tlaxcala~TLA|Veracruz~VER|Yucatán~YUC|Zacatecas~ZAC"],
  ["Micronesia, Federated States of","FM","Chuuk~TRK|Kosrae~KSA|Pohnpei~PNI|Yap~YAP"],
  ["Moldova","MD","Anenii Noi~ANE|Bălţi~BAL|Basarabeasca~BAS|Briceni~BRI|Cahul~CHL|Călăraşi~CAL|Cantemir~CAN|Căuşeni~CAS|Chişinău~CHI|Cimişlia~CIM|Criuleni~CRI|Donduşeni~DON|Drochia~DRO|Edineţ~EDI|Făleşti~FAL|Floreşti~FLO|Gagauzia~17|Glodeni~GLO|Hînceşti~HIN|Ialoveni~IAL|Leova~LEO|Nisporeni~NIS|Ocniţa~OCN|Orhei~OHI|Rezina~REZ|Rîşcani~RIS|Sîngerei~SIN|Şoldăneşti~SOL|Soroca~SOA|Ştefan Vodă~STE|Străşeni~STR|Taraclia~TAR|Teleneşti~TEL|Transnistria~34|Ungheni~UGI"],
  ["Monaco","MC","Fontvieille~FO|Jardin Exotique/Les Révoires~JE|La Condamine~CO|Larvotto/Bas Moulins~LA|Monaco Ville~MO|Monte Carlo/Spélugues~MC"],
  ["Mongolia","MN","Central region~03|Eastern region~02|Khangai region~05|Ulaanbaatar City~04|Western region~01"],
  ["Montenegro","ME","Andrijevica~01|Bar~02|Berane~03|Bijelo Polje~04|Budva~05|Cetinje~06|Danilovgrad~07|Herceg Novi~08|Kolašin~09|Kotor~10|Mojkovac~11|Nikšić~12|Plav~13|Pljevlja~14|Plužine~15|Podgorica~16|Rožaje~17|Šavnik~18|Tivat~19|Ulcinj~20|Žabljak~21"],
  ["Montserrat","MS","Saint Anthony Parish~MS|Saint Georges Parish~MS|Saint Peter Parish~MS"],
  ["Morocco","MA","Chaouia-Ouardigha~09|Doukhala-Abda~10|Fès-Boulemane~05|Gharb-Chrarda-Beni Hssen~02|Grand Casablanca~08|Guelmim-Es Smara~14|Laâyoune-Boujdour-Sakia el Hamra~15|L'Oriental~04|Marrakech-Tensift-Al Haouz~11|Meknès-Tafilalet~06|Oued Ed-Dahab-Lagouira~16|Rabat-Salé-Zemmour-Zaër~07|Sous-Massa-Drâa~13|Tadla-Azilal~12|Tanger-Tétouan~01|Taza-Al Hoceima-Taounate~03"],
  ["Mozambique","MZ","Cabo Delgado~P|Gaza~G|Inhambane~I|Manica~B|Maputo~L|Nampula~N|Niassa~A|Sofala~S|Tete~T|Zambézia~Q"],
  ["Myanmar","MM","Ayeyarwaddy~07|Bago~02|Chin~14|Kachin~11|Kayah~12|Kayin~13|Magway~03|Mandalay~04|Mon~15|Rakhine~16|Sagaing~01|Shan~17|Taninthayi~05|Yangon~06"],
  ["Namibia","NA","Erongo~ER|Hardap~HA|Karas~KA|Khomas~KH|Kunene~KU|Ohangwena~OW|Okavango~OK|Omaheke~OH|Omusati~OS|Oshana~ON|Oshikoto~OT|Otjozondjupa~OD|Zambezi~CA"],
  ["Nauru","NR","Aiwo~01|Anabar~02|Anetan~03|Anibare~04|Baiti~05|Boe~06|Buada~07|Denigomodu~08|Ewa~09|Ijuw~10|Meneng~11|Nibok~12|Uaboe~13|Yaren~14"],
  ["Nepal","NP","Madhya Pashchimanchal~2|Madhyamanchal~1|Pashchimanchal~3|Purwanchal~4|Sudur Pashchimanchal~5"],
  ["Netherlands","NL","Aruba~AW|Caribisch Nederland~BQ|Curaçao~CW|Drenthe~DR|Flevoland~FL|Friesland~FR|Gelderland~GE|Groningen~GR|Limburg~LI|Noord-Brabant~NB|Noord-Holland~NH|Overijssel~OV|Sint Maarten~SX|Utrecht~UT|Zeeland~ZE|Zuid-Holland~ZH"],
  ["Netherlands Antilles","AN","Netherlands Antilles~AN"],
  ["New Caledonia","NC","Nouvelle-Calédonie~NC"],
  ["New Zealand","NZ","Auckland~AUK|Bay of Plenty~BOP|Canterbury~CAN|Cook Islands~CK|Gisborne~GIS|Hawke's Bay~HKB|Manawatu-Wanganui~MWT|Marlborough~MBH|Nelson~NSN|Niué~NU|Northland~NTL|Otago~OTA|Southland~STL|Taranaki~TKI|Tasman~TAS|Tokelau~TK|Waikato~WKO|Wellington~WGN|West Coast~WTC"],
  ["Nicaragua","NI","Atlántico Norte~AN|Atlántico Sur~AS|Boaco~BO|Carazo~CA|Chinandega~CI|Chontales~CO|Estelí~ES|Granada~GR|Jinotega~JI|León~LE|Madriz~MD|Managua~MN|Masaya~MS|Matagalpa~MT|Nueva Segovia~NS|Río San Juan~SJ|Rivas~RI"],
  ["Niger","NE","Agadez~1|Diffa~2|Dosso~3|Maradi~4|Niamey~8|Tahoua~5|Tillabéri~6|Zinder~7"],
  ["Nigeria","NG","Abia~AB|Abuja~FC|Adamawa~AD|Akwa Ibom~AK|Anambra~AN|Bauchi~BA|Bayelsa~BY|Benue~BE|Borno~BO|Cross River~CR|Delta~DE|Ebonyi~EB|Edo~ED|Ekiti~EK|Enugu~EN|Gombe~GO|Imo~IM|Jigawa~JI|Kaduna~KD|Kano~KN|Katsina~KT|Kebbi~KE|Kogi~KO|Kwara~KW|Lagos~LA|Nasarawa~NA|Niger~NI|Ogun~OG|Ondo~ON|Osun~OS|Oyo~OY|Plateau~PL|Rivers~RI|Sokoto~SO|Taraba~TA|Yobe~YO|Zamfara~ZA"],
  ["Niue","NU","Niué~NU"],
  ["Norfolk Island","NF","Norfolk Island~NF"],
  ["Korea, Democratic People's Republic of (North)","KP","Chagang~04|Kangwon~07|North Hamgyong~09|North Hwanghae~06|North Pyongan~03|Pyongyang~01|Rason~13|Ryanggang~10|South Hamgyong~08|South Hwanghae~05|South Pyongan~02"],
  ["Northern Mariana Islands","MP","Northern Mariana Islands~MP"],
  ["Norway","NO","Akershus~02|Aust-Agder~09|Bouvetøya~BV|Buskerud~06|Finnmark~20|Hedmark~04|Hordaland~12|Jan Mayen~22|Møre og Romsdal~15|Nordland~18|Nord-Trøndelag~17|Oppland~05|Oslo~03|Østfold~01|Rogaland~11|Sogn og Fjordane~14|Sør-Trøndelag~16|Svalbard~21|Telemark~08|Troms~19|Vest-Agder~10|Vestfold~07"],
  ["Oman","OM","Al Batinah~BA|Al Dakhliya~DA|Al Dhahira~ZA|Al Wusta~WU|Al-Sharqiya~SH|Buraymi~BU|Dhofar~ZU|Musandam~MU|Muscat~MA"],
  ["Pakistan","PK","Azad Kashmir~JK|Balochistan~BA|Federally Administered Tribal Areas~TA|Gilgit-Baltistan~GB|Islamabad~IS|Khyber Pakhtunkhwa~KP|Punjab~PB|Sindh~SD"],
  ["Palau","PW","Aimeliik~002|Airai~004|Angaur~010|Hatobohei~050|Kayangel~100|Koror~150|Melekeok~212|Ngaraard~214|Ngarchelong~218|Ngardmau~222|Ngatpang~224|Ngchesar~226|Ngeremlengui~227|Ngiwal~228|Peleliu~350|Sonsorol~370"],
  ["Palestine, State of","PS","Gaza~01|West Bank~02"],
  ["Panama","PA","Bocas del Toro~1|Chiriquí~4|Coclé~2|Colón~3|Darién~5|Emberá~EM|Herrera~6|Kuna Yala~KY|Los Santos~7|Ngöbe Buglé~NB|Panamá~8|Veraguas~9"],
  ["Papua New Guinea","PG","Central Province~CPM|Chimbu Province~CPK|East New Britain Province~EBR|East Sepik Province~ESW|Eastern Highlands Province~EHG|Enga Province~EPW|Gulf Province~GPK|Kiriwina Island~50|Madang Province~MPM|Manus Province~MRL|Milne Bay Province~MBA|Morobe Province~MPL|National Capital District~NCD|New Ireland Province~NIK|North Solomons Province~NSB|Northern Province~NPP|Southern Highlands Province~SHM|West New Britain Province~WBK|West Sepik Province~SAN|Western Highlands Province~WHM|Western Province~WPD"],
  ["Paraguay","PY","Alto Paraguay~16|Alto Paraná~10|Amambay~13|Asunción - Distrito Capital~ASU|Boquerón~19|Caaguazú~5|Caazapá~6|Canindeyú~14|Central~11|Concepción~1|Cordillera~3|Guairá~4|Itapúa~7|Misiones~8|Ñeembucú~12|Paraguarí~9|Presidente Hayes~15|San Pedro~2"],
  ["Peru","PE","Amazonas~AMA|Ancash~ANC|Apurímac~APU|Arequipa~ARE|Ayacucho~AYA|Cajamarca~CAJ|Callao~CAL|Cusco~CUS|Huancavelica~HUV|Huánuco~HUC|Ica~ICA|Junín~JUN|La Libertad~LAL|Lambayeque~LAM|Lima~LIM|Loreto~LOR|Madre de Dios~MDD|Moquegua~MOQ|Pasco~PAS|Piura~PIU|Puno~PUN|San Martin~SAM|Tacna~TAC|Tumbes~TUM|Ucayali~UCA"],
  ["Philippines","PH","Autonomous Region in Muslim Mindanao~14|Bicol Region~05|Cagayan Valley~02|Calabarzon~40|Caraga~13|Central Luzon~03|Central Visayas~07|Cordillera Administrative Region~15|Davao Region~11|Eastern Visayas~08|Ilocos Region~01|Mimaropa~41|National Capital Region~00|Northern Mindanao~10|Soccsksargen~12|Western Visayas~06|Zamboanga Peninsula~09"],
  ["Pitcairn","PN","Pitcairn Islands~PN"],
  ["Poland","PL","Dolnośląskie~DS|Kujawsko-Pomorskie~KP|Łódzkie~LD|Lubelskie~LU|Lubuskie~LB|Małopolskie~MA|Mazowieckie~MZ|Opolskie~OP|Podkarpackie~PK|Podlaskie~PD|Pomorskie~PM|Śląskie~SL|Świętokrzyskie~SK|Warmińsko-Mazurskie~WN|Wielkopolskie~WP|Zachodniopomorskie~ZP"],
  ["Portugal","PT","Aveiro~01|Beja~02|Braga~03|Bragança~04|Castelo Branco~05|Coímbra~06|Évora~07|Faro~08|Guarda~09|Ilha da Graciosa~20|Ilha da Madeira~30|Ilha das Flores~20|Ilha de Porto Santo~30|Ilha de Santa Maria~20|Ilha de São Jorge~20|Ilha de São Miguel~20|Ilha do Corvo~20|Ilha do Faial~20|Ilha do Pico~20|Ilha Terceira~20|Leiria~10|Lisboa~11|Portalegre~12|Porto~13|Santarém~14|Setúbal~15|Viana do Castelo~16|Vila Real~17|Viseu~18"],
  ["Puerto Rico","PR","Isla de Puerto Rico~US-PR"],
  ["Qatar","QA","Al Dayyan~ZA|Al Khor~KH|Al Rayyan~RA|Al Wakra~WA|Doha~DA|Madinat Al Shamal~MS|Umm Slal~US"],
  ["Réunion","RE","Région Réunion~FR-GF"],
  ["Romania","RO","Bucureşti - Ilfov~08|Centru~07|Nord-Est~01|Nord-Vest~06|Sud Muntenia~03|Sud-Est~02|Sud-Vest Oltenia~04|Vest a României~05"],
  ["Russian Federation","RU","Adygea Republic~AD|Altai Krai~ALT|Altai Republic~AL|Amur Oblast~AMU|Arkhangelsk Oblast~ARK|Astrakhan Oblast~AST|Bashkortostan Republic~BA|Belgorod Oblast~BEL|Bryansk Oblast~BRY|Buryatia Republic~BU|Chechen Republic~CE|Chelyabinsk Oblast~CHE|Chitinskaya Oblast~CHI|Chukotka Autonomous Okrug~CHU|Chuvashia Republic~CU|Dagestan Republic~DA|Ingushetia Republic~IN|Irkutsk Oblast~IRK|Ivanovo Oblast~IVA|Jewish Autonomous Oblast~EVE|Kabardino-Balkaria Republic~KB|Kaliningrad Oblast~KGD|Kalmykia Republic~KL|Kaluga Oblast~KLU|Kamchatka Krai~KAM|Karachay-Cherkessia Republic~KC|Karelia Republic~KR|Kemerovo Oblast~KEM|Khabarovsk Krai~KHA|Khakassia Republic~KK|Kirov Oblast~KIR|Komi republic~KO|Kostroma Oblast~KOS|Krasnodar Krai~KDA|Krasnoyarsk Krai~KYA|Kurgan Oblast~KGN|Kursk Oblast~KRS|Leningrad Oblast~LEN|Lipetsk Oblast~LIP|Magadan Oblast~MAG|Mari El Republic~ME|Mordovia Republic~MO|Moscow~MOW|Moscow Oblast~MOS|Murmansk Oblast~MUR|Nizhny Novgorod Oblast~NIZ|North Ossetia-Alania Republic~SE|Novgorod Oblast~NGR|Novosibirsk Oblast~NVS|Omsk Oblast~OMS|Orenburg Oblast~ORE|Oryol Oblast~ORL|Penza Oblast~PNZ|Perm Krai~PER|Primorsky Krai~PRI|Pskov Oblast~PSK|Rostov Oblast~ROS|Ryazan Oblast~RYA|Saint Petersburg~SPE|Sakha Republic~SA|Sakhalin Oblast~SAK|Samara Oblast~SAM|Saratov Oblast~SAR|Smolensk Oblast~SMO|Stavropol Krai~STA|Sverdlovsk Oblast~SVE|Tambov Oblast~TAM|Tatarstan Republic~TA|Tomsk Oblast~TOM|Tula Oblast~TUL|Tuva Republic~TY|Tver Oblast~TVE|Tyumen Oblast~TYU|Udmurt Republic~UD|Ulyanovsk Oblast~ULY|Vladimir Oblast~VLA|Volgograd Oblast~VGG|Vologda Oblast~VLG|Voronezh Oblast~VOR|Yaroslavl Oblast~YAR"],
  ["Rwanda","RW","Est~02|Nord~03|Ouest~04|Sud~05|Ville de Kigali~01"],
  ["Western Sahara","EH","Guelmim-Es Semara~14|Laâyoune-Boujdour-Sakia el Hamra~15|Oued Ed Dahab-Lagouira~16"],
  ["Saint Barthélemy","BL","Au Vent~02|Sous le Vent~01"],
  ["Saint Kitts and Nevis","KN","Nevis~N|Saint Kitts~K"],
  ["Saint Lucia","LC","Anse la Raye Quarter~01|Castries Quarter~02|Choiseul Quarter~03|Dauphin Quarter~04|Dennery Quarter~05|Gros Islet Quarter~06|Laborie Quarter~07|Micoud Quarter~08|Praslin Quarter~09|Soufrière Quarter~10|Vieux Fort Quarter~11"],
  ["Saint Martin (French part)","MF","Arrondissement de Saint-Martin~FR-MF"],
  ["Saint Pierre and Miquelon","PM","Île de Saint-Pierre-et-Miquelon~FR-PM"],
  ["Saint Vincent and the Grenadines","VC","Charlotte Parish~01|Grenadines Parish~06|Saint Andrew Parish~02|Saint David Parish~03|Saint George Parish~04|Saint Patrick Parish~05"],
  ["Samoa","WS","Savai'i~01|Upolu~02"],
  ["San Marino","SM","Acquaviva~01|Borgo Maggiore~06|Chiesanuova~02|Domagnano~03|Faetano~04|Fiorentino~05|Montegiardino~08|Serravalle~09"],
  ["Saint Helena, Ascension and Tristan da Cunha","SH","Ascención Island~AC|Saint Helena~HL|Tristan da Cunha Islands~TA"],
  ["São Tomé and Príncipe","ST","Príncipe~P|Sao Tome~S"],
  ["Saudi Arabia","SA","Al Bahah~11|Al Jawf~12|Al Madinah~03|Al Qaseem~05|Aseer~14|Eastern~04|Hail~06|Jazan~09|Makkah~02|Najran~10|Northern Border~08|Tabouk~07"],
  ["Senegal","SN","Dakar~DK|Diourbel~DB|Fatick~FK|Kaffrine~KA|Kaolack~KL|Kédougou~KE|Kolda~KD|Louga~LG|Matam~MT|Saint-Louis~SL|Sédhiou~SE|Tambacounda~TC|Thiès~TH|Ziguinchor~ZG"],
  ["Serbia","RS","Centralna Srbija~BA-00|Kosovo~BA-KM|Vojvodina~BA-VO"],
  ["Seychelles","SC","Greater Victoria~01|Inner Islands~02|North Mahé~03|Outer Islands~04|South Mahé~05|West Mahé~06"],
  ["Sierra Leone","SL","Eastern~A|Northern~N|Southern~A|Western Area~W"],
  ["Singapore","SG","Central Singapore~01|North East~02|North West~03|South East~04|South West~05"],
  ["Sint Maarten (Dutch part)","SX","Collectivity of Saint Martin~NL-SX"],
  ["Slovakia","SK","Banskobystrický kraj~BC|Bratislavský kraj~BL|Košický kraj~KI|Nitriansky kraj~NI|Prešovský kraj~PV|Trenčiansky kraj~TC|Trnavský kraj~TA|Žilinský kraj~ZI"],
  ["Slovenia","SI","Gorenjska~09|Goriška~11|Jugovzhodna Slovenija~07|Koroška~03|Notranjsko-kraška~10|Obalno-kraška~12|Osrednjeslovenska~08|Podravska~02|Pomurska~01|Savinjska~04|Spodnjeposavska~06|Zasavska~05"],
  ["Solomon Islands","SB","Central~CE|Guadalcanal~GU|Isabel~IS|Makira~MK|Malaita~ML|Temotu~TE|Western~WE"],
  ["Somalia","SO","Bakool~BK|Banaadir~BN|Bari~BR|Bay~BY|Galguduud~GA|Gedo~GE|Hiiraan~HI|Jubbada Dhexe~JD|Jubbada Hoose~JH|Mudug~MU|Nugaal~NU|Sanaag~SA|Shabeellaha Dhexe~SD|Shabeellaha Hoose~SH|Togdheer~TO|Woqooyi Galbeed~WO"],
  ["South Africa","ZA","Eastern Cape~EC|Free State~FS|Gauteng~GP|KwaZulu-Natal~ZN|Limpopo~LP|Mpumalanga~MP|North West~NW|Northern Cape~NC|Western Cape~WC"],
  ["South Georgia and the South Sandwich Islands","GS","South Georgia and the South Sandwich Islands~GS"],
  ["Korea, Republic of (South)","KR","Busan~26|Chungcheongbuk-do~43|Chungcheongnam-do~44|Daegu~27|Daejeon~30|Gangwon-do~42|Gwangju~29|Gyeonggi-do~41|Gyeongsangbuk-do~47|Gyeongsangnam-do~48|Incheon~28|Jeju-do~49|Jeollabuk-do~45|Jeollanam-do~46|Seoul~11|Ulsan~31"],
  ["South Sudan","SS","Central Equatoria~EC|Eastern Equatoria~EE|Jonglei~JG|Lakes~LK|Northern Bahr al Ghazal~BN|Unity~UY|Upper Nile~NU|Warrap~WR|Western Bahr el Ghazal~BW|Western Equatoria~EW"],
  ["Spain","ES","Andalucía~AN|Aragón~AR|Asturias~AS|Cantabria~CB|Castilla - La Mancha~CM|Castilla y León~CL|Cataluña~CT|Ceuta~CE|Extremadura~EX|Galicia~GA|Islas Baleares~IB|Islas Canarias~CN|La Rioja~RI|Madrid~MD|Melilla~ML|Murcia~MC|Navarra~NC|País Vasco~PV|Valencia~VC"],
  ["Sri Lanka","LK","Central~2|Eastern~5|North Central~7|North Western~6|Northern~4|Sabaragamuwa~9|Southern~3|Uva~8|Western~1"],
  ["Sudan","SD","Blue Nile~NB|Gadarif~GD|Gezira~GZ|Kassala~KA|Khartoum~KH|North Darfur~DN|North Kordofan~KN|Northern~NO|Red Sea~RS|River Nile~NR|Sennar~SI|South Darfur~DS|South Kordofan~KS|West Darfur~12|West Kordofan~10|White Nile~NW"],
  ["Suriname","SR","Brokopondo~BR|Commewijne~CM|Coronie~CR|Marowijne~MA|Nickerie~NI|Para~PA|Paramaribo~PM|Saramacca~SA|Sipaliwini~SI|Wanica~WA"],
  ["Svalbard and Jan Mayen","SJ","Norway Overseas territories~10"],
  ["Swaziland","SZ","Hhohho~HH|Lubombo~LU|Manzini~MA|Shiselweni~SH"],
  ["Sweden","SE","Blekinge Län~K|Dalarnas Län~W|Gävleborgs Län~X|Gotlands Län~I|Hallands Län~N|Jämtlands Län~Z|Jönköpings Län~F|Kalmar Län~H|Kronobergs Län~G|Norrbottens Län~BD|Örebro Län~T|Östergötlands Län~E|Skåne Län~M|Södermanlands Län~D|Stockholms Län~AB|Uppsala Län~C|Värmlands Län~S|Västerbottens Län~AC|Västernorrlands Län~Y|Västmanlands Län~U|Västra Götalands Län~O"],
  ["Switzerland","CH","Aargau~AG|Appenzell Ausserrhoden~AR|Appenzell Innerhoden~AI|Basel-Landschaft~BL|Basel-Stadt~BS|Bern~BE|Fribourg~FR|Genève~GE|Glarus~GL|Graubünden~GR|Jura~JU|Luzern~LU|Neuchâtel~NE|Nidwalden~NW|Obwalden~OW|Sankt Gallen~SG|Schaffhausen~SH|Schwyz~SZ|Solothurn~SO|Thurgau~TG|Ticino~TI|Uri~UR|Valais~VS|Waadt~VD|Zug~ZG|Zürich~ZH"],
  ["Syrian Arab Republic","SY","Al Hassakah~HA|Aleppo~HL|Al-Ladhiqiyah~LA|Al-Qunaytirah~QU|Al-Raqqah~RA|Al-Suwayda~SU|Damascus~DI|Daraa~DR|Dayr az Zawr~DY|Hama~HM|Homs~HI|Idlib~ID|Rif Dimashq~RD|Tartus~TA"],
  ["Taiwan, Republic of China","TW","Changhua County~CHA|Chiayi City~CYI|Chiayi County~CYQ|Hsinchu City~HSZ|Hsinchu County~HSQ|Hualien County~HUA|Kaohsiung City~KHH|Kaohsiung County~KHQ|Keelung City~KEE|Kinmen County~10|Lienchiang County~11|Miaoli County~MIA|Nanhai Islands~13|Nantou County~NAN|Penghu County~PEN|Pingtung County~PIF|Taichung City~TXG|Taichung County~TXQ|Tainan City~TNN|Tainan County~TNQ|Taipei City~TPE|Taipei County~TPQ|Taitung County~TTT|Taoyuan County~TAO|Yilan County~ILA|Yunlin County~YUN"],
  ["Tajikistan","TJ","Karategin~KR|Khatlon~KT|Kŭhistoni Badakhshon~GB|Sughd~LN"],
  ["Tanzania, United Republic of","TZ","Arusha~01|Dar es Salaam~02|Dodoma~03|Iringa~04|Kagera~05|Kigoma~08|Kilimanjaro~09|Lindi~12|Manyara~26|Mara~13|Mbeya~14|Morogoro~16|Mtwara~17|Mwanza~18|Pemba North~06|Pemba South~10|Pwani~19|Rukwa~20|Ruvuma~21|Shinyanga~22|Singida~23|Tabora~24|Tanga~25|Zanzibar North~07|Zanzibar South and Central~11|Zanzibar West~15"],
  ["Thailand","TH","Central~01|East~02|North~04|Northeast~03|South~06|West~05"],
  ["Togo","TG","Centrale~C|Kara~K|Maritime~M|Plateaux~P|Savannes~S"],
  ["Tokelau","TK","Tokelau~TK"],
  ["Tonga","TO","'Eua~01|Ha'apai~02|Niuas~03|Tongatapu~04|Vava'u~05"],
  ["Trinidad and Tobago","TT","Arima~ARI|Chaguanas~CHA|Couva-Tabaquite-Talparo~CTT|Diego Martin~DMS|Penal-Debe~PED|Point Fortin~PTF|Port of Spain~POS|Princes Town~PRT|Rio Claro-Mayaro~RCM|San Fernando~SFO|San Juan-Laventille~SJL|Sangre Grande~SGE|Siparia~SIP|Tunapuna-Piarco~TUP"],
  ["Tunisia","TN","Ariana~12|Béja~31|Ben Arous~13|Bizerte~23|Gabès~81|Gafsa~71|Jendouba~32|Kairouan~41|Kasserine~42|Kebili~73|La Manouba~14|Le Kef~33|Mahdia~53|Medenine~82|Monastir~52|Nabeul~21|Sfax~61|Sidi Bouzid~43|Siliana~34|Sousse~51|Tataouine~83|Tozeur~72|Tunis~11|Zaghouan~22"],
  ["Turkey","TR","Adana~1|Adiyaman~2|Afyonkarahİsar~3|Ağri~4|Aksaray~68|Amasya~5|Ankara~6|Antalya~7|Ardahan~75|Artvİn~8|Aydin~9|Balikesİr~10|Bartin~74|Batman~72|Bayburt~69|Bİlecİk~11|Bİngöl~12|Bİtlİs~13|Bolu~14|Burdur~15|Bursa~16|Çanakkale~17|Çankiri~18|Çorum~19|Denİzlİ~20|Dİyarbakir~21|Düzce~81|Edİrne~22|Elaziğ~23|Erzİncan~24|Erzurum~25|Eskİşehİr~26|Gazİantep~27|Gİresun~28|Gümüşhane~29|Hakkarİ~30|Hatay~31|Iğdir~76|Isparta~32|İstanbul~34|İzmİr~35|Kahramanmaraş~46|Karabük~78|Karaman~70|Kars~36|Kastamonu~37|Kayserİ~38|Kİlİs~79|Kirikkale~71|Kirklarelİ~39|Kirşehİr~40|Kocaelİ~41|Konya~42|Kütahya~43|Malatya~44|Manİsa~45|Mardİn~47|Mersİn~33|Muğla~48|Muş~49|Nevşehİr~50|Nİğde~51|Ordu~52|Osmanİye~80|Rİze~53|Sakarya~54|Samsun~55|Şanliurfa~63|Sİİrt~56|Sinop~57|Şirnak~73|Sİvas~58|Tekİrdağ~59|Tokat~60|Trabzon~61|Tuncelİ~62|Uşak~64|Van~65|Yalova~77|Yozgat~66|Zonguldak~67"],
  ["Turkmenistan","TM","Aşgabat~S|Balkan / Krasnovodsk~B|Daşoguz / Tashauz~D|Lebap / Chardzhou~L|Mary~M"],
  ["Turks and Caicos Islands","TC","Caicos Islands~01|Turks Islands~02"],
  ["Tuvalu","TV","Funafuti~FUN|Nanumaga~NMG|Nanumea~NMA|Niulakita~NIU|Niutao~NIT|Nui~NUI|Nukufetau~NKF|Nukulaelae~NKL|Vaitupu~VAI"],
  ["Virgin Islands, U.S.","VI","Virgin Islands~US-VI"],
  ["Uganda","UG","Adjumani~301|Amolatar~314|Amuria~216|Amuru~319|Apac~302|Arua~303|Budaka~217|Bugiri~201|Bukedea~224|Bundibugyo~401|Bushenyi~402|Busia~202|Butaleja~219|Dokolo~318|Gulu~304|Hoima~403|Ibanda~416|Iganga~203|Isingiro~417|Jinja~204|Kaabong~315|Kabale~404|Kabarole~405|Kaberamaido~213|Kalangala~101|Kaliro~220|Kampala~102|Kamuli~205|Kamwenge~413|Kanungu~414|Kapchorwa~206|Kasese~406|Katakwi~207|Kayunga~112|Kibaale~407|Kiboga~103|Kiruhuura~418|Kisoro~408|Kitgum~305|Koboko~316|Kotido~306|Kumi~208|Kyenjojo~415|Lira~307|Luwero~104|Lyantonde~116|Manafwa~221|Masaka~105|Masindi~409|Mayuge~214|Mbale~209|Mbarara~410|Mityana~114|Moroto~308|Moyo~309|Mpigi~106|Mubende~107|Mukono~108|Nakapiripirit~311|Nakaseke~115|Nakasongola~109|Namutumba~222|Nebbi~310|Ntungamo~411|Nyadri~66|Oyam~321|Pader~312|Pallisa~210|Rakai~110|Sembabule~111|Sironko~215|Soroti~211|Tororo~212|Wakiso~113|Yumbe~313"],
  ["Ukraine","UA","Avtonomna Respublika Krym~43|Cherkas'ka Oblast~71|Chernihivs'ka Oblast~74|Chernivets'ka Oblast~77|Dnipropetrovs'ka Oblast~12|Donets'ka Oblast~14|Ivano-Frankivs'ka Oblast~26|Kharkivs'ka Oblast~63|Khersons'ka Oblast~65|Khmel'nyts'ka Oblast~68|Kirovohrads'ka Oblast~35|Kyïv~30|Kyïvs'ka Oblast~32|Luhans'ka Oblast~09|L'vivs'ka Oblast~46|Mykolaivs'ka Oblast~48|Odes'ka Oblast~51|Poltavs'ka Oblast~53|Rivnens'ka Oblast~56|Sevastopol~40|Sums'ka Oblast~59|Ternopil's'ka Oblast~61|Vinnyts'ka Oblast~05|Volyns'ka Oblast~07|Zakarpats'ka Oblast~21|Zaporiz'ka Oblast~23|Zhytomyrs'ka Oblast~18"],
  ["United Arab Emirates","AE","Abu Dhabi~AZ|Ajman~AJ|Dubai~DU|Fujairah~FU|Ras al Khaimah~RK|Sharjah~SH|Umm Al Quwain~UQ"],
  ["United Kingdom","GB","Anegada~01|Anguilla~01|Anguillita Island~02|Antrim~ANT|Armagh~ARM|Ascención Island~SH-AC|Barren Island~01|Beauchene Island~02|Beaver Island~03|Bedfordshire~CBF|Berkshire~WBK|Bleaker Island~04|Blowing Rock~03|Box Island~05|Brocken Island~06|Buckinghamshire~BKM|Burnt Island~07|Caicos Islands~01|Cambridgeshire~CAM|Carcass Island~08|Cayman Brac~KY|Chagos Islands~IO|Cheshire~CHE|Christmas Island~09|City of Bristol~BST|City of Hamilton~03|Cornwall~CON|County of Herefordshire~HEF|Cove Cay~04|Cow Island~10|Crocus Cay~05|Cross Island~11|Cumbria~CMA|Deadman's Cay~06|Derbyshire~DBY|Devon~DEV|Devonshire Parish~01|Dog Island~07|Dorset~DOR|Double Creek Islands~12|Down~DOW|Dry Island~13|Durham~DUR|Dyke Island~14|East Cay~08|East Falkland~15|East Riding of Yorkshire~ERY|East Sussex~ESX|Eddystone Island~16|Essex~ESS|Fermanagh~FER|George Island~17|Gloucestershire~GLS|Golding Island~18|Grand Cayman~KY|Great Island~19|Greater London~LND|Greater Manchester~MAN|Hamilton Parish~02|Hampshire~HAM|Hertfordshire~HRT|Isle of Wight~IOW|Jason Islands~20|Jost Van Dyke~02|Kent~KEN|Keppel Island~21|Lancashire~LAN|Leicestershire~LEC|Lincolnshire~LIN|Little Cayman~KY|Little Island~09|Little Scrub Island~10|Londonderry~N92000106|Merseyside~E10XXXX92|Mid Cay~11|Middle Island~22|New Island~23|Norfolk~NFK|North Cay~12|North Yorkshire~NYK|Northamptonshire~NTH|Northumberland~NBL|Nottinghamshire~NTT|Other Islands~99|Outer Island~24|Oxfordshire~OXF|Paget Parish~04|Passage Island~25|Peat Island~26|Pebble Island~27|Pembroke Parish~05|Philmore Island~28|Pitcairn Islands~PN|Port Patterson~29|Prickly Pear Cays~13|Rabbit Island~14|Ruggles Island~30|Rutland~RUT|Saint Anthony Parish~03|Saint Georges Parish~02|Saint Helena~SH-HL|Saint Peter Parish~01|Sandbar Island~31|Sandy Island/Sand Island~15|Sandys Parish~08|Saunders Island~32|Scilly Cay~16|Scotland region~GB_SCT|Scrub Island~17|Sea Lion Island~33|Seal Island~18|Sedge Island~34|Shropshire~SHR|Smith's Parish~09|Sombrero/Hat Island~19|Somerset~SOM|South Cay~20|South Wager Island~21|South Yorkshire~YOR|Southampton Parish~10|Speedwell Island~35|Spring Point Island~36|St. George's Parish~07|Staats Island~37|Staffordshire~STS|Suffolk~SFK|Surrey~SRY|Swan Island~38|Tickel Island~39|Tortola~03|Town of St. George~06|Tristan da Cunha Islands~SH-TA|Turks Islands~02|Tussac Island~40|Tyne and Wear~NTY|Tyrone~DGN|Virgin Gorda~04|Wales region~GB_WLS|Warwick Parish~11|Warwickshire~WAR|Weddell Island~41|West Cay~22|West Falkland~42|West Island~43|West Midlands~GB_CHW|West Point Island~44|West Sussex~WSX|West Swan island~45|West Yorkshire~YOR|Wiltshire~GB_WIL|Wolfe Island~46|Worcestershire~WOR"],
  ["United States","US","Alabama~AL|Alaska~AK|American Samoa~AS|Arizona~AZ|Arkansas~AR|Armed Forces - Americas~AA|Armed Forces - Europe/Africa/Canada~AE|Armed Forces - Pacific~AP|California~CA|Colorado~CO|Connecticut~CT|Delaware~DE|District of Columbia~DC|Federated States of Micronesia~FM|Florida~FL|Georgia~GA|Guam~GU|Hawaii~HI|Idaho~ID|Illinois~IL|Indiana~IN|Iowa~IA|Kansas~KS|Kentucky~KY|Louisiana~LA|Maine~ME|Marshall Islands~MH|Maryland~MD|Massachusetts~MA|Michigan~MI|Minnesota~MN|Minor Outlying Islands~UM|Mississippi~MS|Missouri~MO|Montana~MT|Nebraska~NE|Nevada~NV|New Hampshire~NH|New Jersey~NJ|New Mexico~NM|New York~NY|North Carolina~NC|North Dakota~ND|Northern Mariana Islands~MP|Ohio~OH|Oklahoma~OK|Oregon~OR|Palau~PW|Pennsylvania~PA|Puerto Rico~PR|Rhode Island~RI|South Carolina~SC|South Dakota~SD|Tennessee~TN|Texas~TX|Utah~UT|Vermont~VT|Virgin Islands~VI|Virginia~VA|Washington~WA|West Virginia~WV|Wisconsin~WI|Wyoming~WY"],
  ["United States Minor Outlying Islands","UM","Minor Outlying Islands~UM"],
  ["Uruguay","UY","Artigas~AR|Canelones~CA|Cerro Largo~CL|Colonia~CO|Durazno~DU|Flores~FS|Florida~FD|Lavalleja~LA|Maldonado~MA|Montevideo~MO|Paysandú~PA|Rio Negro~RN|Rivera~RV|Rocha~RO|Salto~SA|San José~SJ|Soriano~SO|Tacuarembó~TA|Treinta y Tres~TT"],
  ["Uzbekistan","UZ","Andijan Province~AN|Bukhara Province~BU|Fergana Province~FA|Jizzakh Province~JI|Karakalpakstan republic~QR|Namangan Province~NG|Navoiy Province~NW|Qashqadaryo Province~QA|Samarqand Province~SA|Sirdaryo Province~SI|Surxondaryo Province~SU|Tashkent City~TK|Tashkent Province~TO|Xorazm Province~XO"],
  ["Vanuatu","VU","Malapa~MAP|Pénama~PAM|Sanma~SAM|Shéfa~VU_SEE|Taféa~TAE|Torba~VU_TOB"],
  ["Vatican City State (Holy See)","VA","Città del Vaticano~VA"],
  ["Venezuela, Bolivarian Republic of","VE","Amazonas~Z|Anzoátegui~B|Apure~C|Aragua~D|Barinas~E|Bolívar~F|Carabobo~G|Caracas~A|Cojedes~H|Delta Amacuro~Y|Dependencias Federales~W|Falcón~I|Guárico~J|Lara~K|Mérida~L|Miranda~M|Monagas~N|Nueva Esparta~O|Portuguesa~P|Sucre~R|Táchira~S|Trujillo~T|Vargas~X|Yaracuy~U|Zulia~V"],
  ["Viet Nam","VN","Bắc Trung Bộ~01|Đông Bắc~02|Đồng Bằng Sông Cửu Long~03|Đồng Bằng Sông Hồng~04|Đông Nam Bộ~05|Nam Trung Bộ~08|Tây Bắc~06|Tây Nguyên~07"],
  ["Wallis and Futuna","WF","Région Wallis-et-Futuna~FR-WF"],
  ["Yemen","YE","Abyan Governorate~AB|Ad Dali~DA|Adan~AD|Al Hudaydah~HU|Al Jawf Governorate~JA|Al Mahrah Governorate~MR|Al Mahwit Governorate~MW|Al-Baidhah~BA|Amran~AM|Dhamar Governorate~DH|Hadhramaut~HD|Hajjah~HJ|Ibb~IB|Laḩij~LA|Ma'rib~MA|Raymah Governorate~RA|Sa'Dah~SD|Sana`a Governorate~SN|Sana'a Municipality~SA|Shabwah Governorate~SH|Ta`izz~TA"],
  ["Zambia","ZM","Central~02|Copperbelt~08|Eastern~03|Luapula~04|Lusaka~09|Northern~05|North-Western~06|Southern~07|Western~01"],
  ["Zimbabwe","ZW","Bulawayo~BU|Harare~HA|Manicaland~MA|Mashonaland Central~MC|Mashonaland East~ME|Mashonaland West~MW|Masvingo~MV|Matabeleland North~MN|Matabeleland South~MS|Midlands~MI"]
];

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
