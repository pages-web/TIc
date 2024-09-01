'use client';
import {
  LockIcon,
  MailIcon,
  Smartphone,
  User2Icon,
  type LucideIcon,
} from 'lucide-react';
import { TabsList, TabsTrigger } from '../ui/tabs';
import { useAtomValue } from 'jotai';
import { currentUserAtom } from '@/store/auth.store';
import { useUserDetail } from '@/sdk/queries/auth.client';

const ProfileTabTrigger = ({
  value,
  children,
  Icon,
  description,
}: React.PropsWithChildren & {
  value: string;
  description: string;
  Icon: LucideIcon;
}) => {
  return (
    <TabsTrigger
      value={value}
      className="flex-1 h-16 py-3 px-4 justify-start items-start gap-3 border text-foreground data-[state=active]:text-secondary-foreground data-[state=active]:bg-secondary data-[state=active]:border-transparent transition-colors min-w-44"
    >
      <Icon className="h-6 w-6 mt-1" strokeWidth={1.5} />
      <div className="text-left">
        {children}
        <div className="text-xs opacity-70 mt-0.5">{description}</div>
      </div>
    </TabsTrigger>
  );
};

const ProfileTabsList = () => {
  const { firstName, isEmailVerified, isPhoneVerified } =
    useAtomValue(currentUserAtom) || {};
  const { loading } = useUserDetail();

  return (
    <TabsList className="flex w-full h-16 p-0 gap-3 bg-background justify-start lg:justify-center overflow-auto mb-6 lg:mb-4 rounded-none">
      <ProfileTabTrigger
        value="info"
        Icon={User2Icon}
        description={firstName || '-'}
      >
        Хувийн мэдээлэл
      </ProfileTabTrigger>
      <ProfileTabTrigger
        value="phone"
        Icon={Smartphone}
        description={!loading && isPhoneVerified ? 'Баталгаажсан' : '-'}
      >
        Гар утас
      </ProfileTabTrigger>
      <ProfileTabTrigger
        value="email"
        Icon={MailIcon}
        description={!loading && isEmailVerified ? 'Баталгаажсан' : '-'}
      >
        Цахим хаяг
      </ProfileTabTrigger>
      <ProfileTabTrigger
        value="password"
        Icon={LockIcon}
        description="Шинэчлэх"
      >
        Нууц үг
      </ProfileTabTrigger>
    </TabsList>
  );
};

export default ProfileTabsList;
