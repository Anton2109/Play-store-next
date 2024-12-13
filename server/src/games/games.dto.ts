import { IsString, IsNotEmpty, IsNumber } from 'class-validator';

export class CreateGameDto {
  @IsString()
  @IsNotEmpty()
  readonly name: string;

  @IsString()
  @IsNotEmpty()
  readonly img: string;

  @IsNumber()
  @IsNotEmpty()
  readonly price: number;
}
