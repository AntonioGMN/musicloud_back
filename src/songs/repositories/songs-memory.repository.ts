import { SongDto } from '../../dto/song.dto';
import { Song } from '../../entities/song.entity';
import { SongsRepository } from './songs.repository';

export class SongsMemoryRepository implements SongsRepository {
  private songs: SongDto[] = [];

  constructor() {
    this.songs = [];
  }

  async findById(songId: number): Promise<SongDto> {
    return this.songs.find((song) => song.id === songId);
  }

  async find(userId: number): Promise<SongDto[]> {
    return this.songs.filter((song) => song.userId === userId);
  }

  async create(song: Song, userId: number) {
    const id = Date.now();
    const songDto = new SongDto(
      id,
      song.title,
      song.artist,
      song.album,
      song.year,
      `${id}-${song.title}.mp3`,
      false,
      userId,
    );

    this.songs.push(songDto);

    return songDto;
  }

  async updateSongParseStatus(songId: number) {
    const updatedSong = await this.findById(songId);
    updatedSong.wasParsed = true;
  }

  async updateBucketKey(songId: number, bucketKey: string) {
    const updatedSong = await this.findById(songId);
    updatedSong.bucketKey = bucketKey;
  }

  resetDatabase() {
    this.songs = [];
  }
}
