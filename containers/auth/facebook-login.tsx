'use client';
import { Button } from '@/components/ui/button';
import Script from 'next/script';
import { useEffect, useState } from 'react';
import {
  fbLogin,
  getFacebookLoginStatus,
  initFacebookSdk,
} from '@/lib/facebook';
import { FacebookIcon } from 'lucide-react';
import { useFacebookLogin } from '@/sdk/hooks/auth';
import { LoadingIcon } from '@/components/ui/loading';

const FacebookLogin = () => {
  const [loading, setLoading] = useState(true);
  const {
    facebookLogin,
    loading: loadingAction,
    clientPortalId,
  } = useFacebookLogin();

  const handleLogin = (response: { authResponse: { accessToken: string } }) => {
    response?.authResponse?.accessToken &&
      facebookLogin({
        variables: {
          clientPortalId,
          accessToken: response?.authResponse?.accessToken,
        },
      });
  };

  useEffect(() => {
    initFacebookSdk().then(() => {
      getFacebookLoginStatus().then(
        (response) => response && handleLogin(response)
      );
    });
  }, []);

  function login() {
    fbLogin().then((response) => handleLogin(response));
  }

  return (
    <>
      <Script
        src="https://connect.facebook.net/en_US/sdk.js"
        crossOrigin="anonymous"
        async
        strategy="lazyOnload"
        defer
        onReady={() => setLoading(false)}
      />
      <Button
        size="lg"
        className="w-full text-primary"
        variant="outline"
        disabled={loading || loadingAction}
        onClick={login}
      >
        {loadingAction ? (
          <LoadingIcon />
        ) : (
          <FacebookIcon
            className="h-5 w-5 mr-1 fill-primary"
            strokeWidth={0.1}
          />
        )}
        Facebook-ээр нэвтрэх
      </Button>
    </>
  );
};

export default FacebookLogin;
