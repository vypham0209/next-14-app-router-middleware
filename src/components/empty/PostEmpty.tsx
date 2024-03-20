//THIRD PARTY MODULES
import classcat from 'classcat';
//LAYOUT, COMPONENTS
import Button from '_@shared/components/button/Button';
import Show from '_@shared/components/conditions/Show';
//SHARED
import EmptyBoxIcon from '_@shared/icons/EmptyBoxIcon';

type Props = {
  showButton?: boolean;
  href?: string;
  buttonText?: string;
};

const PostEmpty = ({ showButton = false, href = '/', buttonText = 'Back to Homepage' }: Props) => {
  return (
    <div
      className={classcat([
        'grid h-88 place-content-center justify-items-center gap-6',
        'lg:h-96.5 lg:gap-10',
      ])}
    >
      <EmptyBoxIcon className="lg:h-39 lg:w-39" />
      <p
        className={classcat([
          'max-w-[theme(spacing[61.75])] text-center text-16lig text-blu-400',
          'lg:max-w-none lg:text-20lig',
        ])}
      >
        Sorry... We don't have what you're looking for
      </p>
      <Show when={showButton}>
        <Button
          as="link"
          color="navy"
          href={href}
          className="btn-big mx-auto w-73.75 md:btn-very-big md:w-70"
        >
          {buttonText}
        </Button>
      </Show>
    </div>
  );
};

export default PostEmpty;
