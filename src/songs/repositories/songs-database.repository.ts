import { Injectable } from '@nestjs/common';
import { SongDto } from '../../dto/song.dto';
import { Song } from '../../entities/song.entity';
import { PrismaConnection } from '../../infra/database/prisma-connection';
import { SongsRepository } from './songs.repository';

@Injectable()
export class SongsDatabaseRepository implements SongsRepository {
  constructor(private readonly connection: PrismaConnection) {}

  async findById(songId: number): Promise<SongDto | null> {
    const data = await this.connection.song.findUnique({
      where: {
        id: songId,
      },
    });

    if (!data) return null;

    return new SongDto(
      data.id,
      data.title,
      data.artist,
      data.album,
      data.year,
      data.wasParsed,
      data.userId,
    );
  }

  async create(song: Song, userId: number) {
    const { id } = await this.connection.song.create({
      data: {
        ...song,
        userId,
      },
    });

    return new SongDto(
      id,
      song.title,
      song.artist,
      song.album,
      song.year,
      false,
      userId,
    );
  }

  async updateSongParseStatus(songId: number) {
    await this.connection.song.update({
      data: {
        wasParsed: true,
      },
      where: {
        id: songId,
      },
    });
  }
}
