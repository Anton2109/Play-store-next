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
import { CreateGenreDto } from './genres.dto';
import { Genre } from './genres.entity';

@Controller('genres')
export class GenresController {
  constructor(private readonly genresService: GenresService) {}

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