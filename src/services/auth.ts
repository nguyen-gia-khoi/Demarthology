import { ApiService } from '../utils/api';
import { 
  ApiResponse, 
  LoginCredentials, 
  AuthTokenResponse, 
  LoginResponse,
  RegisterResponse,
  AuthUser,
  UserInfo,
  PaginatedResponse 
} from '../types/api';
import { AuthUtils } from '../utils/auth';

/**
 * Authentication service - example implementation using ApiService
 */
export class AuthService {
  private static instance: AuthService;
  private apiService: ApiService;

  private constructor() {
    this.apiService = ApiService.getInstance();
  }

  static getInstance(): AuthService {
    if (!AuthService.instance) {
      AuthService.instance = new AuthService();
    }
    return AuthService.instance;
  }

  /**
   * Login user with credentials
   * Stores the returned token in localStorage with the same key that axios instance reads from
   */
  async login(credentials: LoginCredentials): Promise<LoginResponse> {
    const response = await this.apiService.post<LoginResponse>(
      '/auth/login',
      credentials,
      { skipAuth: true } // Skip auth for login request
    );

    // Store tokens after successful login
    // This uses the same key ('auth_token') that axios interceptor reads from
    if (response.accessToken) {
      AuthUtils.setAuthToken(response.accessToken);
      
      // Verify token was stored correctly and is immediately available for axios
      if (!AuthUtils.verifyTokenStorage(response.accessToken)) {
        throw new Error('Failed to store authentication token in localStorage');
      }
      
      // Note: New API doesn't provide refresh token in login response
      // This might need to be handled differently or stored separately
    }

    return response;
  }

  /**
   * Register new user
   */
  async register(userData: {
    email: string;
    password: string;
    firstName: string;
    lastName: string;
    dob: string;
  }): Promise<RegisterResponse> {
    const response = await this.apiService.post<RegisterResponse>(
      '/auth/register',
      userData,
      { skipAuth: true }
    );
    
    // Store tokens after successful registration
    if (response.accessToken) {
      AuthUtils.setAuthToken(response.accessToken);
    }
    
    return response;
  }

  /**
   * Logout user
   */
  async logout(): Promise<void> {
    try {
      await this.apiService.post('/auth/logout');
    } catch (error) {
      // Continue with local logout even if API call fails
      console.warn('Logout API call failed:', error);
    } finally {
      AuthUtils.clearTokens();
    }
  }

  /**
   * Convert UserInfo to AuthUser for backward compatibility
   */
  private convertUserInfoToAuthUser(userInfo: UserInfo): AuthUser {
    return {
      id: 'user-' + Date.now(), // Generate ID since new API doesn't provide it
      email: userInfo.email,
      name: `${userInfo.firstName} ${userInfo.lastName}`,
      role: userInfo.role || 'user',
      permissions: ['read', 'write'], // Default permissions
      avatarUrl: '/avatar.webp' // Default avatar
    };
  }

  /**
   * Get current user profile
   */
  async getCurrentUser(): Promise<AuthUser> {
    const response = await this.apiService.get<ApiResponse<UserInfo>>('/auth/me');
    return this.convertUserInfoToAuthUser(response.data);
  }

  /**
   * Refresh authentication token
   */
  async refreshToken(): Promise<AuthTokenResponse> {
    const refreshToken = AuthUtils.getRefreshToken();
    
    if (!refreshToken) {
      throw new Error('No refresh token available');
    }

    const response = await this.apiService.post<ApiResponse<AuthTokenResponse>>(
      '/auth/refresh',
      { refreshToken },
      { skipAuth: true }
    );

    // Update stored tokens
    if (response.data.accessToken) {
      AuthUtils.setAuthToken(response.data.accessToken);
      AuthUtils.setRefreshToken(response.data.refreshToken);
    }

    return response.data;
  }

  /**
   * Update user profile
   */
  async updateProfile(profileData: Partial<AuthUser>): Promise<AuthUser> {
    const response = await this.apiService.put<ApiResponse<AuthUser>>(
      '/auth/profile',
      profileData
    );
    return response.data;
  }

  /**
   * Change user password
   */
  async changePassword(passwords: {
    currentPassword: string;
    newPassword: string;
  }): Promise<void> {
    await this.apiService.put('/auth/change-password', passwords);
  }
}

/**
 * User management service - example implementation
 */
export class UserService {
  private static instance: UserService;
  private apiService: ApiService;

  private constructor() {
    this.apiService = ApiService.getInstance();
  }

  static getInstance(): UserService {
    if (!UserService.instance) {
      UserService.instance = new UserService();
    }
    return UserService.instance;
  }

  /**
   * Get all users with pagination
   */
  async getUsers(params?: {
    page?: number;
    limit?: number;
    search?: string;
    role?: string;
  }): Promise<PaginatedResponse<AuthUser>> {
    return this.apiService.getPaginated<AuthUser>('/users', params);
  }

  /**
   * Get user by ID
   */
  async getUserById(id: string): Promise<AuthUser> {
    const response = await this.apiService.get<ApiResponse<AuthUser>>(`/users/${id}`);
    return response.data;
  }

  /**
   * Create new user
   */
  async createUser(userData: Omit<AuthUser, 'id'>): Promise<AuthUser> {
    const response = await this.apiService.post<ApiResponse<AuthUser>>('/users', userData);
    return response.data;
  }

  /**
   * Update user
   */
  async updateUser(id: string, userData: Partial<AuthUser>): Promise<AuthUser> {
    const response = await this.apiService.put<ApiResponse<AuthUser>>(`/users/${id}`, userData);
    return response.data;
  }

  /**
   * Delete user
   */
  async deleteUser(id: string): Promise<void> {
    await this.apiService.delete(`/users/${id}`);
  }

  /**
   * Upload user avatar
   */
  async uploadAvatar(userId: string, avatarFile: File): Promise<{ avatarUrl: string }> {
    const response = await this.apiService.uploadFile<ApiResponse<{ avatarUrl: string }>>(
      `/users/${userId}/avatar`,
      avatarFile,
      'avatar'
    );
    return response.data;
  }
}

// Export instances for easy access
export const authService = AuthService.getInstance();
export const userService = UserService.getInstance();