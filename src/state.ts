import {Dispatch, Reducer, ReducerAction, useEffect, useReducer} from "react";


const MAX_HISTORY = 10;


type history = {
    keyword: string;
    begin: string;
    end: string;
    timeZone: string;
};


export type State = {
    histories: Array<history>;
    keyword: string;
    begin: string;
    end: string;
    timeZone: string;
}


interface setKeywordAction {
    type: "setKeyword";
    payload: {
        keyword: string;
    }
}


interface historyAppendAction {
    type: "appendHistory";
    payload: {
        history: history;
    };
}


interface historyDeleteAction {
    type: "deleteHistory";
    payload: {
        index: number;
    };
}


interface setBeginAction {
    type: "setBegin";
    payload: {
        begin: string;
    }
}


interface setEndAction {
    type: "setEnd";
    payload: {
        end: string;
    }
}


interface setTimeZoneAction {
    type: "setTimeZone";
    payload: {
        timeZone: string;
    }
}


export type Actions = (
    | setKeywordAction
    | historyAppendAction
    | historyDeleteAction
    | setBeginAction
    | setEndAction
    | setTimeZoneAction
    );


const reducer = (state: State, action: Actions): State => {
    switch (action.type) {
        case "setKeyword":
            return {...state, keyword: action.payload.keyword};
        case "appendHistory":
            let newHistories = [action.payload.history, ...state.histories];
            if (newHistories.length > MAX_HISTORY) {
                newHistories.splice(-1, 1);
            }
            return {...state, histories: newHistories};
        case "deleteHistory":
            state.histories.splice(action.payload.index, 1);
            return {...state, histories: [...state.histories]};
        case "setBegin":
            return {...state, begin: action.payload.begin};
        case "setEnd":
            return {...state, end: action.payload.end};
        case "setTimeZone":
            return {...state, timeZone: action.payload.timeZone};
    }
};


export const useReducerWithLocalStorage = (initializerArg: State): [State, Dispatch<ReducerAction<Reducer<State, Actions>>>] => {
    const localStorageKey = "histories";
    const [state, dispatch] = useReducer(reducer, initializerArg, (initializeArg) => {
        if (typeof localStorage !== "undefined") {
            const item = localStorage.getItem(localStorageKey);
            if (item) {
                const histories: Array<history> = JSON.parse(item);
                return { ...initializeArg, histories: histories };
            } else {
                return initializeArg
            }
        } else {
            return initializeArg;
        }
    });

    useEffect(() => {
        localStorage.setItem(localStorageKey, JSON.stringify(state.histories));
    });

    return [state, dispatch]
};
