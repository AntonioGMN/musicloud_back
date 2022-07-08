import { Injectable } from '@nestjs/common';
import { PlaylistsRepository } from './repositories/playlist.repository';

@Injectable()
export class PlaylistsService {
  constructor(private readonly playlistsRepository: PlaylistsRepository) {}

  async create(title: string, userId: number) {
    return this.playlistsRepository.create(title, userId);
  }
}
