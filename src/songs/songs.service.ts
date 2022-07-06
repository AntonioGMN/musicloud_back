import { Injectable } from '@nestjs/common';
import { FileDto } from '../dto/file.dto';
import { DomainError } from '../entities/domain-error';
import { Song } from '../entities/song.entity';
import { StorageProvider } from '../providers/storage/storage.provider';
import { SongsRepository } from './repositories/songs.repository';

@Injectable()
export class SongsService {
  constructor(
    private readonly songsRepository: SongsRepository,
    private readonly storageProvider: StorageProvider,
  ) {}

  async find(userId: number) {
    return this.songsRepository.find(userId);
  }

  async upload(userId: number, songFile: FileDto) {
    const { filename, mimetype, buffer } = songFile;
    const songTitle = filename.split('.').at(0);
    const song = new Song(songTitle);

    const isAudioFile = mimetype.includes('audio');
    if (!isAudioFile) {
      throw new DomainError(
        Song.name,
        'only audio files are valid',
        'invalid operation',
      );
    }

    const songDto = await this.songsRepository.create(song, userId);
    await this.storageProvider.saveFile(songDto.bucketKey, buffer);

    return songDto;
  }

  async stream(userId: number, songId: number) {
    const song = await this.songsRepository.findById(songId);
    if (!song) {
      throw new DomainError(Song.name, 'song not found', 'entity not found');
    }

    if (song.userId !== userId) {
      throw new DomainError(Song.name, 'unauthorized', 'unauthorized');
    }

    if (!song.wasParsed) {
      throw new DomainError(
        Song.name,
        'song not parsed yet',
        'invalid operation',
      );
    }

    const filename = song.bucketKey;
    const file = await this.storageProvider.getFileAsReadable(filename);

    return {
      filename,
      file,
    };
  }
}
