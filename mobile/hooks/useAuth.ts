import { useMutation } from '@tanstack/react-query';

import { useApi } from '@/lib/axios';

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
