//LAYOUT, COMPONENTS
import Button from '_@shared/components/button/Button';
//SHARED
import IllusIcon from '_@shared/icons/IllusIcon';

export default function NotFound() {
  return (
    <section className="grid w-full justify-center gap-6 py-20 md:gap-10">
      <IllusIcon className="mx-auto" />

      <div className="grid justify-items-center gap-4 ">
        <p className="text-16lig text-blu-400 md:text-20lig">
          Sorry... We don't have what you're looking for, for now.
        </p>

        <Button
          as="link"
          href="/exploring-food"
          variant="ghost"
          className="btn-medium md:btn-very-big"
        >
          How about trying our other dishes and drinks?
        </Button>
      </div>
    </section>
  );
}
