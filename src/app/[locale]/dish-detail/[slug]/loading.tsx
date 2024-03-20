//RELATIVE MODULES
import './DishDetail.css';

export default function Loading() {
  return (
    <div className="wrap-dish-detail lg:full-fledge">
      <div className="lg:flex lg:h-full lg:flex-col">
        <div className="mt-10 h-7.5 w-15 bg-skeleton" />
        <div className="mt-4 h-9 bg-skeleton" />
        <div className="mt-6 flex flex-col gap-6">
          <div className="grid h-6.75 grid-flow-col gap-10">
            <div className="bg-skeleton" />
            <div className="bg-skeleton" />
            <div className="bg-skeleton" />
          </div>
          <div className="h-11 bg-skeleton" />
          <div className="flex flex-col space-y-2">
            <div className="h-6 w-13.5 bg-skeleton" />
            <div className="h-6 w-64 bg-skeleton" />
          </div>
          <div className="flex flex-col space-y-2">
            <div className="h-6 w-13.5 bg-skeleton" />
            <div className="h-8 w-64 bg-skeleton" />
          </div>
          <div className="flex flex-col space-y-2">
            <div className="h-6.75 w-64 bg-skeleton" />
            <div className="flex basis-10 flex-row gap-6">
              <div className="w-10 bg-skeleton" />
              <div className="w-10 bg-skeleton" />
              <div className="w-10 bg-skeleton" />
              <div className="w-10 bg-skeleton" />
            </div>
          </div>
          <div className="flex flex-col space-y-2">
            <div className="h-6 w-13.5 bg-skeleton" />
            <div className="h-6 w-64 bg-skeleton" />
          </div>
        </div>
        <div className="mt-6 grid h-12 grid-flow-col gap-20">
          <div className="bg-skeleton" />
          <div className="bg-skeleton" />
        </div>
      </div>
      <div className="bg-skeleton lg:max-h-full" />
    </div>
  );
}
