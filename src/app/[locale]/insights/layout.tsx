//THIRD PARTY MODULES
import { PropsWithChildren } from 'react';
//RELATIVE MODULES
import SubscribeSection from '../comps/SubscribeSection';

export default function Layout({ children }: PropsWithChildren) {
  return (
    <main className="full-fledge">
      <div className="grid gap-6 pb-20 pt-6 lg:gap-14 lg:pb-36 lg:pt-10">{children}</div>
      <SubscribeSection />
    </main>
  );
}
