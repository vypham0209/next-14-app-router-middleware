'use client';

//LAYOUT, COMPONENTS
import Button from '_@shared/components/button/Button';
import Show from '_@shared/components/conditions/Show';
//HOOK, SERVER
import useFilterQueryString from '_@landing/hook/useFilterQueryString';

type Props = {
  pagination: {
    total: number;
    page: number;
    size: number;
  };
};

const SocialPageLoadMoreButton = ({ pagination: { size, total } }: Props) => {
  const filter = useFilterQueryString();

  return (
    <Show when={total > size}>
      <Button
        color="navy"
        variant="outlined"
        className="btn-big mx-auto sm:w-87"
        onClick={() => {
          filter({ size: size + 9 }, undefined, false);
        }}
      >
        LOAD MORE
      </Button>
    </Show>
  );
};

export default SocialPageLoadMoreButton;
