import { AREA_DIMENSIONS } from '../../../Constants';

export const getWallDescription = (direction: string, area: string, x: number, y: number, level: string) => {
  const dims = AREA_DIMENSIONS[area] || { width: 2000, height: 2000 };
  const isNearNorth = y >= dims.height - 50;
  const isNearSouth = y <= 50;
  const isNearEast = x >= dims.width - 50;
  const isNearWest = x <= 50;

  let ahead = "the open area";
  let left = "the open area";
  let right = "the open area";

  const getProxMsg = (isNear: boolean, wall: string) => isNear ? `the ${wall} wall (very close)` : `the ${wall} wall in the distance`;

  if (area === 'Foyer') {
    const isUpper = level === 'Sky';
    if (direction === 'North') {
      ahead = isUpper ? getProxMsg(isNearNorth, "North wall of the Sky Foyer with grand windows and relocated artwork") : getProxMsg(isNearNorth, "North wall with grand windows");
      left = isUpper ? getProxMsg(isNearWest, "West glass barrier") : getProxMsg(isNearWest, "West wall with a massive mirror");
      right = isUpper ? getProxMsg(isNearEast, "East glass barrier") : getProxMsg(isNearEast, "East wall");
    } else if (direction === 'South') {
      ahead = isUpper ? getProxMsg(isNearSouth, "South glass barrier overlooking the foyer") : getProxMsg(isNearSouth, "South wall with a green and gold striped archway");
      left = isUpper ? getProxMsg(isNearEast, "East glass barrier") : getProxMsg(isNearEast, "East wall");
      right = isUpper ? getProxMsg(isNearWest, "West glass barrier") : getProxMsg(isNearWest, "West wall with a massive mirror");
    } else if (direction === 'East') {
      ahead = isUpper ? getProxMsg(isNearEast, "East wall with the grand tapestry") : getProxMsg(isNearEast, "East wall");
      left = isUpper ? getProxMsg(isNearNorth, "North wall with relocated artwork") : getProxMsg(isNearNorth, "North wall with grand windows");
      right = isUpper ? getProxMsg(isNearSouth, "South glass barrier") : getProxMsg(isNearSouth, "South wall with a green and gold striped archway");
    } else if (direction === 'West') {
      ahead = isUpper ? getProxMsg(isNearWest, "West glass barrier") : getProxMsg(isNearWest, "West wall with a massive mirror");
      left = isUpper ? getProxMsg(isNearSouth, "South glass barrier") : getProxMsg(isNearSouth, "South wall with a green and gold striped archway");
      right = isUpper ? getProxMsg(isNearNorth, "North wall with relocated artwork") : getProxMsg(isNearNorth, "North wall with grand windows");
    }
  } else if (area === 'RuggedPlayField') {
    if (direction === 'North') {
      ahead = getProxMsg(isNearNorth, "North wall with a green and gold striped archway leading back to the Foyer");
      left = getProxMsg(isNearWest, "West wall with ceramic tiles and forest floor accents");
      right = getProxMsg(isNearEast, "East wall with ceramic tiles and forest floor accents");
    } else if (direction === 'South') {
      ahead = getProxMsg(isNearSouth, "South wall with a doorway leading to the Simulated Garden Area");
      left = getProxMsg(isNearEast, "East wall with ceramic tiles and forest floor accents");
      right = getProxMsg(isNearWest, "West wall with ceramic tiles and forest floor accents");
    } else if (direction === 'East') {
      ahead = getProxMsg(isNearEast, "East wall with ceramic tiles and forest floor accents");
      left = getProxMsg(isNearNorth, "North wall with a green and gold striped archway");
      right = getProxMsg(isNearSouth, "South wall with a doorway to the Simulated Garden Area");
    } else if (direction === 'West') {
      ahead = getProxMsg(isNearWest, "West wall with ceramic tiles and forest floor accents");
      left = getProxMsg(isNearSouth, "South wall with a doorway to the Simulated Garden Area");
      right = getProxMsg(isNearNorth, "North wall with a green and gold striped archway");
    }
  } else if (area === 'SimulatedGardenArea') {
    if (direction === 'North') {
      ahead = getProxMsg(isNearNorth, "North wall featuring a horizontal pink and white striped archway. A wide doorway 20 feet wide leads North back to the Rugged Play Field");
      left = getProxMsg(isNearWest, "West wall with garden scene paintings");
      right = getProxMsg(isNearEast, "East wall with 100 circular windows and brass trim");
    } else if (direction === 'South') {
      ahead = getProxMsg(isNearSouth, "South wall with an archway. A wide doorway leads South to the Meditation Hall");
      left = getProxMsg(isNearEast, "East wall with 100 circular windows and brass trim");
      right = getProxMsg(isNearWest, "West wall with garden scene paintings");
    } else if (direction === 'East') {
      ahead = getProxMsg(isNearEast, "East wall with 100 circular windows and brass trim");
      left = getProxMsg(isNearNorth, "North wall with the striped archway");
      right = getProxMsg(isNearSouth, "South wall leading back to the Meditation Hall");
    } else if (direction === 'West') {
      ahead = getProxMsg(isNearWest, "West wall with garden scene paintings");
      left = getProxMsg(isNearSouth, "South wall leading back to the Meditation Hall");
      right = getProxMsg(isNearNorth, "North wall with the striped archway");
    }
  } else if (area === 'MeditationHall') {
    if (direction === 'North') {
      ahead = getProxMsg(isNearNorth, "North wall with a doorway leading back to the Simulated Garden Area");
      left = getProxMsg(isNearWest, "West wall of the serene meditation space");
      right = getProxMsg(isNearEast, "East wall of the serene meditation space");
    } else if (direction === 'South') {
      ahead = getProxMsg(isNearSouth, "South wall with the magnificent rainbow glass doors leading to the Garden");
      left = getProxMsg(isNearEast, "East wall of the serene meditation space");
      right = getProxMsg(isNearWest, "West wall of the serene meditation space");
    } else if (direction === 'East') {
      ahead = getProxMsg(isNearEast, "East wall of the serene meditation space");
      left = getProxMsg(isNearNorth, "North wall with a doorway to the Rugged Play Field");
      right = getProxMsg(isNearSouth, "South wall with the rainbow glass doors");
    } else if (direction === 'West') {
      ahead = getProxMsg(isNearWest, "West wall of the serene meditation space");
      left = getProxMsg(isNearSouth, "South wall with the rainbow glass doors");
      right = getProxMsg(isNearNorth, "North wall with a doorway to the Rugged Play Field");
    }
  } else if (area === 'Kitchen') {
    if (direction === 'North') {
      ahead = getProxMsg(isNearNorth, "North wall of the kitchen");
      left = getProxMsg(isNearWest, "West wall with a doorway to the Meditation Hall");
      right = getProxMsg(isNearEast, "East wall with a doorway to the Dishwasher Room");
    } else if (direction === 'South') {
      ahead = getProxMsg(isNearSouth, "South wall with a doorway to the Back Porch");
      left = getProxMsg(isNearEast, "East wall with a doorway to the Dishwasher Room");
      right = getProxMsg(isNearWest, "West wall with a doorway to the Meditation Hall");
    } else if (direction === 'East') {
      ahead = getProxMsg(isNearEast, "East wall with a doorway to the Dishwasher Room");
      left = getProxMsg(isNearNorth, "North wall of the kitchen");
      right = getProxMsg(isNearSouth, "South wall with a doorway to the Back Porch");
    } else if (direction === 'West') {
      ahead = getProxMsg(isNearWest, "West wall with a doorway to the Meditation Hall");
      left = getProxMsg(isNearSouth, "South wall with a doorway to the Back Porch");
      right = getProxMsg(isNearNorth, "North wall of the kitchen");
    }
  } else if (area === 'DishWasherArea') {
    if (direction === 'North') {
      ahead = getProxMsg(isNearNorth, "North wall with heavy commercial equipment");
      left = getProxMsg(isNearWest, "West wall with a doorway leading back to the Kitchen");
      right = getProxMsg(isNearEast, "East wall of the dishwasher room");
    } else if (direction === 'South') {
      ahead = getProxMsg(isNearSouth, "South wall with large commercial sinks");
      left = getProxMsg(isNearEast, "East wall of the dishwasher room");
      right = getProxMsg(isNearWest, "West wall with a doorway leading back to the Kitchen");
    } else if (direction === 'East') {
      ahead = getProxMsg(isNearEast, "East wall of the dishwasher room");
      left = getProxMsg(isNearNorth, "North wall with heavy commercial equipment");
      right = getProxMsg(isNearSouth, "South wall with large commercial sinks");
    } else if (direction === 'West') {
      ahead = getProxMsg(isNearWest, "West wall with a doorway leading back to the Kitchen");
      left = getProxMsg(isNearSouth, "South wall with large commercial sinks");
      right = getProxMsg(isNearNorth, "North wall with heavy commercial equipment");
    }
  } else if (area === 'Garden') {
    if (direction === 'North') {
      ahead = getProxMsg(isNearNorth, "North wall of the house with rainbow glass doors");
      left = getProxMsg(isNearWest, "West garden barrier");
      right = getProxMsg(isNearEast, "East garden barrier");
    } else if (direction === 'South') {
      ahead = getProxMsg(isNearSouth, "South garden barrier overlooking the city");
      left = getProxMsg(isNearEast, "East garden barrier");
      right = getProxMsg(isNearWest, "West garden barrier");
    } else if (direction === 'East') {
      ahead = getProxMsg(isNearEast, "East garden barrier");
      left = getProxMsg(isNearNorth, "North wall with rainbow glass doors");
      right = getProxMsg(isNearSouth, "South garden barrier");
    } else if (direction === 'West') {
      ahead = getProxMsg(isNearWest, "West garden barrier");
      left = getProxMsg(isNearSouth, "South garden barrier");
      right = getProxMsg(isNearNorth, "North wall with rainbow glass doors");
    }
  } else if (area === 'Porch') {
    if (direction === 'North') {
      ahead = getProxMsg(isNearNorth, "field to the North");
      left = getProxMsg(isNearWest, "West gate");
      right = getProxMsg(isNearEast, "East field");
    } else if (direction === 'South') {
      ahead = getProxMsg(isNearSouth, "house doors");
      left = getProxMsg(isNearEast, "East field");
      right = getProxMsg(isNearWest, "West gate");
    } else if (direction === 'East') {
      ahead = getProxMsg(isNearEast, "East field");
      left = getProxMsg(isNearNorth, "house doors");
      right = getProxMsg(isNearSouth, "field to the North");
    } else if (direction === 'West') {
      ahead = getProxMsg(isNearWest, "West gate");
      left = getProxMsg(isNearSouth, "field to the North");
      right = getProxMsg(isNearNorth, "house doors");
    }
  } else if (area === 'Sidewalk') {
    if (direction === 'North') {
      ahead = getProxMsg(isNearNorth, "street");
      left = getProxMsg(isNearWest, "west wall");
      right = getProxMsg(isNearEast, "east wall");
    } else if (direction === 'South') {
      ahead = getProxMsg(isNearSouth, "porch");
      left = getProxMsg(isNearEast, "east wall");
      right = getProxMsg(isNearWest, "west wall");
    } else if (direction === 'East') {
      ahead = getProxMsg(isNearEast, "east wall");
      left = getProxMsg(isNearNorth, "street");
      right = getProxMsg(isNearSouth, "porch");
    } else if (direction === 'West') {
      ahead = getProxMsg(isNearWest, "west wall");
      left = getProxMsg(isNearSouth, "porch");
      right = getProxMsg(isNearNorth, "street");
    }
  } else if (area === 'Street') {
    if (direction === 'North') {
      ahead = getProxMsg(isNearNorth, "Adventure House");
      left = getProxMsg(isNearWest, "West sidewalk");
      right = getProxMsg(isNearEast, "East sidewalk");
    } else if (direction === 'South') {
      ahead = getProxMsg(isNearSouth, "sidewalk and porch");
      left = getProxMsg(isNearEast, "East sidewalk");
      right = getProxMsg(isNearWest, "West sidewalk");
    } else if (direction === 'East') {
      ahead = getProxMsg(isNearEast, "East sidewalk");
      left = getProxMsg(isNearNorth, "Adventure House");
      right = getProxMsg(isNearSouth, "sidewalk and porch");
    } else if (direction === 'West') {
      ahead = getProxMsg(isNearWest, "West sidewalk");
      left = getProxMsg(isNearSouth, "sidewalk and porch");
      right = getProxMsg(isNearNorth, "Adventure House");
    }
  } else if (area === 'AdventurePath') {
    if (direction === 'North') {
      ahead = getProxMsg(isNearNorth, "long path ahead");
      left = getProxMsg(isNearWest, "lush flat grassland protected against poachers");
      right = getProxMsg(isNearEast, "3-story houses and sidewalk");
    } else if (direction === 'South') {
      ahead = getProxMsg(isNearSouth, "Adventure House backdoor");
      left = getProxMsg(isNearEast, "3-story houses and sidewalk");
      right = getProxMsg(isNearWest, "lush flat grassland protected against poachers");
    } else if (direction === 'East') {
      ahead = getProxMsg(isNearEast, "3-story houses and sidewalk");
      left = getProxMsg(isNearNorth, "long path ahead");
      right = getProxMsg(isNearSouth, "Adventure House backdoor");
    } else if (direction === 'West') {
      ahead = getProxMsg(isNearWest, "lush flat grassland protected against poachers");
      left = getProxMsg(isNearSouth, "Adventure House backdoor");
      right = getProxMsg(isNearNorth, "long path ahead");
    }
  } else if (area === 'HedgePath') {
    if (direction === 'North') {
      ahead = getProxMsg(isNearNorth, "path lined with hedges and bushes");
      left = getProxMsg(isNearWest, "tall green hedge");
      right = getProxMsg(isNearEast, "tall green hedge");
    } else if (direction === 'South') {
      ahead = getProxMsg(isNearSouth, "way back to the Adventure Path");
      left = getProxMsg(isNearEast, "tall green hedge");
      right = getProxMsg(isNearWest, "tall green hedge");
    }
  } else if (area === 'RastafariCave') {
    if (direction === 'North') {
      ahead = getProxMsg(isNearNorth, "white ceramic path through the cave");
      left = getProxMsg(isNearWest, "white wall with cowboy and cowgirl art");
      right = getProxMsg(isNearEast, "white wall with animal carvings and artifacts");
    } else if (direction === 'South') {
      ahead = getProxMsg(isNearSouth, "way back to the Hedge Path");
      left = getProxMsg(isNearEast, "white wall with animal carvings and artifacts");
      right = getProxMsg(isNearWest, "white wall with cowboy and cowgirl art");
    }
  } else if (area === 'Overpass') {
    if (direction === 'North') {
      ahead = getProxMsg(isNearNorth, "tiled overpass path overlooking the farm");
      left = getProxMsg(isNearWest, "8-foot safety barrier");
      right = getProxMsg(isNearEast, "8-foot safety barrier");
    } else if (direction === 'South') {
      ahead = getProxMsg(isNearSouth, "way back to the Rastafari Cave");
      left = getProxMsg(isNearEast, "8-foot safety barrier");
      right = getProxMsg(isNearWest, "8-foot safety barrier");
    }
  } else if (area === 'Suburb') {
    if (direction === 'North') {
      ahead = getProxMsg(isNearNorth, "tracked path through the suburb");
      left = getProxMsg(isNearWest, "suburban houses");
      right = getProxMsg(isNearEast, "suburban houses");
    } else if (direction === 'South') {
      ahead = getProxMsg(isNearSouth, "way back to the Overpass");
      left = getProxMsg(isNearEast, "suburban houses");
      right = getProxMsg(isNearWest, "suburban houses");
    }
  } else if (area === 'OpenTrench') {
    if (direction === 'North') {
      ahead = getProxMsg(isNearNorth, "ceramic brick path through the trench");
      left = getProxMsg(isNearWest, "tall ceramic brick barrier");
      right = getProxMsg(isNearEast, "tall ceramic brick barrier");
    } else if (direction === 'South') {
      ahead = getProxMsg(isNearSouth, "way back to the Suburb");
      left = getProxMsg(isNearEast, "tall ceramic brick barrier");
      right = getProxMsg(isNearWest, "tall ceramic brick barrier");
    }
  } else if (area === 'AdventureHouseFoyer') {
    if (direction === 'North') {
      ahead = getProxMsg(isNearNorth, "brown front door");
      left = getProxMsg(isNearWest, "white wall");
      right = getProxMsg(isNearEast, "white wall");
    } else if (direction === 'South') {
      ahead = getProxMsg(isNearSouth, "hallway");
      left = getProxMsg(isNearEast, "white wall");
      right = getProxMsg(isNearWest, "white wall");
    } else if (direction === 'East') {
      ahead = getProxMsg(isNearEast, "white wall");
      left = getProxMsg(isNearNorth, "hallway");
      right = getProxMsg(isNearSouth, "brown front door");
    } else if (direction === 'West') {
      ahead = getProxMsg(isNearWest, "white wall");
      left = getProxMsg(isNearSouth, "brown front door");
      right = getProxMsg(isNearNorth, "hallway");
    }
  } else if (area === 'AdventureHouseHallway') {
    if (direction === 'North') {
      ahead = getProxMsg(isNearNorth, "tea room");
      left = getProxMsg(isNearWest, "hallway wall");
      right = getProxMsg(isNearEast, "hallway wall");
    } else if (direction === 'South') {
      ahead = getProxMsg(isNearSouth, "foyer");
      left = getProxMsg(isNearEast, "hallway wall");
      right = getProxMsg(isNearWest, "hallway wall");
    } else if (direction === 'East') {
      ahead = getProxMsg(isNearEast, "hallway wall");
      left = getProxMsg(isNearNorth, "tea room");
      right = getProxMsg(isNearSouth, "foyer");
    } else if (direction === 'West') {
      ahead = getProxMsg(isNearWest, "hallway wall");
      left = getProxMsg(isNearSouth, "foyer");
      right = getProxMsg(isNearNorth, "tea room");
    }
  } else if (area === 'AdventureHouseTeaRoom') {
    if (direction === 'North') {
      ahead = getProxMsg(isNearNorth, "wall");
      left = getProxMsg(isNearWest, "wall");
      right = getProxMsg(isNearEast, "wall");
    } else if (direction === 'South') {
      ahead = getProxMsg(isNearSouth, "hallway");
      left = getProxMsg(isNearEast, "wall");
      right = getProxMsg(isNearWest, "wall");
    } else if (direction === 'East') {
      ahead = getProxMsg(isNearEast, "wall");
      left = getProxMsg(isNearNorth, "wall");
      right = getProxMsg(isNearSouth, "hallway");
    } else if (direction === 'West') {
      ahead = getProxMsg(isNearWest, "wall");
      left = getProxMsg(isNearSouth, "hallway");
      right = getProxMsg(isNearNorth, "wall");
    }
  } else if (area === 'AllisonsFoyer') {
    if (direction === 'North') {
      ahead = getProxMsg(isNearNorth, "North wall leading to the garden");
      left = getProxMsg(isNearWest, "West wall featuring doors to the Northwest Corner Ramps and Allison's Store");
      right = getProxMsg(isNearEast, "East wall featuring doors to the Southeast Warp Room and Dining Facility");
    } else if (direction === 'South') {
      ahead = getProxMsg(isNearSouth, "South wall with grand entrance doors leading to the porch");
      left = getProxMsg(isNearEast, "East wall");
      right = getProxMsg(isNearWest, "West wall");
    } else if (direction === 'East') {
      ahead = getProxMsg(isNearEast, "East wall with an entrance to the Restaurant Communal Dining Facility");
      left = getProxMsg(isNearNorth, "North wall");
      right = getProxMsg(isNearSouth, "South entrance");
    } else if (direction === 'West') {
      ahead = getProxMsg(isNearWest, "West wall with an entrance to Allison's Store");
      left = getProxMsg(isNearSouth, "South entrance");
      right = getProxMsg(isNearNorth, "North wall");
    }
  } else if (area === 'WesternWarpRoom') {
    if (direction === 'East') {
      ahead = getProxMsg(isNearEast, "East wall featuring Pablo's Pony Field Warp picture with a decorative barn door frame, a mirror, and a red barn-wall separator");
    } else if (direction === 'North') {
      ahead = getProxMsg(isNearNorth, "North wall with a sliding cowboy-themed door");
    }
  } else if (area === 'AllisonsMountainsWarpRoom') {
    if (direction === 'North') {
      ahead = getProxMsg(isNearNorth, "North wall featuring The Mountain Pass picture with a rock-decorated frame and a mountain-themed separator next to a wooden table");
    } else if (direction === 'East') {
      ahead = getProxMsg(isNearEast, "East wall with the entrance door");
    }
  } else if (area === 'AllisonsStore') {
    if (direction === 'South') {
      ahead = getProxMsg(isNearSouth, "South wall with a large glass door showing cash registers and people working");
    } else {
      ahead = getProxMsg(true, "Interior of Allison's Store filled with various items and busy staff");
    }
  } else if (area === 'WestManorPath' || area === 'EastManorPath') {
    const pathName = area === 'WestManorPath' ? "West Manor Path" : "East Manor Path";
    if (direction === 'North') {
      ahead = getProxMsg(isNearNorth, "end of the path where a square platform is visible");
      left = getProxMsg(true, "lush landscaping bordering the manor grounds");
      right = getProxMsg(true, "the manor building distance");
    } else if (direction === 'South') {
      ahead = getProxMsg(isNearSouth, "start of the path near the porch");
      left = getProxMsg(true, "the manor building distance");
      right = getProxMsg(true, "lush landscaping bordering the manor grounds");
    }
  } else if (area === 'WandasWarpHouse') {
    if (direction === 'North') {
      ahead = getProxMsg(isNearNorth, "North wall of Wanda's Warp House made of solid white bricks with blue mortar. The pony paths warp has been relocated to the West themed barn");
      left = getProxMsg(isNearWest, "West double sliding doors leading to the farm hallway");
      right = getProxMsg(isNearEast, "solid white brick wall with blue mortar");
    } else if (direction === 'South') {
      ahead = getProxMsg(isNearSouth, "South entrance leading back to the platform");
      left = getProxMsg(isNearEast, "solid white brick wall");
      right = getProxMsg(isNearWest, "West double sliding doors leading to the farm hallway");
    }
  } else if (area === 'WandaWestFarmHallway') {
    if (direction === 'North') {
      ahead = getProxMsg(isNearNorth, "a pristine white wooden fence with a pixelated farmland beyond featuring tall corn and grazing cattle");
      left = getProxMsg(isNearWest, "a rustic wooden gate leading to the Red Barn");
      right = getProxMsg(isNearEast, "double sliding doors leading back to Wanda's Warp House");
    } else if (direction === 'South') {
      ahead = getProxMsg(isNearSouth, "a pristine white wooden fence overlooking a peaceful duck pond with four swimming ducks");
      left = getProxMsg(isNearEast, "double sliding doors leading back to Wanda's Warp House");
      right = getProxMsg(isNearWest, "a rustic wooden gate leading to the Red Barn");
    } else if (direction === 'West') {
      ahead = getProxMsg(isNearWest, "a rustic wooden gate leading to the Red Barn themed warp house");
      left = getProxMsg(isNearSouth, "a white wooden fence overlooking the duck pond");
      right = getProxMsg(isNearNorth, "a white wooden fence with grazing cattle");
    } else if (direction === 'East') {
      ahead = getProxMsg(isNearEast, "the double sliding doors leading back to Wanda's Warp House");
      left = getProxMsg(isNearNorth, "a white wooden fence with grazing cattle");
      right = getProxMsg(isNearSouth, "a white wooden fence overlooking the duck pond");
    }
  } else if (area === 'WandaWestBarnWarpHouse') {
    if (direction === 'North') {
      ahead = getProxMsg(isNearNorth, "a red barn wall decorated with Trinika's pony paths warp on the right, and a slotted table on the left decorated with cowboy horse riders and a chicken picture");
      left = getProxMsg(isNearWest, "solid timber West walls of the barn");
      right = getProxMsg(isNearEast, "wooden gate leading back to the farm hallway");
    } else if (direction === 'South') {
      ahead = getProxMsg(isNearSouth, "solid red-painted barn wall");
      left = getProxMsg(isNearEast, "wooden gate leading back to the farm hallway");
      right = getProxMsg(isNearWest, "solid timber West walls of the barn");
    } else if (direction === 'West') {
      ahead = getProxMsg(isNearWest, "solid timber West walls of the barn");
      left = getProxMsg(isNearSouth, "solid red-painted barn wall");
      right = getProxMsg(isNearNorth, "the north wall decorations including the table and relocated warp");
    } else if (direction === 'East') {
      ahead = getProxMsg(isNearEast, "the wooden gate leading back to the farm ground hallway");
      left = getProxMsg(isNearNorth, "the north wall decorations including the table and relocated warp");
      right = getProxMsg(isNearSouth, "solid red-painted barn wall");
    }
  } else if (area === 'WandaPlatform') {
    if (direction === 'North') {
      ahead = getProxMsg(isNearNorth, "gate leading to Wanda's Warp House");
      left = getProxMsg(isNearWest, "rainbow pillar at the edge of the platform");
      right = getProxMsg(isNearEast, "rainbow pillar at the edge of the platform");
    } else if (direction === 'South') {
      ahead = getProxMsg(isNearSouth, "locked gate leading back to the side path");
      left = getProxMsg(isNearEast, "platform edge with a clear overhang");
      right = getProxMsg(isNearWest, "platform edge with a clear overhang");
    }
  } else if (area === 'MariasWarpCastle') {
    if (direction === 'North') {
      ahead = getProxMsg(isNearNorth, "North wall featuring a large picture of Allison's Manor");
      left = getProxMsg(isNearWest, "strong, regal castle wall");
      right = getProxMsg(isNearEast, "strong, regal castle wall");
    } else if (direction === 'South') {
      ahead = getProxMsg(isNearSouth, "South wall of the warp castle");
      left = getProxMsg(isNearEast, "regal castle wall");
      right = getProxMsg(isNearWest, "regal castle wall");
    }
  } else if (area === 'AllisonsDecisionZone') {
    if (direction === 'North') {
      ahead = getProxMsg(isNearNorth, "honeycomb gate leading to Allison's Manor Porch");
      left = getProxMsg(isNearWest, "white picket fence with lush trees and bushes");
      right = getProxMsg(isNearEast, "white picket fence with lush trees and bushes");
    } else if (direction === 'South') {
      ahead = getProxMsg(isNearSouth, "way back to Maria's Warp Castle");
      left = getProxMsg(isNearEast, "lush greenery behind the fence");
      right = getProxMsg(isNearWest, "lush greenery behind the fence");
    }
  } else if (area === 'CommunalStore') {
    if (direction === 'North') {
      ahead = getProxMsg(isNearNorth, "North wall with welcoming glass sliding doors leading to the Front Porch, and a high clearance roll-up truck delivery gate with a beautiful rainbow pattern, gold trimming, and brass slats");
      left = getProxMsg(isNearWest, "West ceramic tile wall with nice windows looking outside");
      right = getProxMsg(isNearEast, "East ceramic tile wall with welcoming glass sliding doors leading to the Grand Playground");
    } else if (direction === 'South') {
      ahead = getProxMsg(isNearSouth, "South wall featuring beautiful windows overlooking the manor gardens");
      left = getProxMsg(isNearEast, "East wall with glass sliding doors leading to the Grand Playground");
      right = getProxMsg(isNearWest, "West wall with glass sliding doors leading to the West Manor Path");
    } else if (direction === 'East') {
      ahead = getProxMsg(isNearEast, "East ceramic tile wall with welcoming glass sliding doors centered at 1000 feet leading to the Grand Playground");
      left = getProxMsg(isNearNorth, "North wall with sliding doors and the high roll-up delivery gate");
      right = getProxMsg(isNearSouth, "South wall with windows");
    } else if (direction === 'West') {
      ahead = getProxMsg(isNearWest, "West ceramic tile wall with glass sliding doors centered at 1000 feet leading to the West Manor Path, and windows");
      left = getProxMsg(isNearSouth, "South wall with windows");
      right = getProxMsg(isNearNorth, "North wall with sliding doors and the high roll-up delivery gate");
    }
  } else if (area === 'Sidewalk' || area === 'Street') {
    if (y <= 8 && direction === 'South') {
      return "This is the front porch of your Rasta-Manor; it has a pink and white checked flooring, skylights that are located at the overhang of this porch, and it has a set of blue doors ahead.";
    }
    if (y <= 8 && direction === 'North') {
      return "The front porch of your manor is behind you. You are currently on the sidewalk. The street is ahead of you.";
    }
    if (y >= (dims.height - 10) && direction === 'North') {
      return "This is the edge of the sidewalk, the street is like any other street. However; this car-free street is wide enough to support use of public transit vehicles, trucks that deliver food and supplies,--and other gooes via delivery, and emergency vehicles.";
    }
    if (y >= (dims.height - 10) && direction === 'South') {
      return "The street is behind you, and you on an sidewalk.. Rasta-Manor is ahead of you.";
    }
    return "This is a sidewalk that goes around the block. This brick sidewalk is built with artistry and craftsmanship by everyday city workers who care about this city.";
  }

  return `Ahead of you is ${ahead}. On your left is ${left}, and on your right is ${right}.`;
};
