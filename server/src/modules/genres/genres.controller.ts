import {
  Controller,
  Get,
  Post,
  Body,
  Param,
  HttpCode,
  HttpStatus,
} from '@nestjs/common';
import { GenresService } from './genres.service';
import { CreateGenreDto } from './dto/genres.dto';
import { Genre } from './entities/genres.entity';
import { Game } from '../games/entities/games.entity';

@Controller('genres')
export class GenresController {
  constructor(private readonly genresService: GenresService) {}

  @Get(':id/games')
  async findGamesByGenreId(@Param('id') id: string): Promise<Game[]> {
    return this.genresService.findGamesByGenreId(+id);
  }

  @Get()
  async findAll(): Promise<Genre[]> {
    return this.genresService.findAll();
  }

  @Get(':id')
  async findOne(@Param('id') id: string): Promise<Genre> {
    return this.genresService.findOne(+id);
  }

  @Post()
  @HttpCode(HttpStatus.CREATED)
  async create(@Body() createGenreDto: CreateGenreDto): Promise<Genre> {
    return this.genresService.create(createGenreDto);
  }
}
