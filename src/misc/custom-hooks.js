import { useEffect, useReducer, useState } from "react";

function showsReducer(prevState, action) {
    switch (action.type) {
        case 'ADD': {
            return [...prevState, action.showId];
        }

        case 'REMOVE': {
            return prevState.filter((showId) => showId !== action.showId);
        }

        default:
            return prevState;
    }
}

function usePersestedReducer(reducer, initialState, key) {
    const [state, Dispatch] = useReducer(reducer, initialState, (initial) => {
        const persisted = localStorage.getItem(key);

        return persisted ? JSON.parse(persisted) : initial;
    });

    useEffect(() => {
        localStorage.setItem(key, JSON.stringify(state))
    }, [state, key])

    return [state, Dispatch];
}

export function useShows(key = 'shows') {
    return usePersestedReducer(showsReducer, [], key);
};

export function useLastQuery(key = 'lastQuery') {

    const [input, setInput] = useState(() => {
        const persisted = sessionStorage.getItem(key)

        return persisted ? JSON.parse(persisted) : "";
    })

    const setPersistedInput = newState => {
        setInput(newState);
        sessionStorage.setItem(key, JSON.stringify(newState))
    }

    return [input, setPersistedInput]
}