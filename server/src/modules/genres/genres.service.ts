import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Genre } from './entities/genres.entity';
import { CreateGenreDto } from './dto/genres.dto';
import { pathsConfig } from '../../config/paths.config';
import { Game } from '../games/games.entity';

@Injectable()
export class GenresService {
  constructor(
    @InjectRepository(Genre)
    private readonly genreRepository: Repository<Genre>,
  ) {}

  async findAll(): Promise<Genre[]> {
    const genres = await this.genreRepository.find();
    return genres.map((genre) => ({
      ...genre,
      genresImg: `${pathsConfig.baseUrl}${pathsConfig.assets.images.genres}/${genre.genresImg}`,
    }));
  }

  async findOne(id: number): Promise<Genre> {
    const genre = await this.genreRepository.findOne({
      where: { id },
      relations: ['games'],
    });

    if (!genre) {
      throw new NotFoundException(`Жанр с ID ${id} не найден`);
    }

    return {
      ...genre,
      genresImg: `${pathsConfig.baseUrl}${pathsConfig.assets.images.genres}/${genre.genresImg}`,
      games: genre.games.map((game) => ({
        ...game,
        img: `${pathsConfig.baseUrl}${pathsConfig.assets.images.games}/${game.img}`,
      })),
    };
  }

  async create(createGenreDto: CreateGenreDto): Promise<Genre> {
    const genre = this.genreRepository.create(createGenreDto);
    return this.genreRepository.save(genre);
  }

  async findGamesByGenreId(genreId: number): Promise<Game[]> {
    const genre = await this.genreRepository.findOne({
      where: { id: genreId },
      relations: ['games'],
    });

    if (!genre) {
      throw new NotFoundException(`Жанр с ID ${genreId} не найден`);
    }

    return genre.games.map((game) => ({
      ...game,
      img: `${pathsConfig.baseUrl}${pathsConfig.assets.images.games}/${game.img}`,
    }));
  }
}
