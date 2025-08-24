import React, { useState, useEffect } from 'react';
import { AppService } from '../services/app';
import { AppInfo, AppStats } from '../models/app';

export const useAppController = () => {
  const [appInfo, setAppInfo] = useState<AppInfo | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const appService = AppService.getInstance();

  useEffect(() => {
    loadAppInfo();
  }, []);

  const loadAppInfo = async () => {
    try {
      setLoading(true);
      setError(null);
      const info = await appService.getAppInfo();
      setAppInfo(info);
    } catch (err) {
      setError('Failed to load app information');
    } finally {
      setLoading(false);
    }
  };

  const refreshStats = async () => {
    try {
      setError(null);
      const stats = await appService.getStats();
      if (appInfo) {
        setAppInfo({ ...appInfo, stats });
      }
    } catch (err) {
      setError('Failed to refresh stats');
    }
  };

  return {
    appInfo,
    loading,
    error,
    refreshStats,
    loadAppInfo
  };
};
