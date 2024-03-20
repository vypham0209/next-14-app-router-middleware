'use client';
//THIRD PARTY MODULES
import classcat from 'classcat';
import Link from 'next-intl/link';
import { usePathname } from 'next-intl/client';
//LAYOUT, COMPONENTS
import Show from '_@shared/components/conditions/Show';
//HOOK, SERVER

function PrivacyTab() {
  const pathname = usePathname();
  const active = pathname?.split('/')?.[1];

  return (
    <div className="relative">
      <span className="absolute bottom-0 left-1/2 h-px w-screen -translate-x-1/2 bg-blu-100 lg:w-full"></span>
      <div
        className={classcat([
          'space-i-6 isolate flex justify-start overflow-x-scroll whitespace-nowrap scrollbar-hide md:space-i-10',
        ])}
      >
        {PRIVACY_POLICY_MOCK_DATA.map((item) => (
          <Link key={item.key} href={item.key}>
            <p
              className={classcat([
                active === item.key ? 'relative text-yel-500' : '',
                'cursor-pointer snap-start pb-1 text-16 text-blu-400 md:text-24',
              ])}
            >
              <Show when={active === item.key}>
                <span
                  className={classcat(['absolute inset-x-0 bottom-0 isolate h-0.5 bg-yel-500'])}
                />
              </Show>
              {item.title}
            </p>
          </Link>
        ))}
      </div>
    </div>
  );
}

export default PrivacyTab;

const PRIVACY_POLICY_MOCK_DATA = [
  {
    key: 'privacy-policy',
    title: 'Privacy Policy',
  },
  {
    key: 'terms-of-service',
    title: 'Terms of Service',
  },
  {
    key: 'data-processing-agreement',
    title: 'Data Processing Agreement',
  },
];
