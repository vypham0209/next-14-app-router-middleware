//LAYOUT, COMPONENTS
import SocialIconList from '_@landing/components/card/SocialIconList';

const SocialPageHeaderFallback = () => {
  return (
    <div className="grid gap-10 lg:gap-14">
      <div className="grid gap-6 lg:grid-cols-[455fr_685fr] lg:items-start lg:gap-35">
        <h1 className="word-break text-36 text-blu-400 lg:text-48">Social wall</h1>
        <div className="grid gap-4 lg:justify-items-end">
          <p className="word-break text-16lig text-blu-400 lg:text-end lg:text-20lig lg:text-blu-300">
            Here are some of our latest posts! Catch up with us on
          </p>
          <SocialIconList />
        </div>
      </div>

      <div className="h-px bg-blu-200" />

      <h2 className="text-24 text-blu-400 lg:text-28">Browse all social media posts</h2>
    </div>
  );
};

export default SocialPageHeaderFallback;
