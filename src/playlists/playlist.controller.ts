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
import { JwtAuthGuard } from '../auth/guards/jwt-auth.guard';
import { AuthorizedRequest } from '../infra/http/authorized-request';
import { PlaylistsService } from './playlist.service';

@Controller('/playlists')
export class PlaylistsController {
  constructor(private readonly playlistsService: PlaylistsService) {}

  @UseGuards(JwtAuthGuard)
  @Post('/create')
  @HttpCode(HttpStatus.CREATED)
  async create(@Request() req: AuthorizedRequest) {
    return this.playlistsService.create('New playlist', req.user.userId);
  }
}
