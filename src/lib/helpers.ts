
import { format, formatDistanceToNow } from 'date-fns';

export const formatDate = (dateString: string): string => {
  const date = new Date(dateString);
  return format(date, 'MMM dd, yyyy');
};

export const formatTime = (dateString: string): string => {
  const date = new Date(dateString);
  return format(date, 'h:mm a');
};

export const formatRelativeTime = (dateString: string): string => {
  const date = new Date(dateString);
  return formatDistanceToNow(date, { addSuffix: true });
};

export const generateRandomId = (): string => {
  return Math.random().toString(36).substring(2, 15);
};
