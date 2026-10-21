// Authoritative Abu Dhabi geographic coordinates and GeoJSON demonstration layers
export const ABU_DHABI_CENTER: [number, number] = [24.4539, 54.3773];
export const KHALIFA_CITY_CENTER: [number, number] = [24.4200, 54.5800];
export const AL_AIN_CENTER: [number, number] = [24.2150, 55.7550];
export const EASTERN_MANGROVES_CENTER: [number, number] = [24.4485, 54.4320];

// Illustrative GeoJSON polygons for Eastern Mangrove Habitat Extent (2027)
export const MANGROVE_GEOJSON = {
  type: "FeatureCollection" as const,
  features: [
    {
      type: "Feature" as const,
      properties: {
        id: "MG-01",
        name: "Eastern Mangroves National Park Zone A",
        canopyCover: "84%",
        species: "Avicennia marina (Grey Mangrove)",
        areaHectares: 342,
        healthIndex: "0.88 (Optimal)",
        status: "Protected Sanctuary",
      },
      geometry: {
        type: "Polygon" as const,
        coordinates: [
          [
            [54.4210, 24.4380],
            [54.4450, 24.4320],
            [54.4620, 24.4450],
            [54.4550, 24.4600],
            [54.4310, 24.4580],
            [54.4210, 24.4380],
          ]
        ]
      }
    },
    {
      type: "Feature" as const,
      properties: {
        id: "MG-02",
        name: "Jubail Island Mangrove Boardwalk Reserve",
        canopyCover: "76%",
        species: "Avicennia marina",
        areaHectares: 215,
        healthIndex: "0.82 (Good)",
        status: "Eco-tourism & Preservation",
      },
      geometry: {
        type: "Polygon" as const,
        coordinates: [
          [
            [54.4750, 24.5200],
            [54.5050, 24.5150],
            [54.5180, 24.5350],
            [54.4880, 24.5420],
            [54.4750, 24.5200],
          ]
        ]
      }
    },
  ]
};

// Illustrative GeoJSON polygons for Khalifa City Cadastral Land Parcels
export const KHALIFA_CITY_PARCELS_GEOJSON = {
  type: "FeatureCollection" as const,
  features: [
    {
      type: "Feature" as const,
      properties: {
        parcelId: "KC-SW-P-10492",
        sector: "Sector 14-B",
        zoning: "Mixed Residential / Commercial",
        areaSqm: 1240,
        ownerClassification: "Private / Registered",
        steward: "Khalid M. (DMT)",
        lastSurvey: "1 Sep 2027",
        status: "Active Registered",
      },
      geometry: {
        type: "Polygon" as const,
        coordinates: [
          [
            [54.5720, 24.4150],
            [54.5780, 24.4150],
            [54.5780, 24.4200],
            [54.5720, 24.4200],
            [54.5720, 24.4150],
          ]
        ]
      }
    },
    {
      type: "Feature" as const,
      properties: {
        parcelId: "KC-SW-P-10493",
        sector: "Sector 14-B",
        zoning: "Public Educational / Civic",
        areaSqm: 4850,
        ownerClassification: "Government Reserve (ADEK)",
        steward: "Khalid M. (DMT)",
        lastSurvey: "1 Sep 2027",
        status: "Active Registered",
      },
      geometry: {
        type: "Polygon" as const,
        coordinates: [
          [
            [54.5800, 24.4150],
            [54.5880, 24.4150],
            [54.5880, 24.4210],
            [54.5800, 24.4210],
            [54.5800, 24.4150],
          ]
        ]
      }
    },
    {
      type: "Feature" as const,
      properties: {
        parcelId: "KC-SW-P-10494",
        sector: "Sector 14-B",
        zoning: "Public Park & Community Green",
        areaSqm: 6200,
        ownerClassification: "Municipal Reserve (DMT)",
        steward: "Khalid M. (DMT)",
        lastSurvey: "1 Sep 2027",
        status: "Active Registered",
      },
      geometry: {
        type: "Polygon" as const,
        coordinates: [
          [
            [54.5720, 24.4220],
            [54.5880, 24.4220],
            [54.5880, 24.4280],
            [54.5720, 24.4280],
            [54.5720, 24.4220],
          ]
        ]
      }
    }
  ]
};

