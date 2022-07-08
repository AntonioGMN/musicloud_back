import { Injectable } from '@nestjs/common';
import { PlaylistDto } from 'src/dto/playlist.dto';
import { PrismaConnection } from '../../infra/database/prisma-connection';
import { PlaylistsRepository } from './playlist.repository';

@Injectable()
export class PlaylistsDatabaseRepository implements PlaylistsRepository {
  constructor(private readonly connection: PrismaConnection) {}
  async create(title: string, userId: number) {
    const { id } = await this.connection.playlist.create({
      data: {
        title,
        userId,
      },
    });
    return new PlaylistDto(id, title, userId);
  }
}
