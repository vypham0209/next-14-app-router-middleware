'use client';
//THIRD PARTY MODULES
import React, { useMemo } from 'react';
import { renderDate } from '_@landing/utils/dateFormat';

const PublishTime = ({ publishedTime }: { publishedTime: Date }) => {
  const time = useMemo(() => renderDate(publishedTime, 'DD/MM/YYYY'), [publishedTime]);

  return <>{time}</>;
};

export default PublishTime;
