//THIRD PARTY MODULES
import Image from 'next/image';

const GraphSectionFallback = () => {
  return (
    <section
      id="with-a-graph"
      className="mt-[calc(var(--h-header)*-1)] pt-[--h-header] full-fledge"
    >
      <div className="max-content grid gap-16 bg-yel-25 py-20 md:py-36">
        <div className="mx-auto grid max-w-[theme(spacing.200)] gap-6">
          <h2 className="text-center text-28 text-blu-400 md:text-48">Section with a graph</h2>
          <h3 className="text-center text-14lig text-blu-300 md:text-16lig">
            Lorem ipsum dolor sit amet consectetur. Et sed nisi porta facilisi libero nullam
            ullamcorper est netus. Placerat leo pulvinar iaculis hac eget scelerisque massa
            tincidunt odio. Aenean tempor amet enim amet accumsan quis. A ullamcorper pellentesque
            vitae pellentesque malesuada nunc nisi fringilla turpis.
          </h3>
        </div>

        <div className="grid gap-16 md:grid-cols-2 md:items-start md:gap-14">
          <div className="relative aspect-[6/5] s-576:mx-auto s-576:w-125 md:w-full">
            <Image src="/img/with-a-graph/image.webp" alt="" fill unoptimized quality={100} />
          </div>

          <div className="grid gap-2.5 md:gap-3 [&>p]:text-14lig [&>p]:text-blu-300 [&>p]:md:text-16lig">
            <p>
              Nunc hendrerit ultricies nulla sapien suspendisse pulvinar ante sem. Amet metus rutrum
              semper sollicitudin tristique fermentum at interdum. Ante nec cursus malesuada amet
              magna. Varius lacus risus aliquet metus. Praesent id turpis ipsum tristique. Tempor
              quisque tortor aliquam fermentum tortor morbi nec ut purus. Faucibus risus sit leo mi
              netus iaculis id. In eget elementum leo lorem id eu sed nunc pellentesque. Vitae quam
              sit feugiat purus. Nibh ornare porttitor viverra vitae libero nec rhoncus lorem cras.
              Et vel nunc a tellus mi viverra. Mollis aliquet odio ultrices aliquet massa.
            </p>
            <p>
              Libero suspendisse vitae faucibus a habitasse blandit. Quisque phasellus suspendisse
              elit sagittis massa in lacus pretium. Duis neque elementum velit amet sapien
              condimentum cras tellus. Eget ut gravida ut lectus pellentesque feugiat orci. Ac dolor
              placerat ut enim at. A porttitor diam orci sit. Faucibus gravida mattis non orci. Nunc
              sed tristique turpis id hendrerit maecenas sodales non. Sed enim orci consequat
              viverra nisl sit fringilla tristique in. Praesent lacus hendrerit urna vestibulum. Mus
              lacus dui turpis volutpat sit blandit pharetra euismod. Eu aliquam consectetur a
              feugiat diam nulla nunc neque massa.
            </p>
          </div>
        </div>
      </div>
    </section>
  );
};
export default GraphSectionFallback;
