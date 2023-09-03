import { BookQueryOptions } from './book.interface';

export function catchBookQuery(data: BookQueryOptions, keys: string[]) {
  const result: any = {};
  for (const key of keys) {
    // eslint-disable-next-line no-prototype-builtins
    if (data.hasOwnProperty(key)) {
      result[key] = (data as any)[key];
    }
  }
  return result;
}
