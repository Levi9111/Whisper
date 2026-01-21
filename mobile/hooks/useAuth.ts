import { useApi } from '@/lib/axion';
import { useMutation } from '@tanstack/react-query';

export const useAuthCallback = () => {
  const api = useApi();

  const result = useMutation({
    mutationFn: async () => {
      const { data } = await api.post('/auth/callback');

      return data;
    },
  });

  return result;
};
