import { Test, TestingModule } from '@nestjs/testing';
import { AuthService } from './auth.service';
import { JwtService } from '@nestjs/jwt';
import { getRepositoryToken } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { User } from './entities/user.entity';

const mockUserRepository = {
  findOne: jest.fn(),
  create: jest.fn(),
  save: jest.fn(),
};

describe('AuthService', () => {
  let service: AuthService;
  let userRepository: Repository<User>;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        AuthService,
        JwtService,
        {
          provide: getRepositoryToken(User),
          useValue: mockUserRepository,
        },
      ],
    }).compile();

    service = module.get<AuthService>(AuthService);
    userRepository = module.get<Repository<User>>(getRepositoryToken(User));
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });

  it('should create a new user if not found', async () => {
    mockUserRepository.findOne.mockResolvedValue(null);
    mockUserRepository.create.mockReturnValue({
      email: 'test@example.com',
      displayName: 'Test User',
    });
    mockUserRepository.save.mockResolvedValue({
      id: '1',
      email: 'test@example.com',
      displayName: 'Test User',
    });

    const result = await service.validateOAuthLogin(
      { email: 'test@example.com', displayName: 'Test User' },
      'google',
    );

    expect(mockUserRepository.findOne).toHaveBeenCalledWith({
      where: { email: 'test@example.com' },
    });
    expect(mockUserRepository.save).toHaveBeenCalled();
    expect(result).toBeDefined();
  });
});
