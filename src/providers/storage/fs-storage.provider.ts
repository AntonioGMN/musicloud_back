import { createReadStream, existsSync, promises as fs } from 'fs';
import { join } from 'path';
import { StorageProvider } from './storage.provider';

export class FsStorageProvider implements StorageProvider {
  private uploadFolder: string;

  constructor() {
    this.uploadFolder = 'tmp';
  }

  ensureDirectoryExistence() {
    if (!existsSync(this.uploadFolder)) {
      fs.mkdir(this.uploadFolder);
    }
  }

  getFilePath(filename: string) {
    return `${this.uploadFolder}/${filename}`;
  }

  async saveFile(filename: string, buffer: Buffer) {
    this.ensureDirectoryExistence();

    await fs.writeFile(this.getFilePath(filename), buffer);
    console.log('FILE WROTE ');
  }

  async getFile(filepath: string) {
    return fs.readFile(filepath);
  }

  async getFileAsReadable(filename: string) {
    const filepath = join(process.cwd(), this.uploadFolder, filename);

    return createReadStream(filepath);
  }

  async removeFile(filepath: string): Promise<void> {
    await fs.unlink(join(this.uploadFolder, filepath));
  }

  async resetStorage() {
    const files = await fs.readdir(this.uploadFolder);

    for (const file of files) {
      await fs.unlink(join(this.uploadFolder, file));
    }
  }
}
