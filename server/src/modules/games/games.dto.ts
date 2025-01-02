export class CreateGameDto {
  readonly name: string;
  readonly description?: string;
  readonly maxPlayers: number;
} 