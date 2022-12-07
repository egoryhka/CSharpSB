import {useCallback, useRef} from 'react';

export const useDebounce = (fn: Function, delay: number = 200) => {
    const timer = useRef<any>();

    return useCallback((...args: any) => {
        if (timer.current) {
            clearTimeout(timer.current);
        }
        timer.current = setTimeout(() => {
            fn(...args)
        }, delay)
    }, [fn, delay]);
};
