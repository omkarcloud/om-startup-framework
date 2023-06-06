import { AxiosResponse } from "axios"
import _ from 'lodash';
import Language from '@omkar111111/utils/language';

export async function getDataFromAxiosResponse(res: Promise<AxiosResponse>) {
  try {
    return (await res).data
  } catch (e: any) {
    const data = e.response?.data
    return data
  }
}

export function isEmpty(x: any) {
  return x === null || x === undefined || x === '' || (typeof x == 'string' &&  x?.trim() === '');
}

export  const isNotEmpty = _.negate(isEmpty);

export function generateListWithIdAndValue(n) {
  const list = [];
  for (let i = 1; i <= n; i++) {
    list.push({ id: i.toString(), value: i.toString() });
  }
  return list;
}

export const isStringOrListNotEmpty = (x: any) =>
  typeof x === 'string' ? isNotEmpty(x) : !Language.isListEmpty(x);

export  const isStringOrListEmpty = _.negate(isStringOrListNotEmpty);