// GeoAI Change Detection Features in Khalifa City South-West
export const CHANGE_DETECTION_GEOJSON = {
  type: "FeatureCollection" as const,
  features: [
    {
      type: "Feature" as const,
      properties: {
        changeId: "CD-KC-2027-084",
        type: "New construction",
        color: "#1E9E6A",
        confidence: 0.96,
        areaSqm: 1240,
        heightEstimate: "14.5 m (3 Floors)",
        imageryT1: "Jan 2027 (0.5m)",
        imageryT2: "Aug 2027 (0.5m)",
        reviewStatus: "Pending",
        model: "Building Change Detection v3.2",
      },
      geometry: {
        type: "Polygon" as const,
        coordinates: [
          [
            [54.5735, 24.4162],
            [54.5765, 24.4162],
            [54.5765, 24.4188],
            [54.5735, 24.4188],
            [54.5735, 24.4162],
          ]
        ]
      }
    },
    {
      type: "Feature" as const,
      properties: {
        changeId: "CD-KC-2027-092",
        type: "Extension",
        color: "#E8A317",
        confidence: 0.88,
        areaSqm: 380,
        heightEstimate: "4.2 m",
        imageryT1: "Jan 2027 (0.5m)",
        imageryT2: "Aug 2027 (0.5m)",
        reviewStatus: "Approved by Steward",
        model: "Building Change Detection v3.2",
      },
      geometry: {
        type: "Polygon" as const,
        coordinates: [
          [
            [54.5820, 24.4170],
            [54.5845, 24.4170],
            [54.5845, 24.4190],
            [54.5820, 24.4190],
            [54.5820, 24.4170],
          ]
        ]
      }
    },
    {
      type: "Feature" as const,
      properties: {
        changeId: "CD-KC-2027-105",
        type: "Demolition",
        color: "#D64545",
        confidence: 0.92,
        areaSqm: 820,
        heightEstimate: "Cleared Site",
        imageryT1: "Jan 2027 (0.5m)",
        imageryT2: "Aug 2027 (0.5m)",
        reviewStatus: "Pending Field Verification",
        model: "Building Change Detection v3.2",
      },
      geometry: {
        type: "Polygon" as const,
        coordinates: [
          [
            [54.5750, 24.4240],
            [54.5785, 24.4240],
            [54.5785, 24.4265],
            [54.5750, 24.4265],
            [54.5750, 24.4240],
          ]
        ]
      }
    },
  ]
};

// S07 GeoAI Assistant — Al Ain Schools within 500m of high traffic roads
export const AL_AIN_ANALYSIS_DATA = {
  summary: {
    schoolsFound: 47,
    districtsCount: 9,
    bufferMeters: 500,
    excludedRestricted: 1,
  },
  districts: [
    { name: "Al Jimi", nameAr: "الجيمي", schoolsCount: 9, avgDistance: "180 m" },
    { name: "Al Muwaiji", nameAr: "المعترض / المويجعي", schoolsCount: 8, avgDistance: "210 m" },
    { name: "Al Foah", nameAr: "الفوعة", schoolsCount: 7, avgDistance: "320 m" },
    { name: "Al Qattara", nameAr: "القطارة", schoolsCount: 6, avgDistance: "140 m" },
    { name: "Al Jahili", nameAr: "الجاهلي", schoolsCount: 5, avgDistance: "195 m" },
    { name: "Zakher", nameAr: "زاخر", schoolsCount: 4, avgDistance: "280 m" },
    { name: "Al Maqam", nameAr: "المقام", schoolsCount: 3, avgDistance: "240 m" },
    { name: "Al Sarouj", nameAr: "صاروج", schoolsCount: 3, avgDistance: "310 m" },
    { name: "Hili", nameAr: "هيلي", schoolsCount: 2, avgDistance: "410 m" },
  ],
  schoolsSample: [
    { id: 'sch-1', name: "Al Jimi Primary School for Girls", district: "Al Jimi", lat: 24.2380, lng: 55.7480, distance: "120 m", trafficBand: "High (>3,500 veh/hr)" },
    { id: 'sch-2', name: "Al Ain International Academy", district: "Al Muwaiji", lat: 24.2150, lng: 55.7320, distance: "240 m", trafficBand: "High (>4,100 veh/hr)" },
    { id: 'sch-3', name: "Zayed Secondary Institute", district: "Al Jahili", lat: 24.2190, lng: 55.7620, distance: "190 m", trafficBand: "High (>3,800 veh/hr)" },
    { id: 'sch-4', name: "Al Qattara Model School", district: "Al Qattara", lat: 24.2540, lng: 55.7590, distance: "140 m", trafficBand: "High (>4,400 veh/hr)" },
    { id: 'sch-5', name: "Oasis Community Campus", district: "Al Foah", lat: 24.2790, lng: 55.7820, distance: "310 m", trafficBand: "High (>3,200 veh/hr)" },
  ]
};

