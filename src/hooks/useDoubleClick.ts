import { useState, useEffect, MouseEvent } from 'react';

const useDoubleClick = (
    actionDoubleClick: (e: MouseEvent) => void,
    delay = 250
) => {
    const [state, setState] = useState<{ click: number; e: MouseEvent | null }>({ click: 0, e: null });

    useEffect(() => {
        const timer = setTimeout(() => {

            setState({ e: state.e, click: 0 });
        }, delay);

        if (state.click === 2) actionDoubleClick(state.e!);

        return () => clearTimeout(timer);
    }, [state, actionDoubleClick, delay]);

    return (e: MouseEvent) => {
        setState({ click: state.click + 1, e });
    };
};

export default useDoubleClick;