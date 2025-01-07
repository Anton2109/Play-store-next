export interface GamesI {
    id: number,
    name: string,
    img: string,
    price: number,
}

export interface GameCardI extends GamesI {
    description: string,
    windows: number,
    processor: string,
    RAM: number,
    graphicsCard: string,
    DirectX: number,
    diskSpace: string,
    info: {
        description: string,
        img: string,
    }
}