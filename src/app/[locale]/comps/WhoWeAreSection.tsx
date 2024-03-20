//THIRD PARTY MODULES
import Image from 'next/image';
import classcat from 'classcat';
import { cookies } from 'next/headers';
import { SiteContentComponent } from '@prisma/client';
import { GetSiteContentByComponentInput } from '_@rpc/routers/site-content/site-content.validators';
//LAYOUT, COMPONENTS
import Button from '_@shared/components/button/Button';
import { aboutUsAnchor } from '_@landing/layout/header/constants';
import { CustomRotate, CustomFade } from '_@landing/components/client';
//SHARED
import { apiServer } from '_@shared/utils/apiServer';

const components = [
  SiteContentComponent.WHO_WE_ARE,
  SiteContentComponent.VALORIZATION,
  SiteContentComponent.CULTURES,
  SiteContentComponent.ETHNICITIES,
  SiteContentComponent.DIVERSITY,
];
const getData = async () => {
  const locale = cookies().get('NEXT_LOCALE')?.value || 'en';
  const data = await apiServer.siteContent.getSiteContentByComponent.query({
    language: locale.toUpperCase() as GetSiteContentByComponentInput['language'],
    components,
  });
  if (data.status) return data.data;
};

const WhoWeAreSection = async () => {
  const data = await getData();
  if (!data || data.length === 0) return null;
  const list = components
    .map((component) => data.find((item) => item.component === component))
    .filter(Boolean);

  return (
    <section
      id={aboutUsAnchor}
      className={classcat(['mt-[calc(var(--h-header)*-1)] bg-yel-50 pt-[--h-header] full-fledge'])}
    >
      <div className={classcat(['gap-10 py-20', 'lg:gap-16 lg:py-36', 'max-content grid '])}>
        <div
          className={classcat([
            'grid gap-4',
            'md:grid-cols-[9fr_11fr] md:items-start md:gap-10',
            'xl:grid-cols-[theme(spacing.135)_1fr]',
          ])}
        >
          <h2 className="break-word text-36 text-blu-400 lg:text-48">{list[0].title}</h2>
          <p className="break-word text-16lig text-blu-300 lg:text-20lig">{list[0].subtitle}</p>
        </div>

        <div className="h-px bg-blu-200" />

        <div
          className={classcat([
            'grid gap-10 lg:grid-cols-3',
            's-1440:grid-cols-[1fr_theme(spacing.130)_1fr]',
          ])}
        >
          <div className="grid gap-10">
            <CustomFade triggerOnce direction="right" directionMobile="up">
              <div className="grid gap-4">
                <h3 className="break-word text-24 text-blu-400 lg:text-36">{list[1].title}</h3>
                <p className="break-word text-14lig text-blu-300 lg:text-16lig">
                  {list[1].subtitle}
                </p>
              </div>
            </CustomFade>
            <CustomFade triggerOnce direction="right" directionMobile="up" delay={2}>
              <div className="grid gap-4">
                <h3 className="break-word text-24 text-blu-400 lg:text-36">{list[2].title}</h3>
                <p className="break-word text-14lig text-blu-300 lg:text-16lig">
                  {list[2].subtitle}
                </p>
              </div>
            </CustomFade>
          </div>

          <div className="relative z-min aspect-[283/294.5] w-70.75 self-center justify-self-center lg:w-full s-1440:self-auto">
            <CustomRotate triggerOnce delay={4} className="h-full origin-bottom-right">
              <div className="absolute aspect-[550/590] h-full">
                <Image
                  fill
                  unoptimized
                  alt="who-we-are-back"
                  className="object-cover"
                  src="/img/who-we-are/who-we-are-back.webp"
                />
              </div>
            </CustomRotate>
            <div className="absolute right-0 top-[14px] aspect-[244/260] w-[86.22%] rotate-[-3deg]">
              <Image
                fill
                unoptimized
                alt="who-we-are-front"
                className="object-cover"
                src={
                  list[0].mediaUrl
                    ? (process.env.NEXT_PUBLIC_CDN_HOST as string) + list[0].mediaUrl
                    : '/img/who-we-are/who-we-are-front.webp'
                }
              />
            </div>
          </div>

          <div className="grid gap-10">
            <CustomFade triggerOnce direction="left" directionMobile="up">
              <div className="grid gap-4">
                <h3 className="break-word text-24 text-blu-400 lg:text-36">{list[3].title}</h3>
                <p className="break-word text-14lig text-blu-300 lg:text-16lig">
                  {list[3].subtitle}
                </p>
              </div>
            </CustomFade>
            <CustomFade triggerOnce direction="left" directionMobile="up" delay={2}>
              <div className="grid gap-4">
                <h3 className="break-word text-24 text-blu-400 lg:text-36">{list[4].title}</h3>
                <p className="break-word text-14lig text-blu-300 lg:text-16lig">
                  {list[4].subtitle}
                </p>
              </div>
            </CustomFade>
          </div>
        </div>

        <Button as="link" href="/exploring-food" className="btn-big mx-auto sm:w-87">
          EXPLORE FOOD
        </Button>
      </div>
    </section>
  );
};

export default WhoWeAreSection;
