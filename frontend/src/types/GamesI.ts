export interface GamesI {
  id: number;
  name: string;
  img: string;
  price: number;
}

export interface SystemRequirementsI {
  windows: number;
  processor: string;
  RAM: number;
  graphicsCard: string;
  DirectX: number;
  DiskSpace: string;
}

export interface GameCardI extends GamesI {
  description: string;
  windows: number;
  processor: string;
  RAM: number;
  graphicsCard: string;
  DirectX: number;
  DiskSpace: string;
  info: {
    description: string;
    img: string;
  };
  systemRequirements: {
    minimum: SystemRequirementsI;
    recommended: SystemRequirementsI;
  };
}
