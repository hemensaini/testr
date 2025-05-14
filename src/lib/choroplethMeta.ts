export interface ChoroplethMeta {
  title: string;
  description: string;
  examples: string[];
  geoLabel: string;
  domain?: [number, number];
}

export const choroplethMeta: Record<string, ChoroplethMeta> = {
  india: {
    title: 'India Map',
    description: 'Display data across Indian states using color intensity',
    examples: ['Population density', 'Literacy rates', 'Economic indicators'],
    geoLabel: 'State names',
    domain: [50, 150],
  },
  usa: {
    title: 'USA Map',
    description: 'Display data across USA states using color intensity',
    examples: ['Population density', 'Literacy rates', 'Economic indicators'],
    geoLabel: 'State names',
    domain: [50, 150],
  },
  delhi: {
    title: 'Delhi Map',
    description: 'Display data across Delhi and its districts using color intensity',
    examples: ['City population', 'COVID-19 cases', 'Economic indicators'],
    geoLabel: 'District names',
    domain: [70, 100],
  },
  afghanistan: {
    title: 'Afghanistan Map',
    description: 'Display data across Afghan provinces using color intensity',
    examples: ['Security index', 'Education access', 'Population density'],
    geoLabel: 'Province names',
    domain: [50, 100],
  },
  albania: {
    title: 'Albania Map',
    description: 'Display data across Albanian counties using color intensity',
    examples: ['GDP per capita', 'Health statistics', 'Employment rate'],
    geoLabel: 'County names',
    domain: [60, 90],
  },
  indonesia: {
    title: 'Indonesia Map',
    description: 'Display data across Indonesian provinces',
    examples: ['Population density', 'GDP per capita', 'Employment rate'],
    geoLabel: 'Province names',
    domain: [0, 100]
  },
  iran: {
    title: 'Iran Map',
    description: 'Display data across Iranian provinces',
    examples: ['Healthcare access', 'Education index', 'Unemployment rate'],
    geoLabel: 'Province names',
    domain: [0, 100]
  },
  iraq: {
    title: 'Iraq Map',
    description: 'Display data across Iraqi governorates',
    examples: ['Security index', 'Population density', 'Urbanization level'],
    geoLabel: 'Governorate names',
    domain: [0, 100]
  },
  ireland: {
    title: 'Ireland Map',
    description: 'Display data across Irish counties',
    examples: ['Housing quality', 'Tourism revenue', 'Healthcare access'],
    geoLabel: 'County names',
    domain: [0, 100]
  },
  israel: {
    title: 'Israel Map',
    description: 'Display data across Israeli districts',
    examples: ['Crime index', 'Population density', 'Education index'],
    geoLabel: 'District names',
    domain: [0, 100]
  },
  italy: {
    title: 'Italy Map',
    description: 'Display data across Italian regions',
    examples: ['GDP per capita', 'Tourism revenue', 'Unemployment rate'],
    geoLabel: 'Region names',
    domain: [0, 100]
  },
  ivorycoast: {
    title: 'Ivory Coast Map',
    description: 'Display data across districts',
    examples: ['Education access', 'Crime index', 'Urbanization level'],
    geoLabel: 'District names',
    domain: [0, 100]
  },
  jamaica: {
    title: 'Jamaica Map',
    description: 'Display data across Jamaican parishes',
    examples: ['Tourism revenue', 'Healthcare access', 'Employment rate'],
    geoLabel: 'Parish names',
    domain: [0, 100]
  },
  japan: {
    title: 'Japan Map',
    description: 'Display data across Japanese prefectures',
    examples: ['Population density', 'Internet penetration', 'Life expectancy'],
    geoLabel: 'Prefecture names',
    domain: [0, 100]
  },
  jordan: {
    title: 'Jordan Map',
    description: 'Display data across Jordanian governorates',
    examples: ['Literacy rate', 'Security index', 'Healthcare access'],
    geoLabel: 'Governorate names',
    domain: [0, 100]
  },
  kazakhstan: {
    title: 'Kazakhstan Map',
    description: 'Display data across regions of Kazakhstan',
    examples: ['Economic activity', 'Population growth', 'Education levels'],
    geoLabel: 'Region names',
    domain: [0, 100]
  },
  kenya: {
    title: 'Kenya Map',
    description: 'Display data across Kenyan counties',
    examples: ['Agricultural output', 'Healthcare facilities', 'Literacy rate'],
    geoLabel: 'County names',
    domain: [0, 100]
  },
  kuwait: {
    title: 'Kuwait Map',
    description: 'Display data across Kuwaiti governorates',
    examples: ['Healthcare access', 'Population distribution', 'Infrastructure index'],
    geoLabel: 'Governorate names',
    domain: [0, 100]
  },
  kyrgyzstan: {
    title: 'Kyrgyzstan Map',
    description: 'Display data across Kyrgyz regions',
    examples: ['Education quality', 'Agricultural output', 'Internet access'],
    geoLabel: 'Region names',
    domain: [0, 100]
  },
  laos: {
    title: 'Laos Map',
    description: 'Display data across Lao provinces',
    examples: ['Poverty rate', 'Healthcare coverage', 'School enrollment'],
    geoLabel: 'Province names',
    domain: [0, 100]
  },
  latvia: {
    title: 'Latvia Map',
    description: 'Display data across Latvian municipalities',
    examples: ['Population change', 'Green space per capita', 'Income levels'],
    geoLabel: 'Municipality names',
    domain: [0, 100]
  },
  lebanon: {
    title: 'Lebanon Map',
    description: 'Display data across Lebanese governorates',
    examples: ['Population density', 'Healthcare availability', 'Urbanization rate'],
    geoLabel: 'Governorate names',
    domain: [0, 100]
},
 lesotho: {
    title: 'Lesotho Map',
    description: 'Display data across districts of Lesotho',
    examples: ['School enrollment', 'Infrastructure access', 'Poverty rate'],
    geoLabel: 'District names',
    domain: [0, 100]
  },
  liberia: {
    title: 'Liberia Map',
    description: 'Display data across counties',
    examples: ['Healthcare availability', 'Economic development', 'Population density'],
    geoLabel: 'County names',
    domain: [0, 100]
  },
  libya: {
    title: 'Libya Map',
    description: 'Display data across Libyan districts',
    examples: ['Security rating', 'Public service access', 'Literacy rate'],
    geoLabel: 'District names',
    domain: [0, 100]
  },
  liechtenstein: {
    title: 'Liechtenstein Map',
    description: 'Display data across municipalities',
    examples: ['Population distribution', 'Housing availability', 'Employment statistics'],
    geoLabel: 'Municipality names',
    domain: [0, 100]
  },
  lithuania: {
    title: 'Lithuania Map',
    description: 'Display data across counties',
    examples: ['Economic indicators', 'Health access', 'Education statistics'],
    geoLabel: 'County names',
    domain: [0, 100]
  },
  luxembourg: {
    title: 'Luxembourg Map',
    description: 'Display data across communes',
    examples: ['Green space availability', 'Local governance quality', 'Housing density'],
    geoLabel: 'Commune names',
    domain: [0, 100]
  },
  macedonia: {
    title: 'North Macedonia Map',
    description: 'Display data across statistical regions',
    examples: ['Economic activity', 'Health outcomes', 'Education levels'],
    geoLabel: 'Region names',
    domain: [0, 100]
  },
  madagascar: {
    title: 'Madagascar Map',
    description: 'Display data across regions of Madagascar',
    examples: ['Biodiversity index', 'Agricultural output', 'Access to education'],
    geoLabel: 'Region names',
    domain: [0, 100]
  },
  malawi: {
    title: 'Malawi Map',
    description: 'Display data across districts of Malawi',
    examples: ['Food security', 'Public health facilities', 'Literacy rate'],
    geoLabel: 'District names',
    domain: [0, 100]
  },
  malaysia: {
    title: 'Malaysia Map',
    description: 'Display data across Malaysian states',
    examples: ['Population density', 'GDP per capita', 'Internet penetration'],
    geoLabel: 'State names',
    domain: [0, 100]
  },
  mali: {
    title: 'Mali Map',
    description: 'Display data across regions of Mali',
    examples: ['Access to clean water', 'Economic development', 'Security index'],
    geoLabel: 'Region names',
    domain: [0, 100]
  },
  malta: {
    title: 'Malta Map',
    description: 'Display data across Maltese local councils',
    examples: ['Tourism traffic', 'Healthcare access', 'Population trends'],
    geoLabel: 'Council names',
    domain: [0, 100]
  },
  mauritania: {
    title: 'Mauritania Map',
    description: 'Display data across Mauritanian regions',
    examples: ['Resource distribution', 'Education access', 'Health metrics'],
    geoLabel: 'Region names',
    domain: [0, 100]
  },
  mauritius: {
    title: 'Mauritius Map',
    description: 'Display data across districts of Mauritius',
    examples: ['Employment levels', 'Internet access', 'Environmental quality'],
    geoLabel: 'District names',
    domain: [0, 100]
  },
  mexico: {
    title: 'Mexico Map',
    description: 'Display data across Mexican states',
    examples: ['Literacy rate', 'Healthcare index', 'Population growth'],
    geoLabel: 'State names',
    domain: [0, 100]
  },
  moldova: {
    title: 'Moldova Map',
    description: 'Display data across Moldovan districts',
    examples: ['Agricultural productivity', 'Access to utilities', 'Population density'],
    geoLabel: 'District names',
    domain: [0, 100]
  },
  mongolia: {
    title: 'Mongolia Map',
    description: 'Display data across provinces (aimags)',
    examples: ['Livestock density', 'Education access', 'Mobile connectivity'],
    geoLabel: 'Province names',
    domain: [0, 100]
  },
  montenegro: {
    title: 'Montenegro Map',
    description: 'Display data across municipalities',
    examples: ['Tourism rate', 'Population growth', 'Economic indicators'],
    geoLabel: 'Municipality names',
    domain: [0, 100]
  },
  montserrat: {
    title: 'Montserrat Map',
    description: 'Display data across Montserrat parishes',
    examples: ['Public health metrics', 'Education availability', 'Population change'],
    geoLabel: 'Parish names',
    domain: [0, 100]
  },
  morocco: {
    title: 'Morocco Map',
    description: 'Display data across Moroccan regions',
    examples: ['Employment rate', 'Access to transportation', 'Poverty rate'],
    geoLabel: 'Region names',
    domain: [0, 100]
  },
  mozambique: {
    title: 'Mozambique Map',
    description: 'Display data across provinces',
    examples: ['School access', 'Healthcare coverage', 'Natural resource index'],
    geoLabel: 'Province names',
    domain: [0, 100]
  },
  myanmar: {
    title: 'Myanmar Map',
    description: 'Display data across Myanmar states/regions',
    examples: ['Conflict risk', 'Education statistics', 'Infrastructure level'],
    geoLabel: 'Region names',
    domain: [0, 100]
  },
 namibia: {
    title: 'Namibia Map',
    description: 'Display data across Namibian regions',
    examples: ['Health service coverage', 'Education levels', 'Rural electrification'],
    geoLabel: 'Region names',
    domain: [0, 100]
  },
  nauru: {
    title: 'Nauru Map',
    description: 'Display data across Nauru districts',
    examples: ['Population per district', 'Education access', 'Water supply status'],
    geoLabel: 'District names',
    domain: [0, 100]
  },
  nepal: {
    title: 'Nepal Map',
    description: 'Display data across Nepalese provinces',
    examples: ['Tourism rates', 'Infrastructure quality', 'Literacy level'],
    geoLabel: 'Province names',
    domain: [0, 100]
  },
  netherlands: {
    title: 'Netherlands Map',
    description: 'Display data across Dutch provinces',
    examples: ['Internet penetration', 'Public transport access', 'Household income'],
    geoLabel: 'Province names',
    domain: [0, 100]
  },
  newcaledonia: {
    title: 'New Caledonia Map',
    description: 'Display data across provinces',
    examples: ['Population spread', 'Environmental indicators', 'Education enrollment'],
    geoLabel: 'Province names',
    domain: [0, 100]
  },
  newzealand: {
    title: 'New Zealand Map',
    description: 'Display data across New Zealand regions',
    examples: ['Healthcare distribution', 'Climate vulnerability', 'Agricultural output'],
    geoLabel: 'Region names',
    domain: [0, 100]
  },
  nicaragua: {
    title: 'Nicaragua Map',
    description: 'Display data across Nicaraguan departments',
    examples: ['School access', 'Agricultural zones', 'Public transport'],
    geoLabel: 'Department names',
    domain: [0, 100]
  },
  niger: {
    title: 'Niger Map',
    description: 'Display data across regions of Niger',
    examples: ['Security index', 'Education outreach', 'Food supply chains'],
    geoLabel: 'Region names',
    domain: [0, 100]
  },
  nigeria: {
    title: 'Nigeria Map',
    description: 'Display data across Nigerian states',
    examples: ['Electricity access', 'Literacy rate', 'Employment level'],
    geoLabel: 'State names',
    domain: [0, 100]
  },
  northkorea: {
    title: 'North Korea Map',
    description: 'Display data across provinces',
    examples: ['Industrial activity', 'Transport access', 'Healthcare services'],
    geoLabel: 'Province names',
    domain: [0, 100]
  },
  norway: {
    title: 'Norway Map',
    description: 'Display data across Norwegian counties',
    examples: ['Energy usage', 'Environmental scores', 'Population aging rate'],
    geoLabel: 'County names',
    domain: [0, 100]
  },
  oman: {
    title: 'Oman Map',
    description: 'Display data across Omani governorates',
    examples: ['Road infrastructure', 'Employment rate', 'Access to education'],
    geoLabel: 'Governorate names',
    domain: [0, 100]
  },
  pakistan: {
    title: 'Pakistan Map',
    description: 'Display data across Pakistani provinces',
    examples: ['Security index', 'Water supply', 'Access to healthcare'],
    geoLabel: 'Province names',
    domain: [0, 100]
  },
  palestine: {
    title: 'Palestine Map',
    description: 'Display data across Palestinian governorates',
    examples: ['Housing density', 'Refugee population', 'Public service access'],
    geoLabel: 'Governorate names',
    domain: [0, 100]
  },
  panama: {
    title: 'Panama Map',
    description: 'Display data across Panamanian provinces',
    examples: ['Trade zones', 'Infrastructure levels', 'Population distribution'],
    geoLabel: 'Province names',
    domain: [0, 100]
  },
  papuanewguinea: {
    title: 'Papua New Guinea Map',
    description: 'Display data across provinces',
    examples: ['Cultural diversity index', 'Healthcare infrastructure', 'Schooling rate'],
    geoLabel: 'Province names',
    domain: [0, 100]
  },
  paraguay: {
    title: 'Paraguay Map',
    description: 'Display data across departments',
    examples: ['Agricultural activity', 'Road density', 'Mobile penetration'],
    geoLabel: 'Department names',
    domain: [0, 100]
  },
  peru: {
    title: 'Peru Map',
    description: 'Display data across regions of Peru',
    examples: ['Tourism income', 'Literacy level', 'Health service access'],
    geoLabel: 'Region names',
    domain: [0, 100]
  },
  philippines: {
    title: 'Philippines Map',
    description: 'Display data across Philippine regions',
    examples: ['Population distribution', 'Disaster risk index', 'Internet access'],
    geoLabel: 'Region names',
    domain: [0, 100]
  },
  pitcairnislands: {
    title: 'Pitcairn Islands Map',
    description: 'Display data across islands',
    examples: ['Island population', 'Maritime access', 'Electricity supply'],
    geoLabel: 'Island names',
    domain: [0, 100]
  },
  poland: {
    title: 'Poland Map',
    description: 'Display data across Polish voivodeships',
    examples: ['Economic growth rate', 'Educational index', 'Urbanization level'],
    geoLabel: 'Voivodeship names',
    domain: [0, 100]
},
 portugal: {
    title: 'Portugal Map',
    description: 'Display data across Portuguese districts',
    examples: ['Tourism levels', 'Education index', 'Internet access'],
    geoLabel: 'District names',
    domain: [0, 100]
  },
  puertorico: {
    title: 'Puerto Rico Map',
    description: 'Display data across Puerto Rican municipalities',
    examples: ['Healthcare access', 'Income distribution', 'Internet usage'],
    geoLabel: 'Municipality names',
    domain: [0, 100]
  },
  qatar: {
    title: 'Qatar Map',
    description: 'Display data across municipalities',
    examples: ['Infrastructure projects', 'Population growth', 'Economic zones'],
    geoLabel: 'Municipality names',
    domain: [0, 100]
  },
  romania: {
    title: 'Romania Map',
    description: 'Display data across Romanian counties',
    examples: ['Unemployment rate', 'Educational facilities', 'Road quality'],
    geoLabel: 'County names',
    domain: [0, 100]
  },
  russia: {
    title: 'Russia Map',
    description: 'Display data across Russian federal subjects',
    examples: ['GDP distribution', 'Transport networks', 'Climate data'],
    geoLabel: 'Region names',
    domain: [0, 100]
  },
  rwanda: {
    title: 'Rwanda Map',
    description: 'Display data across Rwandan districts',
    examples: ['Healthcare clinics', 'Electricity access', 'Population statistics'],
    geoLabel: 'District names',
    domain: [0, 100]
  },
  saintkittsandnevis: {
    title: 'Saint Kitts and Nevis Map',
    description: 'Display data across parishes',
    examples: ['Tourism statistics', 'Energy usage', 'Educational access'],
    geoLabel: 'Parish names',
    domain: [0, 100]
},
 saintlucia: {
    title: 'Saint Lucia Map',
    description: 'Display data across quarters',
    examples: ['Healthcare availability', 'Tourism stats', 'Employment rate'],
    geoLabel: 'Quarter names',
    domain: [0, 100]
  },
  saintmartinfrench: {
    title: 'Saint Martin (French) Map',
    description: 'Display data across quarters',
    examples: ['Education levels', 'Income data', 'Infrastructure access'],
    geoLabel: 'Quarter names',
    domain: [0, 100]
  },
  saintvincentandgrenadines: {
    title: 'Saint Vincent and the Grenadines Map',
    description: 'Display data across parishes',
    examples: ['Tourism revenue', 'Health services', 'Road network quality'],
    geoLabel: 'Parish names',
    domain: [0, 100]
  },
  saotomeandprincipe: {
    title: 'São Tomé and Príncipe Map',
    description: 'Display data across districts',
    examples: ['Public service access', 'Population density', 'Literacy levels'],
    geoLabel: 'District names',
    domain: [0, 100]
  },
  saudiaarabia: {
    title: 'Saudi Arabia Map',
    description: 'Display data across provinces',
    examples: ['Economic activity', 'Healthcare availability', 'Transport facilities'],
    geoLabel: 'Province names',
    domain: [0, 100]
  },
  senegal: {
    title: 'Senegal Map',
    description: 'Display data across regions',
    examples: ['Education rates', 'Electricity distribution', 'Sanitation coverage'],
    geoLabel: 'Region names',
    domain: [0, 100]
  },
  serbia: {
    title: 'Serbia Map',
    description: 'Display data across Serbian districts',
    examples: ['Population size', 'Income levels', 'Healthcare services'],
    geoLabel: 'District names',
    domain: [0, 100]
  },
  seychelles: {
    title: 'Seychelles Map',
    description: 'Display data across districts',
    examples: ['Tourism activity', 'Employment rates', 'Public safety indicators'],
    geoLabel: 'District names',
    domain: [0, 100]
  },
  sierraleone: {
    title: 'Sierra Leone Map',
    description: 'Display data across provinces',
    examples: ['Healthcare coverage', 'School enrollment', 'Agricultural output'],
    geoLabel: 'Province names',
    domain: [0, 100]
  },
  singapore: {
    title: 'Singapore Map',
    description: 'Display data across Singapore districts',
    examples: ['Population density', 'Transport coverage', 'Public housing data'],
    geoLabel: 'District names',
    domain: [0, 100]
  },
  slovakia: {
    title: 'Slovakia Map',
    description: 'Display data across Slovak regions',
    examples: ['Employment rate', 'Internet speed', 'Transport access'],
    geoLabel: 'Region names',
    domain: [0, 100]
  },
  slovenia: {
    title: 'Slovenia Map',
    description: 'Display data across statistical regions',
    examples: ['Public transport', 'Literacy level', 'Public services'],
    geoLabel: 'Region names',
    domain: [0, 100]
  },
  solomonislands: {
    title: 'Solomon Islands Map',
    description: 'Display data across provinces',
    examples: ['Access to clean water', 'Education quality', 'Healthcare access'],
    geoLabel: 'Province names',
    domain: [0, 100]
  },
  somalia: {
    title: 'Somalia Map',
    description: 'Display data across federal states',
    examples: ['Security index', 'Education coverage', 'Basic amenities access'],
    geoLabel: 'State names',
    domain: [0, 100]
  },
  southafrica: {
    title: 'South Africa Map',
    description: 'Display data across provinces',
    examples: ['Housing quality', 'Employment statistics', 'Water supply'],
    geoLabel: 'Province names',
    domain: [0, 100]
  },
  southkorea: {
    title: 'South Korea Map',
    description: 'Display data across South Korean provinces',
    examples: ['Internet speed', 'Public service access', 'GDP contribution'],
    geoLabel: 'Province names',
    domain: [0, 100]
  },
  southsudan: {
    title: 'South Sudan Map',
    description: 'Display data across states',
    examples: ['Displacement levels', 'Public services', 'Access to education'],
    geoLabel: 'State names',
    domain: [0, 100]
  },
  spain: {
    title: 'Spain Map',
    description: 'Display data across autonomous communities',
    examples: ['GDP by region', 'Employment rate', 'Tourism stats'],
    geoLabel: 'Region names',
    domain: [0, 100]
  },
  srilanka: {
    title: 'Sri Lanka Map',
    description: 'Display data across provinces',
    examples: ['Literacy levels', 'Healthcare access', 'Electricity availability'],
    geoLabel: 'Province names',
    domain: [0, 100]
  },
  stmartindutch: {
    title: 'Sint Maarten Map',
    description: 'Display data across districts',
    examples: ['Employment data', 'Education statistics', 'Public infrastructure'],
    geoLabel: 'District names',
    domain: [0, 100]
  },
  sudan: {
    title: 'Sudan Map',
    description: 'Display data across states',
    examples: ['Security conditions', 'Educational reach', 'Electricity supply'],
    geoLabel: 'State names',
    domain: [0, 100]
  },
  suriname: {
    title: 'Suriname Map',
    description: 'Display data across districts',
    examples: ['Housing conditions', 'Water access', 'Transportation coverage'],
    geoLabel: 'District names',
    domain: [0, 100]
  },
  swaziland: {
    title: 'Eswatini Map',
    description: 'Display data across regions',
    examples: ['Primary education rate', 'Water infrastructure', 'Electric grid access'],
    geoLabel: 'Region names',
    domain: [0, 100]
},
 sweden: {
    title: 'Sweden Map',
    description: 'Display data across Swedish counties',
    examples: ['Healthcare index', 'Education levels', 'Public transport access'],
    geoLabel: 'County names',
    domain: [0, 100]
  },
  switzerland: {
    title: 'Switzerland Map',
    description: 'Display data across cantons',
    examples: ['Economic strength', 'Healthcare coverage', 'Tourism rates'],
    geoLabel: 'Canton names',
    domain: [0, 100]
  },
  syria: {
    title: 'Syria Map',
    description: 'Display data across Syrian governorates',
    examples: ['Population movement', 'Healthcare services', 'Infrastructure coverage'],
    geoLabel: 'Governorate names',
    domain: [0, 100]
  },
  taiwan: {
    title: 'Taiwan Map',
    description: 'Display data across cities and counties',
    examples: ['Tech exports', 'Population density', 'Environmental indicators'],
    geoLabel: 'County names',
    domain: [0, 100]
  },
  tajikistan: {
    title: 'Tajikistan Map',
    description: 'Display data across provinces',
    examples: ['Infrastructure access', 'Educational attainment', 'Water access'],
    geoLabel: 'Province names',
    domain: [0, 100]
  },
  tanzania: {
    title: 'Tanzania Map',
    description: 'Display data across Tanzanian regions',
    examples: ['Wildlife presence', 'Healthcare index', 'Literacy rates'],
    geoLabel: 'Region names',
    domain: [0, 100]
  },
  thailand: {
    title: 'Thailand Map',
    description: 'Display data across Thai provinces',
    examples: ['Tourism income', 'Education coverage', 'Economic contribution'],
    geoLabel: 'Province names',
    domain: [0, 100]
  },
  timorleste: {
    title: 'Timor-Leste Map',
    description: 'Display data across municipalities',
    examples: ['Water supply', 'Healthcare access', 'School enrollment'],
    geoLabel: 'Municipality names',
    domain: [0, 100]
  },
  togo: {
    title: 'Togo Map',
    description: 'Display data across regions',
    examples: ['Agriculture statistics', 'Population coverage', 'Education reach'],
    geoLabel: 'Region names',
    domain: [0, 100]
  },
  tonga: {
    title: 'Tonga Map',
    description: 'Display data across island divisions',
    examples: ['Climate conditions', 'Agricultural output', 'Tourism statistics'],
    geoLabel: 'Division names',
    domain: [0, 100]
  },
  trinidadandtobago: {
    title: 'Trinidad and Tobago Map',
    description: 'Display data across municipalities',
    examples: ['Oil production', 'Employment stats', 'Education coverage'],
    geoLabel: 'Municipality names',
    domain: [0, 100]
  },
  tunisia: {
    title: 'Tunisia Map',
    description: 'Display data across governorates',
    examples: ['Economic activity', 'Education access', 'Transport infrastructure'],
    geoLabel: 'Governorate names',
    domain: [0, 100]
  },
  turkemenistan: {
    title: 'Turkmenistan Map',
    description: 'Display data across provinces',
    examples: ['Energy output', 'Education quality', 'Population coverage'],
    geoLabel: 'Province names',
    domain: [0, 100]
  },
  turkey: {
    title: 'Turkey Map',
    description: 'Display data across Turkish provinces',
    examples: ['Literacy rate', 'Employment rate', 'Public healthcare'],
    geoLabel: 'Province names',
    domain: [0, 100]
  },
  turksandcaicos: {
    title: 'Turks and Caicos Map',
    description: 'Display data across districts',
    examples: ['Tourism revenue', 'Housing access', 'Population stats'],
    geoLabel: 'District names',
    domain: [0, 100]
  },
  uganda: {
    title: 'Uganda Map',
    description: 'Display data across Ugandan regions',
    examples: ['Educational enrollment', 'Healthcare access', 'Electricity availability'],
    geoLabel: 'Region names',
    domain: [0, 100]
  },
  ukraine: {
    title: 'Ukraine Map',
    description: 'Display data across Ukrainian oblasts',
    examples: ['Conflict status', 'Population data', 'Healthcare services'],
    geoLabel: 'Oblast names',
    domain: [0, 100]
  },
  unitedarabemirates: {
    title: 'United Arab Emirates Map',
    description: 'Display data across emirates',
    examples: ['Oil production', 'Transport coverage', 'Employment data'],
    geoLabel: 'Emirate names',
    domain: [0, 100]
  },
  uruguay: {
    title: 'Uruguay Map',
    description: 'Display data across departments',
    examples: ['Agricultural yield', 'Internet access', 'Educational reach'],
    geoLabel: 'Department names',
    domain: [0, 100]
  },
  uzbekistan: {
    title: 'Uzbekistan Map',
    description: 'Display data across regions',
    examples: ['Agriculture output', 'Transport access', 'Public education levels'],
    geoLabel: 'Region names',
    domain: [0, 100]
  },
  vanuatu: {
    title: 'Vanuatu Map',
    description: 'Display data across provinces',
    examples: ['Disaster recovery', 'Education distribution', 'Healthcare access'],
    geoLabel: 'Province names',
    domain: [0, 100]
  },
  venezuela: {
    title: 'Venezuela Map',
    description: 'Display data across Venezuelan states',
    examples: ['Oil production', 'Electric grid coverage', 'Population stats'],
    geoLabel: 'State names',
    domain: [0, 100]
  },
  vietnam: {
    title: 'Vietnam Map',
    description: 'Display data across provinces',
    examples: ['Industrial growth', 'Tourism zones', 'Education levels'],
    geoLabel: 'Province names',
    domain: [0, 100]
  },
  virginislands: {
    title: 'Virgin Islands Map',
    description: 'Display data across island districts',
    examples: ['Tourism income', 'Healthcare centers', 'Housing availability'],
    geoLabel: 'District names',
    domain: [0, 100]
  },
  westernsahara: {
    title: 'Western Sahara Map',
    description: 'Display data across regions',
    examples: ['Population movement', 'Access to water', 'Infrastructure presence'],
    geoLabel: 'Region names',
    domain: [0, 100]
  },
  yemen: {
    title: 'Yemen Map',
    description: 'Display data across governorates',
    examples: ['Healthcare crisis', 'Population estimates', 'Food distribution'],
    geoLabel: 'Governorate names',
    domain: [0, 100]
  },
  zambia: {
    title: 'Zambia Map',
    description: 'Display data across provinces',
    examples: ['Education outreach', 'Healthcare coverage', 'Road networks'],
    geoLabel: 'Province names',
    domain: [0, 100]
  },
  zimbwabe: {
    title: 'Zimbabwe Map',
    description: 'Display data across provinces',
    examples: ['Public health access', 'Literacy programs', 'Electricity availability'],
    geoLabel: 'Province names',
    domain: [0, 100]
  }
};
