import Hooks from '@omkar111111/utils/hooks';
import { AxiosError, AxiosResponse } from 'axios';
import { useState } from 'react';

function makeFetchFn(
  setLoading,
  requests: () => Promise<any>,
  setError,
  setData
) {
  return;
}

function useAxios<A>(requests: () => Promise<any>, {onSuccess, mapData}:{ mapData?:(x:any)=>any,  onSuccess?: (x:any)=>any} = {},  runOnMount = true) {
  const [data, setData] = useState<undefined | any>(undefined);
  const [error, setError] = useState<AxiosError | undefined>(undefined);
  const [isLoading, setLoading] = useState(runOnMount ? true:false);

  const fetchData = async () => {
    setLoading(true);
    let final = null;
    try {
      const result = await Promise.all([requests].map(requests => requests()));
      const datas = result.map(result => result?.data);

      setError(undefined);
      if (datas.length === 1) {
        final = datas[0];
      } else {
        final = datas;
      }

      final = mapData ? mapData(final): final
      
      onSuccess?.(final);

      setData(final);
      setLoading(false);

    } catch (error) {
      console.error(error);
      setError(error as any);
      setLoading(false);
      throw error;
    }
    // setLoading(false);
    return final;
  };

  Hooks.useDidMount(() => {
    if (runOnMount) {
      fetchData();
    }
  });
  
  return {
    data: data as A | undefined,
    fetch: fetchData,
    refetch: fetchData,
    error,
    isLoading,
  };
}

function useLazyAxios<A>(requests: () => Promise<any>, options = {}) {
  return useAxios(requests, options, false);
}

export { useLazyAxios, useAxios };
export default useAxios;
