import {
  Controller,
  Get,
  HttpCode,
  HttpStatus,
  Param,
  Post,
  Request,
  Response,
  StreamableFile,
  UploadedFile,
  UseGuards,
  UseInterceptors,
} from '@nestjs/common';
import { FileInterceptor } from '@nestjs/platform-express';
import { JwtAuthGuard } from '../auth/guards/jwt-auth.guard';
import { FileDto } from '../dto/file.dto';
import { AuthorizedRequest } from '../infra/http/authorized-request';
import { SongsService } from './songs.service';

@Controller('songs')
export class SongsController {
  constructor(private readonly songsService: SongsService) {}

  @UseInterceptors(FileInterceptor('song'))
  @UseGuards(JwtAuthGuard)
  @Post('upload')
  @HttpCode(HttpStatus.CREATED)
  async upload(
    @Request() req: AuthorizedRequest,
    @UploadedFile() file: Express.Multer.File,
  ) {
    const fileDto = new FileDto(file.originalname, file.mimetype, file.buffer);

    return this.songsService.upload(req.user.userId, fileDto);
  }

  @UseGuards(JwtAuthGuard)
  @Get('stream/:id')
  async getSong(
    @Request() req: AuthorizedRequest,
    @Response({ passthrough: true }) res,
    @Param('id') id: string,
  ) {
    const { file, filename } = await this.songsService.stream(
      req.user.userId,
      +id,
    );

    res.set({
      'Content-Type': 'audio/mpeg',
      'Accept-Ranges': 'bytes',
      'Content-Disposition': `attachment; filename="${filename}"`,
    });

    return new StreamableFile(file);
  }
}
