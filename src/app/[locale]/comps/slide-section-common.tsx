//THIRD PARTY MODULES
import classcat from 'classcat';
import { ComponentPropsWithoutRef } from 'react';
import { SiteContentComponent } from '@prisma/client';
//LAYOUT, COMPONENTS
import Button from '_@shared/components/button/Button';
//SHARED
import { Assign } from '_@shared/utils/type';
import ArrowLeftIcon from '_@shared/icons/ArrowLeftIcon';
import ArrowRightIcon from '_@shared/icons/ArrowRightIcon';

export const sliderClasses = [
  'relative',
  'h-full [&_.slick-list]:h-full [&_.slick-slide>div]:h-full [&_.slick-slide]:h-full [&_.slick-track]:h-full',
  'focus-visible:outline-none focus-visible:[&_.slick-list]:outline-none focus-visible:[&_.slick-track]:outline-none',
];

type ArrowType = 'prev' | 'next';
type ArrowProps = Assign<
  ComponentPropsWithoutRef<'button'>,
  {
    type?: ArrowType;
  }
>;
type ArrowLookup = Record<
  ArrowType,
  {
    buttonClasses: string | string[];
    icon: typeof ArrowLeftIcon | typeof ArrowRightIcon;
    text: 'Prev' | 'Next';
  }
>;

export const Arrow = ({ type = 'prev', className, ...props }: ArrowProps) => {
  const lookup: ArrowLookup = {
    prev: {
      buttonClasses: ['left-6 s-1440:left-[--max-padding]'],
      icon: ArrowLeftIcon,
      text: 'Prev',
    },
    next: {
      buttonClasses: ['right-6 s-1440:right-[--max-padding]'],
      icon: ArrowRightIcon,
      text: 'Next',
    },
  };

  const Icon = lookup[type].icon;

  return (
    <button
      type="button"
      className={classcat([
        'absolute top-60 s-992:bottom-1/2 s-992:translate-y-1/2',
        'rounded-full border border-blu-200',
        'grid aspect-square w-9 place-items-center',
        'hover-hover:bg-blu-500 hover-hover:shadow-arrow transition',
        lookup[type].buttonClasses,
        className,
      ])}
      {...props}
    >
      <Icon className="h-5 w-5 text-white" />
      <span className="sr-only">{lookup[type].text}</span>
    </button>
  );
};

export const Dot = ({ className, ...props }: ComponentPropsWithoutRef<'button'>) => {
  return (
    <button
      type="button"
      className={classcat([
        'relative h-1.25 w-20 before:absolute before:-inset-2',
        'data-[active=false]:bg-yel-400 data-[active=true]:bg-white',
        className,
      ])}
      {...props}
    >
      <span className="sr-only">Dot</span>
    </button>
  );
};

export const ButtonList = () => {
  return (
    <div
      className={classcat([
        'grid gap-4',
        'max-content absolute inset-x-0 bottom-10',
        's-992:grid-cols-5 s-992:justify-center s-992:gap-6 s-1440:grid-cols-[repeat(5,_minmax(0,11.25rem))]',
      ])}
    >
      {BUTTON_LIST.map(({ text, href }) => (
        <Button key={href} color="secondary" as="link" href={href}>
          {text}
        </Button>
      ))}
    </div>
  );
};

export const SLIDE_LIST = [
  {
    title: 'Section With A List',
    subtitle:
      'Lorem ipsum dolor sit amet consectetur. Vestibulum vel fames ultricies mattis euismod. Vel amet massa massa aliquam dui neque nisl. Varius tellus egestas mattis nunc dolor porttitor nulla nunc faucibus. Amet nunc felis faucibus id id. Diam cras urna enim rutrum ut.',
  },
  {
    title: 'Section With A Graph',
    subtitle:
      'Lorem ipsum dolor sit amet consectetur. Vestibulum vel fames ultricies mattis euismod. Vel amet massa massa aliquam dui neque nisl. Varius tellus egestas mattis nunc dolor porttitor nulla nunc faucibus. Amet nunc felis faucibus id id. Diam cras urna enim rutrum ut.',
  },
  {
    title: 'Section With Numbers',
    subtitle:
      'Lorem ipsum dolor sit amet consectetur. Vestibulum vel fames ultricies mattis euismod. Vel amet massa massa aliquam dui neque nisl. Varius tellus egestas mattis nunc dolor porttitor nulla nunc faucibus. Amet nunc felis faucibus id id. Diam cras urna enim rutrum ut.',
  },
  {
    title: "Founder's Words",
    subtitle:
      'Lorem ipsum dolor sit amet consectetur. Vestibulum vel fames ultricies mattis euismod. Vel amet massa massa aliquam dui neque nisl. Varius tellus egestas mattis nunc dolor porttitor nulla nunc faucibus. Amet nunc felis faucibus id id. Diam cras urna enim rutrum ut.',
  },
  {
    title: 'Rethink African Cuisine',
    subtitle:
      'Lorem ipsum dolor sit amet consectetur. Vestibulum vel fames ultricies mattis euismod. Vel amet massa massa aliquam dui neque nisl. Varius tellus egestas mattis nunc dolor porttitor nulla nunc faucibus. Amet nunc felis faucibus id id. Diam cras urna enim rutrum ut.',
  },
];

export const BUTTON_LIST = [
  {
    text: 'Section with a list',
    href: `#${SiteContentComponent.SECTION_WITH_A_LIST.toLowerCase()}`,
  },
  {
    text: 'Section with a graph',
    href: `#${SiteContentComponent.SECTION_WITH_A_GRAPH.toLowerCase()}`,
  },
  {
    text: 'Section with numbers',
    href: `#${SiteContentComponent.SECTION_WITH_A_NUMBER.toLowerCase()}`,
  },
  {
    text: "Founder's words",
    href: `#${SiteContentComponent.FOUNDER_QUOTE.toLowerCase()}`,
  },
  {
    text: 'Rethink African Cuisine',
    href: '#rethink',
  },
];
