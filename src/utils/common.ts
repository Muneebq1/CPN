import { EnumType } from '@/@types';

export {};

export const truncateText = (text: string, wordLimit: number): string =>
  text?.split(' ').length > wordLimit
    ? `${text.split(' ').slice(0, wordLimit).join(' ')}...`
    : text;

export const isClickOutsideModal = (
  event: MouseEvent,
  modalReference: React.RefObject<HTMLDivElement>,
) => {
  return (
    modalReference.current &&
    !modalReference.current.contains(event.target as Node)
  );
};
export const formatViews = (views: number): string => {
  if (views < 1_000) {
    return views.toString();
  } else if (views < 1_000_000) {
    return `${(views / 1_000).toFixed(1).replace(/\.0$/, '')}K`;
  } else if (views < 1_000_000_000) {
    return `${(views / 1_000_000).toFixed(1).replace(/\.0$/, '')}M`;
  }

  return `${(views / 1_000_000_000).toFixed(1).replace(/\.0$/, '')}B`;
};
export const formatDuration = (duration: number) => {
  const hours = Math.floor(duration / 3600);
  const minutes = Math.floor((duration % 3600) / 60);
  const seconds = duration % 60;

  const minutesStr = minutes.toString().padStart(2, '0');
  const secondsStr = seconds.toString().padStart(2, '0');

  if (hours > 0) {
    const hoursStr = hours.toString().padStart(2, '0');
    return `${hoursStr}:${minutesStr}:${secondsStr}`;
  }

  return `${minutesStr}:${secondsStr}`;
};

export const EnumToArray = <T extends EnumType<T>>(enumObj: T): string[] => {
  return Object.values(enumObj);
};
