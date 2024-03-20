'use client';

//THIRD PARTY MODULES
import Image from 'next/image';
import classcat from 'classcat';
import Link from 'next-intl/link';
import { useFooterContext } from '_@landing/app/[locale]/FooterProvider';
//LAYOUT, COMPONENTS
import Button from '_@shared/components/button/Button';
import SocialIconList from '_@landing/components/card/SocialIconList';
//SHARED
import LogoIcon from '_@shared/icons/LogoIcon';

const Footer = () => {
  const { showFooter } = useFooterContext();

  return (
    <footer className={classcat(['full-fledge', showFooter ? 'block' : 'hidden'])}>
      <div
        className={classcat([
          'max-content bg-yel-50 py-16 shadow-[inset_0_1px] shadow-blu-500',
          'md:py-20',
          'grid justify-center justify-items-center',
          's-992:auto-cols-max s-992:grid-flow-col s-992:justify-between s-992:justify-items-start',
          'gap-10 md:gap-16 s-992:gap-0',
        ])}
      >
        <Link href="/">
          <LogoIcon />
        </Link>
        <div className="grid gap-10 md:auto-cols-max md:grid-flow-col md:items-start md:gap-16">
          <div className={classcat([listClasses])}>
            {LINK_LIST.map(({ href, text }) => (
              <Button
                key={text}
                as="link"
                href={href}
                color="navy"
                variant="ghost"
                className={classcat([
                  'md:btn-big md:ow:text-blu-400',
                  'ow:hover:border-none ow:hover:text-blu-500 ow:hover:shadow-none',
                  'hover-hover:text-yel-500 hover-hover:shadow-[inset_0_-1px] hover-hover:shadow-yel-500',
                ])}
              >
                {text}
              </Button>
            ))}
          </div>
          <div className="grid gap-10 xl:auto-cols-max xl:grid-flow-col xl:items-start xl:gap-16">
            <div className={classcat([listClasses])}>
              <p className="text-12 text-blu-400 md:text-14">FOLLOW US</p>
              <SocialIconList className="ow:gap-3" iconClasses="h-8 w-8" />
            </div>
            <div className={classcat([listClasses])}>
              <p className="text-12 text-blu-400 md:text-14">DOWNLOAD THE APP</p>
              <div className="grid auto-cols-max grid-flow-col gap-4">
                {BUTTON_LIST.map(({ label, href, src }) => (
                  <Link key={label} href={href} className="relative inline-block h-10 w-34.25">
                    <span className="sr-only">{label}</span>
                    <Image
                      fill
                      src={src}
                      alt={label}
                      unoptimized
                      quality={100}
                      className="object-cover"
                    />
                  </Link>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;

const BUTTON_LIST = [
  {
    label: 'Google Play',
    src: '/img/footer/google-play.webp',
    href: '/coming-soon',
  },
  {
    label: 'App Store',
    src: '/img/footer/app-store.webp',
    href: '/coming-soon',
  },
];

const LINK_LIST = [
  {
    href: '/coming-soon',
    text: 'TELL US WHAT YOU THINK',
  },
  {
    href: '/coming-soon',
    text: 'FAQ',
  },
  {
    href: '/terms-of-service',
    text: 'TERMS OF SERVICE',
  },
  {
    href: '/privacy-policy',
    text: 'PRIVACY POLICY',
  },
  {
    href: '/data-processing-agreement',
    text: 'DATA PROCESSING AGREEMENT',
  },
];

const listClasses = [
  'grid justify-center justify-items-center gap-4 md:justify-start md:justify-items-start md:gap-6',
];
