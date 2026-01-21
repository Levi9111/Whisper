import { useAuthCallback } from '@/hooks/useAuth';
import { useAuth, useUser } from '@clerk/clerk-expo';
import { useEffect, useRef } from 'react';

const AuthSync = () => {
  const { isSignedIn } = useAuth();
  const { user } = useUser();
  const { mutate: syncUser } = useAuthCallback();
  const hasSynced = useRef(false);

  useEffect(() => {
    if (isSignedIn && user && !hasSynced.current) {
      hasSynced.current = true;
      syncUser(undefined, {
        onSuccess: (data) => {
          console.log(`User Synced with backend: ${data.name}`);
        },

        onError: (data) => {
          console.log(`User sync falied for the user: ${data.name}`);
        },
      });
    }

    if (!isSignedIn) hasSynced.current = false;
  }, [isSignedIn, user, syncUser]);

  return null;
};

export default AuthSync;
