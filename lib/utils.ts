import { type ClassValue, clsx } from 'clsx';
import type { ReadonlyURLSearchParams } from 'next/navigation';
import { twMerge } from 'tailwind-merge';
import { type ApolloError } from '@apollo/client';
import { toast } from 'sonner';
import { ORDER_STATUSES, statusLabel } from './constants';

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export const createUrl = (
  pathname: string,
  params: URLSearchParams | ReadonlyURLSearchParams
) => {
  const paramsString = params.toString();
  const queryString = `${paramsString.length ? '?' : ''}${paramsString}`;

  return `${pathname}${queryString}`;
};

export const READ_FILE = '/read-file?key=';

export const ERXES_SASS = 'erxes-saas/';

export const readFile = (url: string = '') => {
  if (url.startsWith(ERXES_SASS))
    return process.env.NEXT_PUBLIC_MAIN_API_DOMAIN + READ_FILE + url;

  if (url.includes(READ_FILE)) {
    const apiUrl = url.split(READ_FILE)[0];
    return url.replace(apiUrl, process.env.NEXT_PUBLIC_MAIN_API_DOMAIN || '');
  }
  return url;
};

export const formatNum = (num: number | string, splitter?: string): string => {
  const checked = typeof num === 'string' ? Number(num) : num;

  if (checked) {
    const options = splitter
      ? {
          minimumFractionDigits: 2,
          maximumFractionDigits: 2,
        }
      : undefined;

    return checked.toLocaleString(undefined, options);
  }

  return '0';
};

export const onError = (error: ApolloError) =>
  toast.error('Алдаа гарлаа!', { description: error.message });

export const getLabel = (status: string) =>
  statusLabel[status as keyof typeof statusLabel] || status;

export const getOrderStatus = (status: string, paidDate?: string) => {
  if (!paidDate) return 'Төлбөр хүлээгдэж байна';
  switch (status) {
    case ORDER_STATUSES.DOING:
      return 'Захиалга бэлтгэгдэж байна';
    case ORDER_STATUSES.REDOING:
      return 'Захиалга бэлтгэгдэж байна';
    case ORDER_STATUSES.DONE:
      return 'Захиалга хүргэлтэнд гарсан';
    case ORDER_STATUSES.COMPLETE:
      return 'Захиалга хүргэгдсэн';
    default:
      return 'Захиалга баталгаажсан';
  }
};

export function hexToHsl(hex: string) {
  // Remove the '#' symbol from the hex code
  hex = hex.replace('#', '');

  // Extract the individual RGB components
  const r = parseInt(hex.substring(0, 2), 16);
  const g = parseInt(hex.substring(2, 4), 16);
  const b = parseInt(hex.substring(4, 6), 16);

  return rgbToHsl(r, g, b);
}

export function rgbToHsl(r: number, g: number, b: number): string {
  r /= 255;
  g /= 255;
  b /= 255;

  const max = Math.max(r, g, b);
  const min = Math.min(r, g, b);
  let h: number,
    s: number,
    l: number = (max + min) / 2;

  if (max === min) {
    h = s = 0; // achromatic
  } else {
    const d = max - min;
    s = l > 0.5 ? d / (2 - max - min) : d / (max + min);

    switch (max) {
      case r:
        h = (g - b) / d + (g < b ? 6 : 0);
        break;
      case g:
        h = (b - r) / d + 2;
        break;
      case b:
        h = (r - g) / d + 4;
        break;
      default:
        h = 0;
        break;
    }

    h /= 6;
  }

  // Convert h, s, l values to percentages
  h = Math.round(h * 360);
  s = Math.round(s * 100);
  l = Math.round(l * 100);

  return `${h} ${s}% ${l}%`;
}

export function getSimilarColorWithOpacity(
  primaryColorHex: string,
  opacity: number
) {
  // Convert primary color hex to RGB
  const r = parseInt(primaryColorHex.substring(1, 3), 16);
  const g = parseInt(primaryColorHex.substring(3, 5), 16);
  const b = parseInt(primaryColorHex.substring(5, 7), 16);

  // Blend primary color with white
  const blendedR = Math.round((1 - opacity) * 255 + opacity * r);
  const blendedG = Math.round((1 - opacity) * 255 + opacity * g);
  const blendedB = Math.round((1 - opacity) * 255 + opacity * b);

  // Convert blended RGB to hexadecimal
  const blendedHex =
    '#' +
    ((1 << 24) + (blendedR << 16) + (blendedG << 8) + blendedB)
      .toString(16)
      .slice(1);

  return blendedHex;
}

export const getProductNameCode = (productName?: string) => {
  const arr = (productName || '').split(' - ');
  return {
    name: arr.length >= 2 ? arr.slice(1).join('') : productName,
    code: arr.length === 2 ? arr[0] : '',
  };
};
