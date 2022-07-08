import { Playlist } from '@prisma/client';

export class PlaylistDto implements Playlist {
  constructor(public id: number, public title: string, public userId: number) {}
}
