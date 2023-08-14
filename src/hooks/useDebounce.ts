import { debounce } from "lodash-es";
import { useEffect, useMemo, useState } from "react";
import { useLatest } from "react-use";

function makeDeboucedHook(debounceFn: Function) {
  return function useDebounce(funct: any, delay: number) {
    const latestCb = useLatest(funct);

    const debouncedFn = useMemo(
      () =>
        debounceFn((...args: any) => {
          latestCb.current(...args);
        }, delay),
      [delay, latestCb]
    );
    useEffect(() => () => debouncedFn.cancel(), [debouncedFn]);
    return debouncedFn;
  };
}

export const useDebounce = makeDeboucedHook(debounce);