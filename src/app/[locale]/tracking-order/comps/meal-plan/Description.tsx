//LAYOUT, COMPONENTS
import DescriptionCard, { TDescriptionCardProps } from '_@landing/components/DescriptionCard';

type TDescriptionProps = TDescriptionCardProps;

function Description(props: TDescriptionProps) {
  return (
    <div className="grid gap-4">
      <h3 className="text-18 text-blu-400 md:text-24">Info</h3>
      <DescriptionCard {...props} />
    </div>
  );
}

export default Description;