// S10 Digital Twin 3D Assets (Abu Dhabi Island / Al Maryah Waterfront)
export const DIGITAL_TWIN_ASSETS = [
  {
    id: "AD-BLD-000482",
    name: "Tower AD-BLD-000482 (Maryah Capital)",
    height: "142 m",
    floors: 38,
    use: "Mixed commercial & finance",
    bimModel: "IFC-4 Linked (LOD 350)",
    energy: "1,240 kW",
    occupancy: "68%",
    co2Footprint: "18.2 kg/m²/yr",
    hvacHealth: "99.4%",
    lat: 24.4980,
    lng: 54.3890,
    facadeType: "Double-Glazed Low-E Unitized Curtain Wall",
    structure: "Post-tensioned Concrete Core with Steel Outriggers",
    fireSafety: "Civil Defense Code 2026 Compliant (A1)",
  },
  {
    id: "AD-TWR-BMBR",
    name: "Burj Mohammed Bin Rashid",
    height: "381 m",
    floors: 88,
    use: "Mixed-Use Luxury Residential & Sky Lounge",
    bimModel: "IFC-4 Linked (LOD 400)",
    energy: "3,450 kW",
    occupancy: "91%",
    co2Footprint: "22.5 kg/m²/yr",
    hvacHealth: "99.8%",
    lat: 24.4880,
    lng: 54.3570,
    facadeType: "Reflective Solar-Control Solar Shading Glazing",
    structure: "Central Reinforced Concrete Core & Perimeter Mega-Columns",
    fireSafety: "Abu Dhabi Civil Defense Type 1 Automatic Suppression",
  },
  {
    id: "AD-TWR-ETIHAD",
    name: "Etihad Towers (Tower 2)",
    height: "305 m",
    floors: 75,
    use: "Grade-A Commercial & Diplomatic Enclave",
    bimModel: "IFC-4 Linked (LOD 400)",
    energy: "2,890 kW",
    occupancy: "87%",
    co2Footprint: "20.1 kg/m²/yr",
    hvacHealth: "99.1%",
    lat: 24.4580,
    lng: 54.3210,
    facadeType: "Aerodynamic Curved Double Glazing with PV Integrations",
    structure: "High-Strength Concrete Core with Tuned Mass Dampers",
    fireSafety: "Smart Zoned Smoke Extraction & Evacuation Lifts",
  },
  {
    id: "AD-TWR-NATION",
    name: "Nation Towers (Tower 1)",
    height: "268 m",
    floors: 65,
    use: "Offices & St. Regis Sky Bridge Residences",
    bimModel: "IFC-4 Linked (LOD 350)",
    energy: "2,150 kW",
    occupancy: "84%",
    co2Footprint: "19.3 kg/m²/yr",
    hvacHealth: "98.9%",
    lat: 24.4680,
    lng: 54.3290,
    facadeType: "High-Performance Low-Iron Solar Neutral Glass",
    structure: "Twin Towers Connected via World's Highest Skybridge (202.5m)",
    fireSafety: "Dual Redundant Emergency Standpipe System",
  },
  {
    id: "AD-BLD-000483",
    name: "Al Sila Executive Tower",
    height: "198 m",
    floors: 46,
    use: "Grade-A Commercial Offices (ADGM)",
    bimModel: "IFC-4 Linked (LOD 400)",
    energy: "1,820 kW",
    occupancy: "89%",
    co2Footprint: "21.4 kg/m²/yr",
    hvacHealth: "98.8%",
    lat: 24.5010,
    lng: 54.3910,
    facadeType: "LEED Platinum Ceramic Fritted Glass Curtain",
    structure: "Composite Steel Deck & Outrigger Bracing",
    fireSafety: "Full Sprinkler & Early Smoke Detection (VESDA)",
  },
  {
    id: "AD-BLD-000484",
    name: "Al Sarab Residences",
    height: "115 m",
    floors: 28,
    use: "High-density Luxury Residential",
    bimModel: "IFC-4 Linked (LOD 300)",
    energy: "890 kW",
    occupancy: "94%",
    co2Footprint: "14.8 kg/m²/yr",
    hvacHealth: "97.5%",
    lat: 24.4950,
    lng: 54.3870,
    facadeType: "Thermal-Break Aluminum Clad Double Insulated",
    structure: "Cast-in-place Reinforced Concrete Frame",
    fireSafety: "Pressurized Fire Stairwells & Addressable Alarm",
  },
];

