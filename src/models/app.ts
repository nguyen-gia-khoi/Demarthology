export interface AppStats {
  components: number;
  routes: number;
  services: number;
  models: number;
}

export interface AppInfo {
  name: string;
  version: string;
  description: string;
  stats: AppStats;
}
