import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { GenresModule } from './modules/genres/genres.module';
import { GameModule } from './modules/games/games.module';
import { GameByIdModule } from './modules/game-by-id/game-by-id.module';
import { GameInfoModule } from './modules/game-info/game-info.module';
import { SystemReqMinModule } from './modules/system_req_min/system_req_min.module';
import { SystemReqMaxModule } from './modules/system_req_max/system_req_max.module';

@Module({
  imports: [
    TypeOrmModule.forRoot({
      type: 'mysql',
      host: 'localhost',
      port: 3306,
      username: 'root',
      password: '234565',
      database: 'game_store',
      entities: [__dirname + '/**/*.entity{.ts,.js}'],
      synchronize: false,
      logging: true,
    }),

    GenresModule,
    GameModule,
    GameByIdModule,
    GameInfoModule,
    SystemReqMinModule,
    SystemReqMaxModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}