export const DIGITAL_TWIN_SENSORS = [
  {
    id: "AQ-0117",
    parameter: "PM2.5",
    value: "18 µg/m³",
    status: "Good",
    owner: "Environment Agency – Abu Dhabi (EAD)",
    freshness: "12 s ago",
    lat: 24.4985,
    lng: 54.3898,
    history: [14, 16, 17, 19, 18, 17, 18],
  },
  {
    id: "AQ-0118",
    parameter: "NO2",
    value: "22 ppb",
    status: "Moderate",
    owner: "EAD",
    freshness: "18 s ago",
    lat: 24.5020,
    lng: 54.3915,
    history: [25, 24, 23, 22, 21, 22, 22],
  },
  {
    id: "TR-0492",
    parameter: "Traffic Speed",
    value: "54 km/h",
    status: "Normal Flow",
    owner: "DMT (ITC)",
    freshness: "5 s ago",
    lat: 24.4965,
    lng: 54.3880,
    history: [48, 52, 50, 55, 54, 53, 54],
  },
  {
    id: "LP-08",
    parameter: "Smart Pole Luminaire",
    value: "28°C · 65 dB",
    status: "Active (IoT Mesh)",
    owner: "Abu Dhabi City Municipality (ADM)",
    freshness: "3 s ago",
    lat: 24.4600,
    lng: 54.3230,
    history: [27, 28, 28, 29, 28, 28, 28],
  },
  {
    id: "AV-04",
    parameter: "Autonomous Shuttle Telemetry",
    value: "28 km/h · 88% Batt",
    status: "En Route Corniche",
    owner: "Integrated Transport Centre (ITC)",
    freshness: "1 s ago",
    lat: 24.4610,
    lng: 54.3250,
    history: [25, 27, 28, 28, 30, 29, 28],
  },
];

