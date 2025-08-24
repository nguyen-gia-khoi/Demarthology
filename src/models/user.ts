export interface User {
  id: string;
  name: string;
  email: string;
}

export class UserModel {
  private users: User[] = [];

  getAllUsers(): User[] {
    return this.users;
  }

  getUserById(id: string): User | undefined {
    return this.users.find(user => user.id === id);
  }

  addUser(user: User): void {
    this.users.push(user);
  }

  updateUser(id: string, updatedUser: Partial<User>): boolean {
    const index = this.users.findIndex(user => user.id === id);
    if (index !== -1) {
      this.users[index] = { ...this.users[index], ...updatedUser };
      return true;
    }
    return false;
  }

  deleteUser(id: string): boolean {
    const index = this.users.findIndex(user => user.id === id);
    if (index !== -1) {
      this.users.splice(index, 1);
      return true;
    }
    return false;
  }
}
