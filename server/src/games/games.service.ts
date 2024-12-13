import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Game } from './games.entity';
import { CreateGameDto } from './games.dto';

@Injectable()
export class GameService {
  constructor(
    @InjectRepository(Game)
    private readonly gameRepository: Repository<Game>,
  ) {}

  async findAll(): Promise<Game[]> {
    return this.gameRepository.find();
  }

  async findOne(id: number): Promise<Game> {
    const game = await this.gameRepository.findOne({ where: { id } });
    if (!game) {
      throw new NotFoundException(`Game with ID ${id} not found`);
    }
    return game;
  }

  async create(createGameDto: CreateGameDto): Promise<Game> {
    const game = this.gameRepository.create(createGameDto);
    return this.gameRepository.save(game);
  }

  async remove(id: number): Promise<void> {
    const game = await this.findOne(id);
    await this.gameRepository.remove(game);
  }
}
