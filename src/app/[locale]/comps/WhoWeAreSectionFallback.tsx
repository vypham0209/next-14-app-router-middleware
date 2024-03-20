//THIRD PARTY MODULES
import Image from 'next/image';
import classcat from 'classcat';
//LAYOUT, COMPONENTS
import Button from '_@shared/components/button/Button';
import { aboutUsAnchor } from '_@landing/layout/header/constants';
import { CustomRotate, CustomFade } from '_@landing/components/client';

const WhoWeAreSectionFallback = () => {
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
          <h2 className="text-36 text-blu-400 lg:text-48">Who we are</h2>
          <p className="text-16lig text-blu-300 lg:text-20lig">
            Disruptors who wish to reset the general perception of African cuisine. Our innovative
            approach will allow our Internet users as well as our consumers to enjoy a total
            immersion, sensory journeys, and a unique experience in the subtleties and flavors of
            West African gastronomy and culinary arts.
          </p>
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
                <h3 className="text-24 text-blu-400 lg:text-36">Valorization</h3>
                <p className="text-14lig text-blu-300 lg:text-16lig">
                  Our coverage will allow our Internet users and consumers to discover and order
                  authentic, diversified West African food & drinks - a wonderful representation of
                  gastronomy and culinary arts. We will expand the geographical reach that will
                  start from the Ivory Coast and go through other countries of the ECOWAS zone such
                  as Ghana, Cameroon, Senegal, Nigeria, Guinea (Conakry), and Sierra Leone.
                </p>
              </div>
            </CustomFade>
            <CustomFade triggerOnce direction="right" directionMobile="up" delay={2}>
              <div className="grid gap-4">
                <h3 className="text-24 text-blu-400 lg:text-36">Cultures</h3>
                <p className="text-14lig text-blu-300 lg:text-16lig">
                  We use our authentic and diverse cuisine and more specifically gourmet culinary
                  arts as a common denominator to present a yet-to-be-discovered side of Africa to
                  the world. We believe that learning, exploring and respecting other cultures, and
                  sharing culinary experiences can help people build bridges while indulging in new
                  sensory journeys. We learn more about our common humanity by bonding around the
                  subtleties and flavors of great food.
                </p>
              </div>
            </CustomFade>
          </div>

          <div className="relative z-min aspect-[283/294.5] w-70.75 self-center justify-self-center lg:w-full s-1440:self-auto">
            <CustomRotate triggerOnce delay={2} className="h-full origin-bottom-right">
              <div className="absolute aspect-[550/590] h-full">
                <Image
                  fill
                  alt="who-we-are-back"
                  className="object-cover"
                  src="/img/who-we-are/who-we-are-back.webp"
                />
              </div>
            </CustomRotate>
            <div className="absolute right-0 top-[7.84px] aspect-[515/546] w-[91%]">
              <Image
                fill
                alt="who-we-are-front"
                className="object-cover"
                src="/img/who-we-are/who-we-are-front.webp"
              />
            </div>
          </div>

          <div className="grid gap-10">
            <CustomFade triggerOnce direction="left" directionMobile="up">
              <div className="grid gap-4">
                <h3 className="text-24 text-blu-400 lg:text-36">Ethnicities</h3>
                <p className="text-14lig text-blu-300 lg:text-16lig">
                  Our goal is to develop and make known the gastronomic culinary art of the Ivory
                  Coast and its four great ethnic groups (The Mande in the North-West, The
                  Voltaïques or the Gour in the North-East, The Krou in the South-West, The Akan in
                  the South-East), as well as some countries of the ECOWAS region such as Ghana
                  (Gas, Akyems, Konkombas, and Dagaris), Nigeria (Yoruba, Hausa, Igbo, and Fulani),
                  Senegal (Wolofs, Lebous, Fulani, and Toucouleurs), Cameroon (Bamileke), Guinea
                  Conakry (Malinke and Soussou), Sierra Leone (Mende, Temne, and Krio).
                </p>
              </div>
            </CustomFade>
            <CustomFade triggerOnce direction="left" directionMobile="up" delay={2}>
              <div className="grid gap-4">
                <h3 className="text-24 text-blu-400 lg:text-36">Diversity</h3>
                <p className="text-14lig text-blu-300 lg:text-16lig">
                  West Africa is home to many different ethnic and social groups. This refined
                  cultural diversity is at the service of complementary culinary wealth we want to
                  promote and share with the world.
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

export default WhoWeAreSectionFallback;
