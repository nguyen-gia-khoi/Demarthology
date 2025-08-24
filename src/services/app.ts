import { AppInfo, AppStats } from '../models/app';

export class AppService {
  private static instance: AppService;
  
  private constructor() {}
  
  static getInstance(): AppService {
    if (!AppService.instance) {
      AppService.instance = new AppService();
    }
    return AppService.instance;
  }

  async getAppInfo(): Promise<AppInfo> {
    // Simulate API call
    return new Promise((resolve) => {
      setTimeout(() => {
        resolve({
          name: 'MVC Demo App',
          version: '1.0.0',
          description: 'A simple React TypeScript application demonstrating MVC architecture',
          stats: {
            components: 5,
            routes: 2,
            services: 1,
            models: 1
          }
        });
      }, 500);
    });
  }

  async getStats(): Promise<AppStats> {
    const appInfo = await this.getAppInfo();
    return appInfo.stats;
  }
}
