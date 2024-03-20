//THIRD PARTY MODULES
import React from 'react';
import classcat from 'classcat';

export type TDescriptionCardProps = {
  items: Omit<TDescriptionProp, 'styles'>[];
  className?: string;
} & Pick<TDescriptionProp, 'styles'>;

function DescriptionCard({ items, styles, className }: TDescriptionCardProps) {
  return (
    <div
      className={classcat([
        'grid  w-full grid-cols-1 gap-4',
        ' md:grid-cols-3 md:gap-6',
        className,
      ])}
    >
      {items.map((item, index) => (
        <Description key={index} {...item} styles={{ ...styles }} />
      ))}
    </div>
  );
}

export default DescriptionCard;

type TDescriptionProp = {
  title: string;
  value: string | JSX.Element;
  styles?: {
    containerClasses?: string;
    titleClasses?: string;
    valueClasses?: string;
  };
};

const Description = ({ title, value, styles }: TDescriptionProp) => {
  return (
    <div className={classcat(['grid content-start gap-1 md:gap-2', styles?.containerClasses])}>
      <p
        className={classcat(['text-12 uppercase text-blu-500', 'md:text-14', styles?.titleClasses])}
      >
        {title}
      </p>
      <p className={classcat(['text-12lig text-blu-400', 'md:text-14lig', styles?.valueClasses])}>
        {value}
      </p>
    </div>
  );
};
