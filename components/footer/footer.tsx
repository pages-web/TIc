import { Button } from '../ui/button';
import { getBranchDetail } from '@/sdk/queries/auth';
import Link, { type LinkProps } from 'next/link';
import { cn } from '@/lib/utils';
import { MailIcon, MapPinIcon, PhoneCallIcon } from 'lucide-react';
import ErxesLogo from './erxes-logo';
import { icons } from './icons';
import pk from '@/package.json';

const Footer = async () => {
  const { branchDetail, name } = await getBranchDetail();
  const { email, phoneNumber, links, address, coordinate } = branchDetail || {};

  return (
    <footer>
      {!!branchDetail && (
        <div className="bg-neutral-100">
          <div className="container py-6 grid lg:grid-cols-4">
            <Col title="Бидний тухай">
              <FooterLink href="/about">Бидний тухай</FooterLink>
            </Col>
            <Col title="Туслах цэс">
              <FooterLink href="/terms-of-service">
                Үйлчилгээний нөхцөл
              </FooterLink>
              <FooterLink href="/privacy-policy">Нууцлалын бодлого</FooterLink>
            </Col>
            <Col title="Холбоо барих">
              {!!email && (
                <FooterLink href={'mailto: ' + email}>
                  <MailIcon className="h-5 w-5 mr-2" />
                  {email}
                </FooterLink>
              )}
              {!!phoneNumber && (
                <FooterLink href={'tel: ' + phoneNumber}>
                  <PhoneCallIcon className="h-5 w-5 mr-2" />
                  {(phoneNumber || '').toString()}
                </FooterLink>
              )}
              <Col title="Биднийг дагаарай">
                <div className="flex items-center pb-2 gap-1 -ml-2">
                  {Object.keys(links || {}).map((link) =>
                    !!links[link] ? (
                      <SocialLink
                        href={(links || {})[link] || ''}
                        icon={link}
                        key={link}
                      >
                        {link}
                      </SocialLink>
                    ) : null
                  )}
                </div>
              </Col>
            </Col>
            <Col title="Хаяг">
              <FooterLink
                href={`https://www.google.com/maps/@${coordinate?.longitude},${coordinate?.latitude}`}
                target="_blank"
                className={cn(
                  'items-start -mt-1 h-auto whitespace-normal',
                  (address || '').length < 20 && 'items-center'
                )}
              >
                <MapPinIcon className="flex-none h-5 w-5 mt-1" />
                <span className="ml-2 text-wrap">{address || ''}</span>
              </FooterLink>
            </Col>
          </div>
        </div>
      )}
      <div className="bg-primary text-neutral-300 py-4 text-sm pb-32 lg:py-4">
        <div className="container flex items-center justify-between">
          <div>
            © {new Date().getFullYear()} <span>{name}</span>{' '}
            <span>v{pk.version}</span>
          </div>
          <div className="inline-flex items-center group">
            <Button
              className="px-1 text-primary-foreground hover:no-underline font-normal h-7"
              variant="link"
              asChild
            >
              <Link href="https://erxes.mn/">
                Powered by
                <ErxesLogo className="ml-1 h-7 w-14 fill-primary-foreground" />
              </Link>
            </Button>
          </div>
        </div>
      </div>
    </footer>
  );
};

const Col = ({
  title,
  children,
}: React.PropsWithChildren & { title: string }) => {
  return (
    <div className="">
      <h3 className="font-semibold pt-4 pb-2 capitalize">{title}</h3>
      {children}
    </div>
  );
};

const FooterLink = (
  props: React.PropsWithChildren &
    LinkProps & { className?: string; target?: string }
) => (
  <Button
    asChild
    className={cn(
      'px-0 h-8 flex justify-start text-neutral-600 hover:text-primary',
      props.className
    )}
    variant="link"
  >
    <Link {...props} />
  </Button>
);

const SocialLink = (
  props: React.PropsWithChildren &
    LinkProps & { className?: string; icon: string }
) => (
  <Button
    asChild
    className={cn('text-xl shadow-none', props.className)}
    size="icon"
    variant="ghost"
  >
    <Link {...props}>{icons[props.icon as keyof typeof icons]}</Link>
  </Button>
);

export default Footer;
