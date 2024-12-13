import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Genre } from './genres.entity';
import { CreateGenreDto } from './genres.dto';
import { Game } from 'src/game/game.entity';

@Injectable()
export class GenresService {
  constructor(
    @InjectRepository(Genre)
    private readonly genreRepository: Repository<Genre>,
  ) {}

  async findAll(): Promise<Genre[]> {
    return this.genreRepository.find();
  }

  async findOne(id: number): Promise<Genre> {
    const genre = await this.genreRepository
      .createQueryBuilder('genre')
      .leftJoinAndSelect('genre.games', 'game')
      .where('genre.id = :id', { id })
      .getOne();

    if (!genre) {
      throw new NotFoundException(`Жанр по id: ${id} не найден`);
    }

    return genre;
  }

  async create(createGenreDto: CreateGenreDto): Promise<Genre> {
    const genre = this.genreRepository.create(createGenreDto);
    return this.genreRepository.save(genre);
  }

  async remove(id: number): Promise<void> {
    const genre = await this.findOne(id);
    await this.genreRepository.remove(genre);
  }

  async findGamesByGenreId(genreId: number): Promise<Game[]> {
    const genre = await this.genreRepository.findOne({
      where: { id: genreId },
      relations: ['games'],
    });

    return genre.games;
  }
}
