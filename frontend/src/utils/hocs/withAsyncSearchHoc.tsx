import { useEffect } from 'react';
import _ from 'lodash';
import { useState } from 'react';
import MultiSelect from '../../components/inputs/MultiSelect';
import { isStringOrListEmpty } from '../missc'
import SingleSelect from '../../components/inputs/SingleSelect'

function useAsyncEuiComboBox(
  value,
  endpoint: (x: string) => any,
  initialOptions = []
) {
  const [searchValue, setSearchValue] = useState('');
  const [options, setOptions] = useState(initialOptions);
  const [isLoading, setIsLoading] = useState(false);
  const [hasTypedOnce, setHasTypedOnce] = useState(false);

  useEffect(() => {
    if (hasTypedOnce && searchValue === '' && isStringOrListEmpty(value)) {
      setOptions([]);
      setIsLoading(false);
    }
  }, [value, searchValue]);

  useEffect(() => {
    let isMounted = true;
    let timeoutId;

    async function fetchOptions() {
      setIsLoading(true);
      const result = await endpoint(searchValue);
      const data = result.data;

      if (isMounted) {
        setOptions(data);
        setIsLoading(false);
      }
    }
    if (searchValue.length > 0) {
      clearTimeout(timeoutId);
      timeoutId = setTimeout(fetchOptions, 300);
      // setIsLoading(false)
    } else {
    }

    return () => {
      isMounted = false;
      clearTimeout(timeoutId);
    };
  }, [searchValue, endpoint]);

  const onSearchChange = searchValue => {
    if (!hasTypedOnce) {
      setHasTypedOnce(true);
    }
    setSearchValue(searchValue);
  };

  return [options, isLoading, onSearchChange];
}

export function withMultiAsyncSearchHoc(endpoint, initialOptions = []) {
  function Component({ value, onChange, ...props }) {
    const [options, isLoading, onSearchChange] = useAsyncEuiComboBox(
      value,
      endpoint,
      initialOptions
    );

    return (
      <MultiSelect
        {...props}
        isLoading={isLoading}
        options={options}
        value={value}
        onChange={onChange}
        onSearchChange={onSearchChange}
      />
    );
  }
  return Component;
}

export function withSingleAsyncSearchHoc(endpoint, initialOptions = []) {
  function Component({ value, onChange, ...props }) {
    const [options, isLoading, onSearchChange] = useAsyncEuiComboBox(
      value,
      endpoint,
      initialOptions
    );

    return (
      <SingleSelect
        {...props}
        isLoading={isLoading}
        options={options}
        value={value}
        onChange={onChange}
        onSearchChange={onSearchChange}
      />
    );
  }
  return Component;
}
