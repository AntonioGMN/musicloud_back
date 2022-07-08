import { PlaylistDto } from 'src/dto/playlist.dto';

export abstract class PlaylistsRepository {
  abstract create(title: string, userId: number): Promise<PlaylistDto>;
}
