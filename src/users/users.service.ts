import { Injectable } from '@nestjs/common';
import { PlaylistsRepository } from 'src/playlists/repositories/playlist.repository';
import { SignUpDto } from '../dto/sign-up.dto';
import { UserDto } from '../dto/user.dto';
import { DomainError } from '../entities/domain-error';
import { User } from '../entities/user.entity';
import { HashProvider } from '../providers/hash/hash.provider';
import { UsersRepository } from './repositories/users.repository';

@Injectable()
export class UsersService {
  constructor(
    private readonly usersRepository: UsersRepository,
    private readonly hashProvider: HashProvider, //private readonly playlistRepository: PlaylistsRepository,
  ) {}

  async signUp(signUpDto: SignUpDto) {
    const { name, email, password, provider } = signUpDto;

    const user = new User(name, email, password, provider);
    const existingUser = await this.usersRepository.findByEmail(email);
    if (existingUser) {
      throw new DomainError(
        User.name,
        'cannot create an user with this email, emails must be unique',
        'invalid operation',
      );
    }

    user.password = await this.hashProvider.hash(user.password);
    const user2 = await this.usersRepository.create(user);
  }

  async findByEmail(email: string): Promise<UserDto | null> {
    const user = await this.usersRepository.findByEmail(email);

    return user;
  }
}
