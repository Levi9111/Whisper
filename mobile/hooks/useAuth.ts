import { useMutation } from '@tanstack/react-query';

import { useApi } from '@/lib/axios';
import { User } from '@/types';

export const useAuthCallback = () => {
  const { apiWithAuth: api } = useApi();

  const result = useMutation({
    mutationFn: async () => {
      const { data } = await api<User>({
        method: 'POST',
        url: '/auth/callback',
      });

      return data;
    },
  });

  return result;
};
