//THIRD PARTY MODULES
import classcat from 'classcat';
//LAYOUT, COMPONENTS
import PrivacyTab from './components/PrivacyTab';
//RELATIVE MODULES
import './style.css';
import ContactUs from '../comps/ContactUs';

export default function InsightLayout({ children }: { children: React.ReactNode }) {
  return (
    <>
      <section className="bg-yel-25 full-fledge">
        <div className={classcat(['pb-20 pt-6 md:pb-36 md:pt-10', 'pi-6 md:max-content'])}>
          <div className={classcat(['m-auto max-w-[1024px] bg-yel-25', 'md:pi-0'])}>
            <PrivacyTab />
            {children}
          </div>
        </div>
      </section>
      <ContactUs />
    </>
  );
}