// Sample GeoJSON for 3D Building Footprints (Al Maryah / Abu Dhabi)
export const BUILDINGS_3D_SAMPLE_GEOJSON = {
  type: "FeatureCollection" as const,
  features: [
    {
      type: "Feature" as const,
      properties: {
        buildingId: "AD-BLD-000482",
        name: "Maryah Capital Tower",
        heightMeters: 142.5,
        floors: 38,
        lodLevel: "LOD 2.2",
        roofType: "Flat with Mechanical Penthouse",
        structureUse: "Commercial Office / Financial",
        footprintAreaSqm: 2450,
        sourceSurvey: "DMT 3D Mesh LiDAR 2027",
      },
      geometry: {
        type: "Polygon" as const,
        coordinates: [
          [
            [54.3875, 24.4965],
            [54.3905, 24.4965],
            [54.3905, 24.4995],
            [54.3875, 24.4995],
            [54.3875, 24.4965],
          ]
        ]
      }
    },
    {
      type: "Feature" as const,
      properties: {
        buildingId: "AD-BLD-000483",
        name: "Al Sila Executive Tower",
        heightMeters: 198.0,
        floors: 46,
        lodLevel: "LOD 2.2",
        roofType: "Sloped Architectural Crown",
        structureUse: "Grade-A Commercial Offices",
        footprintAreaSqm: 3100,
        sourceSurvey: "DMT 3D Mesh LiDAR 2027",
      },
      geometry: {
        type: "Polygon" as const,
        coordinates: [
          [
            [54.3895, 24.4998],
            [54.3925, 24.4998],
            [54.3925, 24.5025],
            [54.3895, 24.5025],
            [54.3895, 24.4998],
          ]
        ]
      }
    },
    {
      type: "Feature" as const,
      properties: {
        buildingId: "AD-BLD-000484",
        name: "Al Sarab Waterfront Residences",
        heightMeters: 115.0,
        floors: 28,
        lodLevel: "LOD 2.2",
        roofType: "Terraced Penthouse",
        structureUse: "High-density Luxury Residential",
        footprintAreaSqm: 2180,
        sourceSurvey: "DMT 3D Mesh LiDAR 2027",
      },
      geometry: {
        type: "Polygon" as const,
        coordinates: [
          [
            [54.3855, 24.4935],
            [54.3885, 24.4935],
            [54.3885, 24.4960],
            [54.3855, 24.4960],
            [54.3855, 24.4935],
          ]
        ]
      }
    }
  ]
};

// Sample GeoJSON for 100m Population Density Grid (SCAD)
export const POPULATION_GRID_SAMPLE_GEOJSON = {
  type: "FeatureCollection" as const,
  features: [
    {
      type: "Feature" as const,
      properties: {
        cellId: "SCAD-GRID-100-84920",
        populationTotal: 1420,
        densityPerKm2: 142000,
        households: 395,
        avgHouseholdSize: 3.6,
        daytimeMultiplier: 1.85,
        demographicCohort: "High density urban residential",
      },
      geometry: {
        type: "Polygon" as const,
        coordinates: [
          [
            [54.3700, 24.4800],
            [54.3720, 24.4800],
            [54.3720, 24.4820],
            [54.3700, 24.4820],
            [54.3700, 24.4800],
          ]
        ]
      }
    },
    {
      type: "Feature" as const,
      properties: {
        cellId: "SCAD-GRID-100-84921",
        populationTotal: 980,
        densityPerKm2: 98000,
        households: 280,
        avgHouseholdSize: 3.5,
        daytimeMultiplier: 2.10,
        demographicCohort: "Commercial / mixed employment",
      },
      geometry: {
        type: "Polygon" as const,
        coordinates: [
          [
            [54.3720, 24.4800],
            [54.3740, 24.4800],
            [54.3740, 24.4820],
            [54.3720, 24.4820],
            [54.3720, 24.4800],
          ]
        ]
      }
    },
    {
      type: "Feature" as const,
      properties: {
        cellId: "SCAD-GRID-100-84922",
        populationTotal: 2150,
        densityPerKm2: 215000,
        households: 610,
        avgHouseholdSize: 3.5,
        daytimeMultiplier: 1.20,
        demographicCohort: "High density tower cluster",
      },
      geometry: {
        type: "Polygon" as const,
        coordinates: [
          [
            [54.3700, 24.4820],
            [54.3720, 24.4820],
            [54.3720, 24.4840],
            [54.3700, 24.4840],
            [54.3700, 24.4820],
          ]
        ]
      }
    }
  ]
};

