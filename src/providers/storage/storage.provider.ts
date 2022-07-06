import { Readable } from 'stream';

export abstract class StorageProvider {
  abstract saveFile(filepath: string, buffer: Buffer): Promise<void>;
  abstract getFile(filepath: string): Promise<Buffer>;
  abstract removeFile(filepath: string): Promise<void>;
  abstract getFileAsReadable(filename: string): Promise<Readable>;
}
