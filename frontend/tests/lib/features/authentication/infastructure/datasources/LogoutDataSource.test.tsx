import LogoutDataSource from '../../../../../../lib/features/authentication/infrastructure/datasources/LogoutDataSource';

describe('Logout Data Source', () => {
  it('removes email, jwt and refresh token from storage service', async () => {
    const mockStorage = {
      get: jest.fn(),
      set: jest.fn(),
      remove: jest.fn(),
    };

    const logoutDataSource = new LogoutDataSource(mockStorage);
    await logoutDataSource.logout();

    expect(mockStorage.remove).toHaveBeenCalledTimes(3);
    expect(mockStorage.remove).toHaveBeenCalledWith('EMAIL');
    expect(mockStorage.remove).toHaveBeenCalledWith('JWTTOKEN');
    expect(mockStorage.remove).toHaveBeenCalledWith('REFRESHTOKEN');
  });
});
