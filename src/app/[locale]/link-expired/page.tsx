//THIRD PARTY MODULES
import classcat from 'classcat';
//LAYOUT, COMPONENTS
import Button from '_@shared/components/button/Button';
//SHARED
import LinkExpiredIcon from '_@shared/icons/LinkExpiredIcon';

const LinkExpired = () => {
  return (
    // <div
    //   className={classcat(['flex flex-col items-center justify-center pb-35 pt-10', 'md:mi-auto'])}
    // >
    //   <div className={classcat(['text-center md:max-w-[theme(spacing[154.5])]'])}>
    //     <LinkExpiredIcon className="mi-auto" />
    //     <div className={classcat(['mt-10 text-36 text-blu-400', 'md:text-64'])}>
    //       Link Expired! :(
    //     </div>
    //     <p className={classcat(['mt-6 text-20lig text-blu-400'])}>
    //       {`We're sorry, but the link you clicked on has been expired. You'll be taken back to the homepage and log in again to request a new link. Thank you for your patience!`}
    //     </p>
    //     <Button color="navy" as="link" href="/" className="btn-very-big ow:w-70 ow:h-14">
    //       Back to Homepage
    //     </Button>
    //   </div>
    // </div>
    <div
      className={classcat([
        'grid h-min justify-items-center gap-10 text-center',
        'pb-35 pt-10 lg:pt-20',
      ])}
    >
      <LinkExpiredIcon className="mi-auto" />
      <div className="grid w-[281px] gap-6 sm:w-[500px] md:w-[618px]">
        <span className="text-36 text-blu-400">Link Expired! :(</span>
        <p className="text-20 font-light text-blu-400">
          We're sorry, but the link you clicked on has been expired. You'll be taken back to the
          homepage and log in again to request a new link. Thank you for your patience!
        </p>
      </div>

      <Button color="navy" as="link" href="/" className="btn-big md:btn-very-big md:w-70">
        Back to Homepage
      </Button>
    </div>
  );
};

export default LinkExpired;
