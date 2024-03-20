//THIRD PARTY MODULES
import Image from 'next/image';
import classcat from 'classcat';
//LAYOUT, COMPONENTS
import Button from '_@shared/components/button/Button';
import WrapBreadcrumb from '_@landing/components/breadcrumb/WrapBreadcrumb';
//SHARED
import BookOpenIcon from '_@shared/icons/BookOpenIcon';
import CalendarIcon from '_@shared/icons/CalendarIcon';

export default function Loading() {
  const breadcrumbList = [
    {
      url: '/',
      name: 'Homepage',
    },
    {
      url: '/insights',
      name: 'Insights',
    },
    {
      url: '',
      name: 'Loading...',
    },
  ];

  return (
    <>
      <WrapBreadcrumb list={breadcrumbList} />
      <div className="lg:max-content">
        <div className="grid animate-pulse gap-8 bg-yel-50 p-6 sm:p-10 sm:pr-14 md:grid-cols-2 md:items-start lg:gap-10">
          <div className="invisible relative aspect-video drop-shadow-image sm:drop-shadow-image-desktop md:order-1">
            <Image
              fill
              alt=""
              className="object-cover"
              src="https://d2o4cgdx89n2vy.cloudfront.net/images/2023/6/v9uh52fr7s8.jpeg"
            />
          </div>

          <div className="invisible grid gap-4 lg:gap-6">
            <h1 className="text-28 text-blu-400 lg:text-36">
              Faucibus metus morbi mattis pellentesque hendrerit adipiscing lacus.
            </h1>
            <p className={classcat(['font-georgia text-14ita italic text-blu-400 lg:text-16ita'])}>
              Viverra eu commodo facilisi faucibus vitae. Enim vehicula ut nunc lacinia etiam in
              lectus et habitant. Facilisis accumsan a arcu tincidunt ipsum. Nisl turpis dictum nec
              sed. Euismod facilisis arcu blandit tristique facilisis facilisi. Faucibus aliquam
              erat tellus dolor tempor id egestas. Sem gravida adipiscing lectus ipsum ipsum amet
              massa. Nibh vestibulum nulla netus amet felis a tristique nec. Ante id in et cursus.
            </p>
            <div className="grid auto-cols-max grid-flow-col items-center gap-8">
              <div className="grid auto-cols-max grid-flow-col items-center gap-2">
                <CalendarIcon className="h-4 w-4" />
                <p className="text-12 text-blu-500">Feb 1, 2023</p>
              </div>
              <div className="grid auto-cols-max grid-flow-col items-center gap-2">
                <BookOpenIcon className="h-4 w-4" />
                <p className="text-12 text-blu-500">5 mins</p>
              </div>
            </div>
            <div className="grid auto-cols-max grid-flow-col gap-6">
              <Button variant="ghost">Ordinary</Button>
              <Button variant="ghost">Healthy</Button>
              <Button variant="ghost">Vegetarian</Button>
              <Button variant="ghost">Vegan</Button>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
