import type { AuthClaims, IAuthRepository } from "../../../../application/interfaces/IAuthRepository";

const mockUser: AuthClaims = {
    sam: 'ET',
    name: 'Dev User',
    lastName: 'dev@example.com',
    email: 'devuser',
};

export class AuthRepositoryMock implements IAuthRepository {
  async getClaims(): Promise<AuthClaims | undefined> {
    return mockUser;
  }
  login(): void {
  }
  logout(): void {
    window.location.assign('/');
  }
}
