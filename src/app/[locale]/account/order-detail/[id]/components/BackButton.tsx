'use client';
//THIRD PARTY MODULES
import classcat from 'classcat';
import Link from 'next-intl/link';
//SHARED
import ArrowLeftIcon from '_@shared/icons/ArrowLeftIcon';
//HOOK, SERVER

function BackButton() {
  return (
    <div>
      <div className={classcat(['space-i-6 flex items-center'])}>
        <Link
          href={'/account?tab=orders'}
          className={classcat([
            'group flex h-9 w-9 shrink-0 basis-9 cursor-pointer items-center justify-center border border-blu-100 text-yel-400',
            'hover:bg-yel-50 hover:text-yel-500 hover:shadow-btn-secondary-filled-hover',
          ])}
        >
          <ArrowLeftIcon className="group-hover:text-yel-500" />
        </Link>
        <div className="grow-1 flex items-center">
          <span className={classcat(['line-clamp-1 text-14 text-blu-500'])}>Go back to Orders</span>
        </div>
      </div>
    </div>
  );
}

export default BackButton;
