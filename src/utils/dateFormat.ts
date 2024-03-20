//THIRD PARTY MODULES
import dayjs from 'dayjs';
import relativeTime from 'dayjs/plugin/relativeTime';

dayjs.extend(relativeTime);

export const renderDateOrHoursAgo = (publishedTime: Date, format = 'YYYY-MM-DD') => {
  return publishedTime.getTime() > dayjs().subtract(1, 'day').unix() * 1000
    ? dayjs(publishedTime).fromNow()
    : dayjs(publishedTime).format(format);
};

export const renderDate = (publishedTime: Date, format = 'YYYY-MM-DD') => {
  return dayjs(publishedTime).format(format);
};
