import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AuthModule } from './auth/auth.module';
import { PlalistModule } from './playlists/playlist.module';
import { SongsModule } from './songs/songs.module';
import { UsersModule } from './users/users.module';

@Module({
  imports: [UsersModule, AuthModule, SongsModule, PlalistModule],
  controllers: [AppController],
})
export class AppModule {}
