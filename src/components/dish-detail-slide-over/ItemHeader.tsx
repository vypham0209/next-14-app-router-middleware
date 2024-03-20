//THIRD PARTY MODULES
import Image from 'next/image';
import classcat from 'classcat';

type Props = {
  title: string;
  imageSrc?: string;
  className?: string;
};

export default function ItemHeader({ title, imageSrc, className }: Props) {
  return (
    <div className={classcat(['space-i-2 flex', className])}>
      <div className="relative aspect-square w-25 shrink-0 bg-yel-100 md:w-14">
        {imageSrc ? (
          <Image
            fill
            alt={title}
            unoptimized
            quality={100}
            className="object-cover"
            src={process.env.NEXT_PUBLIC_CDN_HOST + imageSrc}
          />
        ) : null}
      </div>
      <div className="flex flex-col">
        <p className="grow text-16 text-blu-400">{title}</p>
        <span className="block text-14lig text-blu-400 md:hidden">237kcal</span>
      </div>
    </div>
  );
}
