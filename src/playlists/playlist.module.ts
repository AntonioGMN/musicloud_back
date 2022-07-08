import { Module } from '@nestjs/common';
import { PrismaConnection } from 'src/infra/database/prisma-connection';
import { PlaylistsController } from './playlist.controller';
import { PlaylistsService } from './playlist.service';
import { PlaylistsDatabaseRepository } from './repositories/playlist-database.repository';
import { PlaylistsRepository } from './repositories/playlist.repository';

@Module({
  controllers: [PlaylistsController],
  providers: [
    PlaylistsService,
    PrismaConnection,
    { provide: PlaylistsRepository, useClass: PlaylistsDatabaseRepository },
  ],
  exports: [PlaylistsService],
})
export class PlalistModule {}
