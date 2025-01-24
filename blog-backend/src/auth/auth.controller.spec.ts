import { Test, TestingModule } from '@nestjs/testing';
import { AuthController } from './auth.controller';
import { AuthService } from './auth.service';

describe('AuthController', () => {
  let controller: AuthController;
  let authService: AuthService;

  const mockAuthService = {
    validateOAuthLogin: jest.fn(),
  };

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [AuthController],
      providers: [{ provide: AuthService, useValue: mockAuthService }],
    }).compile();

    controller = module.get<AuthController>(AuthController);
    authService = module.get<AuthService>(AuthService);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });

  it('should return a token on successful Google login', async () => {
    mockAuthService.validateOAuthLogin.mockResolvedValue('test-token');
    const req = { user: { email: 'test@example.com' } };
    const res = { redirect: jest.fn() };

    await controller.googleCallback(req, res);

    expect(res.redirect).toHaveBeenCalledWith(
      'http://localhost:3000/dashboard?token=test-token',
    );
  });
});
