import { Controller, Get, Param, Res } from '@nestjs/common';
import { Response } from 'express';
import { join } from 'path';
import * as fs from 'fs';
import { AppService } from './app.service';

@Controller()
export class AppController {
  constructor(private readonly appService: AppService) {}

  @Get('Images/ImgGenres/:filename')
  getImage(@Param('filename') filename: string, @Res() res: Response) {
    const imagePath = join(
      __dirname,
      '..',
      'src',
      'Images',
      'ImgGenres',
      filename,
    );

    if (fs.existsSync(imagePath)) {
      res.sendFile(imagePath);
    } else {
      res.status(404).send('Изображение не существует или не найдено.');
    }
  }
}
