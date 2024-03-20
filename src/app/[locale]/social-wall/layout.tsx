//THIRD PARTY MODULES
import { PropsWithChildren } from 'react';
import { ErrorBoundary } from 'react-error-boundary';
//LAYOUT, COMPONENTS
import WrapBreadcrumb from '_@landing/components/breadcrumb/WrapBreadcrumb';
//RELATIVE MODULES
import SocialPageHeader from './comps/SocialPageHeader';
import SocialPageHeaderFallback from './comps/SocialPageHeaderFallback';

export default function Layout({ children }: PropsWithChildren) {
  return (
    <main className="grid gap-6 pb-20 pt-6 full-fledge lg:gap-14 lg:pb-36 lg:pt-10">
      <WrapBreadcrumb />
      <div className="max-content grid gap-10 lg:gap-14">
        <ErrorBoundary fallback={<SocialPageHeaderFallback />}>
          <SocialPageHeader />
        </ErrorBoundary>
        {children}
      </div>
    </main>
  );
}
