import { Injectable } from '@nestjs/common';
import { SongDto } from '../../dto/song.dto';
import { Song } from '../../entities/song.entity';
import { PrismaConnection } from '../../infra/database/prisma-connection';
import { SongsRepository } from './songs.repository';

@Injectable()
export class SongsDatabaseRepository implements SongsRepository {
  constructor(private readonly connection: PrismaConnection) {}

  async find(userId: number) {
    const songs = await this.connection.song.findMany({
      where: {
        userId,
      },
    });

    return songs.map(
      (song) =>
        new SongDto(
          song.id,
          song.title,
          song.artist,
          song.album,
          song.year,
          song.bucketKey,
          song.wasParsed,
          song.userId,
        ),
    );
  }

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
      data.bucketKey,
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
      `${id}-${song.title}.mp3`,
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

  async updateBucketKey(songId: number, bucketKey: string) {
    await this.connection.song.update({
      data: {
        bucketKey,
      },
      where: {
        id: songId,
      },
    });
  }
}