// Sample GeoJSON for Rooftop Solar Potential (Masdar City)
export const SOLAR_ROOFTOP_SAMPLE_GEOJSON = {
  type: "FeatureCollection" as const,
  features: [
    {
      type: "Feature" as const,
      properties: {
        roofId: "SOLAR-MASDAR-084",
        buildingName: "Siemens Middle East HQ",
        pvUsableAreaSqm: 1840,
        tiltAngleDeg: 22,
        annualPotentialMwh: 345,
        co2OffsetTonsYr: 158,
        suitabilityTier: "Tier 1 — Optimal",
      },
      geometry: {
        type: "Polygon" as const,
        coordinates: [
          [
            [54.6130, 24.4320],
            [54.6160, 24.4320],
            [54.6160, 24.4350],
            [54.6130, 24.4350],
            [54.6130, 24.4320],
          ]
        ]
      }
    },
    {
      type: "Feature" as const,
      properties: {
        roofId: "SOLAR-MASDAR-085",
        buildingName: "Masdar Institute Building 1",
        pvUsableAreaSqm: 2100,
        tiltAngleDeg: 20,
        annualPotentialMwh: 390,
        co2OffsetTonsYr: 178,
        suitabilityTier: "Tier 1 — Optimal",
      },
      geometry: {
        type: "Polygon" as const,
        coordinates: [
          [
            [54.6165, 24.4320],
            [54.6195, 24.4320],
            [54.6195, 24.4350],
            [54.6165, 24.4350],
            [54.6165, 24.4320],
          ]
        ]
      }
    }
  ]
};

// Helper to retrieve sample geometry, center, and zoom for any marketplace product
export const getMarketplaceSampleData = (productId: string) => {
  switch (productId) {
    case 'mp-1':
      return {
        geoJson: BUILDINGS_3D_SAMPLE_GEOJSON,
        center: [24.4980, 54.3890] as [number, number],
        zoom: 16,
        featureTypeName: '3D Building Footprint (LoD2)',
        primaryKey: 'buildingId',
        titleField: 'name',
      };
    case 'mp-2':
      return {
        geoJson: KHALIFA_CITY_PARCELS_GEOJSON,
        center: [24.4200, 54.5800] as [number, number],
        zoom: 15,
        featureTypeName: 'Cadastral Land Parcel',
        primaryKey: 'parcelId',
        titleField: 'parcelId',
      };
    case 'mp-3':
      return {
        geoJson: POPULATION_GRID_SAMPLE_GEOJSON,
        center: [24.4815, 54.3720] as [number, number],
        zoom: 15,
        featureTypeName: '100m Population Density Cell',
        primaryKey: 'cellId',
        titleField: 'cellId',
      };
    case 'mp-4':
      return {
        geoJson: MANGROVE_GEOJSON,
        center: [24.4485, 54.4320] as [number, number],
        zoom: 13,
        featureTypeName: 'Mangrove Sanctuary Habitat',
        primaryKey: 'id',
        titleField: 'name',
      };
    case 'mp-5':
      return {
        geoJson: CHANGE_DETECTION_GEOJSON,
        center: [24.4200, 54.5800] as [number, number],
        zoom: 15,
        featureTypeName: 'AI Detected Urban Change',
        primaryKey: 'changeId',
        titleField: 'changeId',
      };
    case 'mp-6':
      return {
        geoJson: SOLAR_ROOFTOP_SAMPLE_GEOJSON,
        center: [24.4335, 54.6160] as [number, number],
        zoom: 16,
        featureTypeName: 'Rooftop Solar Photovoltaic Parcel',
        primaryKey: 'roofId',
        titleField: 'buildingName',
      };
    default:
      return {
        geoJson: KHALIFA_CITY_PARCELS_GEOJSON,
        center: [24.4200, 54.5800] as [number, number],
        zoom: 15,
        featureTypeName: 'Cadastral Land Parcel',
        primaryKey: 'parcelId',
        titleField: 'parcelId',
      };
  }
};
