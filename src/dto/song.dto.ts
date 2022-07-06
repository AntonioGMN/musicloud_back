import { Song } from '@prisma/client';

export class SongDto implements Song {
  constructor(
    public id: number,
    public title: string,
    public artist: string | null,
    public album: string | null,
    public year: number | null,
    public bucketKey: string | null,
    public wasParsed: boolean,
    public userId: number,
  ) {}
}
