import { useQuery } from '@apollo/client';
import { queries } from '@/sdk/graphql/auth';
import { useSetAtom, useAtom, useAtomValue } from 'jotai';
import {
  currentUserAtom,
  loadingUserAtom,
  refetchCurrentUserAtom,
} from '@/store/auth.store';
import { useEffect } from 'react';
import { toast } from 'sonner';

export const useCurrentUser = (onCompleted?: (data: any) => void) => {
  const setCurrentUser = useSetAtom(currentUserAtom);
  const [loading, setLoading] = useAtom(loadingUserAtom);
  const [refetchUser, setRefetchUser] = useAtom(refetchCurrentUserAtom);

  const { data, refetch } = useQuery(queries.currentUser, {
    onError(error) {
      if (error.message === 'token expired') {
        sessionStorage.removeItem('token');
      }
      if (error.message !== 'User is not logged in') {
        toast.error(error.message);
      }
      setLoading(false);
    },
  });

  useEffect(() => {
    if (data) {
      const { clientPortalCurrentUser } = data;
      setCurrentUser(clientPortalCurrentUser);
      setLoading(false);
      onCompleted && onCompleted(clientPortalCurrentUser);
    }
  }, [data]);

  useEffect(() => {
    if (refetchUser) {
      refetch();
      setRefetchUser(false);
    }
  }, [refetchUser]);

  const { clientPortalCurrentUser: currentUser } = data || {};

  return { currentUser, loading, setLoading };
};

export const useUserDetail = () => {
  const refetchUser = useAtomValue(refetchCurrentUserAtom);
  const [currentUser, setCurrentUser] = useAtom(currentUserAtom);

  const { loading, refetch } = useQuery(queries.userDetail, {
    onCompleted({ clientPortalCurrentUser }) {
      setCurrentUser({ ...currentUser, ...clientPortalCurrentUser });
    },
  });

  useEffect(() => {
    if (refetchUser) {
      refetch();
    }
  }, [refetchUser]);

  return { loading };
};
