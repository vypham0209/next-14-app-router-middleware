//THIRD PARTY MODULES
import classcat from 'classcat';
import Link from 'next-intl/link';
//SHARED
import TwitterIcon from '_@shared/icons/TwitterIcon';
import YoutubeIcon from '_@shared/icons/YoutubeIcon';
import FacebookIcon from '_@shared/icons/FacebookIcon';
import LinkedinIcon from '_@shared/icons/LinkedinIcon';
import InstagramIcon from '_@shared/icons/InstagramIcon';

const LIST = [
  {
    href: '/coming-soon',
    icon: FacebookIcon,
  },
  {
    href: '/coming-soon',
    icon: TwitterIcon,
  },
  {
    href: '/coming-soon',
    icon: InstagramIcon,
  },
  {
    href: '/coming-soon',
    icon: YoutubeIcon,
  },
  {
    href: '/coming-soon',
    icon: LinkedinIcon,
  },
];

type Props = {
  className?: string;
  iconClasses?: string;
};

const SocialIconList = ({ className, iconClasses }: Props) => {
  return (
    <div className={classcat(['grid auto-cols-max grid-flow-col gap-4', className])}>
      {LIST.map(({ href, icon: Icon }, index) => (
        <Link key={index} href={href}>
          <Icon className={classcat(['transition-colors hover:text-yel-500', iconClasses])} />
        </Link>
      ))}
    </div>
  );
};

export default SocialIconList;
