'use client';
//THIRD PARTY MODULES
import { useState } from 'react';
//LAYOUT, COMPONENTS
import Tooltip from '_@shared/components/Tooltip';
//SHARED
import InformationCircleIcon from '_@shared/icons/InformationCircleIcon';
//HOOK, SERVER
import useWindowSize from '_@landing/hook/useWindowSize';

function RepeatTooltip() {
  const [open, setOpen] = useState(false);
  const { width } = useWindowSize();
  const isMobile = width <= 768;
  return (
    <Tooltip
      open={open}
      delayDuration={300}
      description="The loop is counted from the first date you select. For example, if you choose to receive your meal on Wednesday and Thursday, after you receive your order on these two days, the next delivery will be counted from next week."
      contentProps={{
        className: 'z-toast py-1',
        sideOffset: 1,
        alignOffset: isMobile ? -54 : 0,
        align: isMobile ? 'start' : 'center',
      }}
    >
      <InformationCircleIcon
        onMouseEnter={() => setOpen(true)}
        onMouseLeave={() => setOpen(false)}
        onFocus={() => setOpen(true)}
        onBlur={() => setOpen(false)}
        className="h-4.5 w-4.5"
      />
    </Tooltip>
  );
}

export default RepeatTooltip;
