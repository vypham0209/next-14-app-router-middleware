//THIRD PARTY MODULES
import Image from 'next/image';
import classcat from 'classcat';
//LAYOUT, COMPONENTS
import Button from '_@shared/components/button/Button';

const ComingSoonSection = () => {
  return (
    <section
      className={classcat([
        'bg-yel-25 pb-20 pt-10 text-center text-blu-400 ',
        'md:pb-40',
        'tabletL:pb-[120px] tabletL:pt-[114px] tabletL:pi-4',
      ])}
    >
      <div className={classcat(['flex flex-col items-center justify-center space-y-10 '])}>
        <Image
          src="/img/coming-soon/coming-soon.webp"
          alt="coming-soon"
          className={classcat(['h-38 w-72.75', 'md:h-69 md:w-144.25'])}
          width={100}
          height={100}
          unoptimized
        />
        <div
          className={classcat([
            'flex flex-col items-center justify-center space-y-6',
            'md:space-y-10',
          ])}
        >
          <h1
            className={classcat([
              'text-center text-36',
              'md:text-64',
              'tabletL:mb-[8px] tabletL:text-36',
            ])}
          >
            Coming soon...
          </h1>
          <p
            className={classcat([
              'max-w-[685px] text-center text-14lig',
              'md:text-20light',
              'tabletL:text-14 tabletL:leading-[22px]',
            ])}
          >
            Stay tuned. Our app and website are currently being developed. We are working hard. With
            a bit more effort, we will be ready to launch. Something very innovative and disruptive
            is coming soon. Be first to know.
          </p>
          <Button
            as="link"
            href="https://quiz.typeform.com/to/UraNEl4m"
            rel="noreferrer"
            target="_blank"
            className={classcat([
              'w-full py-3.25',
              '[&>span]:text-14 [&>span]:md:text-16 [&>svg]:h-5.75',
              'md:w-71.25 md:py-4',
            ])}
            color="navy"
            variant="filled"
          >
            Welcome/Akwaba
          </Button>
        </div>
      </div>
    </section>
  );
};

export default ComingSoonSection;
