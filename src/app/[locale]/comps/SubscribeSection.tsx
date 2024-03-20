//THIRD PARTY MODULES
import classcat from 'classcat';
//LAYOUT, COMPONENTS
import Button from '_@shared/components/button/Button';
import { startYourJourneyAnchor } from '_@landing/layout/header/constants';

const IMAGE_LIST = [
  {
    position: 'top-left',
    className: [
      'absolute left-0 top-0 aspect-[83/154] w-20.75 bg-subscribe-top-left bg-cover',
      'md:top-4 md:aspect-[180/299] md:w-45 md:bg-subscribe-top-left-desktop',
    ],
  },
  {
    position: 'bottom-right',
    className: [
      'absolute bottom-0 right-0 aspect-[127/122] w-31.75 bg-subscribe-bottom-right bg-cover',
      'md:aspect-[313/331] md:w-78.25 md:bg-subscribe-bottom-right-desktop',
    ],
  },
];

const SubscribeSection = async () => {
  return (
    <section
      id={startYourJourneyAnchor}
      className="mt-[calc(var(--h-header)*-1)] pt-[--h-header] full-fledge"
    >
      <div className="max-content relative grid gap-10 bg-yel-25 py-32 md:py-36">
        {IMAGE_LIST.map(({ position, className }) => (
          <div key={position} className={classcat(className)} />
        ))}
        <div
          className={classcat([
            'relative z-[1]',
            'text-center text-blu-400',
            'mx-auto grid max-w-[theme(spacing.70)] gap-4',
            'md:max-w-[theme(spacing.200)] md:gap-6',
          ])}
        >
          <h2 className="text-36 md:text-48">Subscribe for the latest updates</h2>
          <p className="text-14lig md:text-20">
            A tour of West African gourmet gastronomy is coming soon. Please join us and follow our
            social media to get the latest news & updates
          </p>
        </div>
        <Button
          as="link"
          color="navy"
          target="_blank"
          rel="noopener noreferrer"
          href="https://woobleu.typeform.com/subscribe"
          className="btn-big relative z-[1] mx-auto sm:w-87"
        >
          WELCOME/AKWABA
        </Button>
      </div>
    </section>
  );
};

export default SubscribeSection;
