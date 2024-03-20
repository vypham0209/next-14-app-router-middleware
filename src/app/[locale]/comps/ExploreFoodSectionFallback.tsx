//LAYOUT, COMPONENTS
import Button from '_@shared/components/button/Button';

const ExploreFoodSectionFallback = () => {
  return (
    <section id="explore-food" className="full-fledge">
      <div className="max-content grid justify-center justify-items-center gap-10 bg-yel-1000 py-14 md:py-16">
        <div className="grid max-w-[theme(spacing.200)] gap-4 md:gap-6">
          <h2 className="text-center text-36 text-white md:text-48">Lorem ipsum</h2>
          <p className="text-center text-14ita text-white md:text-20lig">
            Ornare lectus id sed ullamcorper tristique tempus. Dignissim pulvinar egestas platea mi
            consectetur aliquam et turpis donec. Quam tristique vitae iaculis fringilla.
          </p>
        </div>

        <Button as="link" color="secondary" href="/exploring-food" className="btn-big sm:w-87">
          EXPLORE OUR FOOD
        </Button>
      </div>
    </section>
  );
};

export default ExploreFoodSectionFallback;
