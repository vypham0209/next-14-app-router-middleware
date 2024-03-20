//LAYOUT, COMPONENTS
import { rethinkAnchor } from '_@landing/layout/header/constants';
//RELATIVE MODULES
import SlideComponentFallback from './SlideComponentFallback';

const SlideSectionFallback = () => {
  return (
    <section
      id={rethinkAnchor}
      className="relative mt-[calc(var(--h-header)*-1)] h-162 pt-[--h-header] full-fledge s-992:h-151.25"
    >
      <SlideComponentFallback />
    </section>
  );
};

export default SlideSectionFallback;
