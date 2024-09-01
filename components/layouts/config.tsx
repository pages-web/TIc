'use client';
import { configAtom } from '@/store/auth.store';
import { IConfig } from '@/types/auth.types';
import { useSetAtom } from 'jotai';
import { useLayoutEffect } from 'react';

const ConfigProvider = ({
  children,
  config,
}: React.PropsWithChildren & { config: IConfig }) => {
  const setConfig = useSetAtom(configAtom);
  const { deliveryConfig, erxesAppToken, paymentIds, name, isCheckRemainder } =
    config || {};

  useLayoutEffect(() => {
    setConfig({
      deliveryConfig,
      erxesAppToken,
      paymentIds,
      name,
      isCheckRemainder,
    });
  }, []);

  return <>{children}</>;
};

export default ConfigProvider;
