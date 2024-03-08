import { useEffect, useState } from 'react';

const useDebounced = (value:string, delay = 500) => {
  const [valueDebounced, setValueDebounced] = useState<string>(value)
  useEffect(() => {
    const timerId = setTimeout(() => {
      setValueDebounced(value)
    }, delay);

    return () => clearTimeout(timerId)
  }, [value, delay])

  return valueDebounced
}

export default useDebounced
