import { User, UserModel } from '../models/user';

export class UserService {
  private userModel: UserModel;

  constructor() {
    this.userModel = new UserModel();
  }

  async fetchUsers(): Promise<User[]> {
    return new Promise((resolve) => {
      setTimeout(() => {
        resolve(this.userModel.getAllUsers());
      }, 100);
    });
  }

  async createUser(userData: Omit<User, 'id'>): Promise<User> {
    const newUser: User = {
      ...userData,
      id: this.generateId()
    };
    
    this.userModel.addUser(newUser);
    return newUser;
  }

  async updateUser(id: string, userData: Partial<User>): Promise<boolean> {
    return this.userModel.updateUser(id, userData);
  }

  async deleteUser(id: string): Promise<boolean> {
    return this.userModel.deleteUser(id);
  }

  private generateId(): string {
    return Math.random().toString(36).substr(2, 9);
  }
}
