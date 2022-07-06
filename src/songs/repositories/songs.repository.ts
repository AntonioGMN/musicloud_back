import { SongDto } from '../../dto/song.dto';
import { Song } from '../../entities/song.entity';

export abstract class SongsRepository {
  abstract create(song: Song, userId: number): Promise<SongDto>;
  abstract findById(songId: number): Promise<SongDto>;
  abstract updateSongParseStatus(songId: number): Promise<void>;
  abstract updateBucketKey(songId: number, bucketKey: string): Promise<void>;
  abstract find(userId: number): Promise<SongDto[]>;
}
