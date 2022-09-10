import dayjs from "dayjs";
import relativeTime from "dayjs/plugin/relativeTime";

dayjs.extend(relativeTime);

export const getFormatDiscanceToNow = (date: number) => {
  return dayjs(date).fromNow();
};
