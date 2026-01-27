import * as Sentry from '@sentry/react-native';
import axios from 'axios';

import { useCallback, useEffect } from 'react';

import { useAuth } from '@clerk/clerk-expo';

const API_URL = 'https://whisper-jkwk.onrender.com/api';

const api = axios.create({
  baseURL: API_URL,
  headers: {
    'Content-Type': 'application/json',
  },
});

// Response interceptor registered once
api.interceptors.response.use(
  (response) => response,
  (error) => {
    if (error.response) {
      Sentry.logger.error(
        Sentry.logger.fmt`
        API request failed: ${error.config?.method?.toUpperCase()} ${error.config?.url}
        `,

        {
          status: error.response.status,
          endpoint: error.config?.url,
          method: error.config?.method,
        },
      );
    } else if (error.request) {
      Sentry.logger.warn(`API request failed - no response`, {
        endpoint: error.config?.url,
        method: error.config?.method,
      });
    }
  },
);

export const useApi = () => {
  const { getToken } = useAuth();

  const apiWithAuth = useCallback(
    async <T>(config: Parameters<typeof api.request>[0]) => {
      const token = await getToken();

      return api.request<T>({
        ...config,
        headers: {
          ...config.headers,
          ...(token && {
            Authorization: `Bearer ${token}`,
          }),
        },
      });
    },
    [getToken],
  );

  return {
    api,
    apiWithAuth,
  };
};
