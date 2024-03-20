//THIRD PARTY MODULES
import React from 'react';
//SHARED
import LoadingIcon from '_@shared/icons/LoadingIcon';

function Loading() {
  return (
    <div className="grid h-[calc(156rem/16)] place-content-center md:h-[calc(276rem/16)]">
      <LoadingIcon className="h-4 w-4 md:h-6 md:w-6" />
    </div>
  );
}

export default Loading;
