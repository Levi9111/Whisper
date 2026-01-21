import axios from 'axios';
import { useAuth } from '@clerk/clerk-expo';
import { useEffect } from 'react';

const API_URL = 'https://whisper-jkwk.onrender.com/api';

const api = axios.create({
  baseURL: API_URL,
  headers: {
    'Content-Type': 'application/json',
  },
});

export const useApi = () => {
  const { getToken } = useAuth();

  useEffect(() => {
    const requestIntercepter = api.interceptors.request.use(async (config) => {
      const token = await getToken();

      if (token) {
        config.headers.Authorization = `Bearer ${token}`;
      }

      return config;
    });

    const responseIntercepter = api.interceptors.response.use(
      (response) => response,
      (error) => {
        // log api error to sentry
      },
    );

    // CleanUp
    return () => {
      api.interceptors.request.eject(requestIntercepter);
    };
  }, [getToken]);

  return api;
};
