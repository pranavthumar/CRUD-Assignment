import {on, createReducer} from '@ngrx/store';
import * as action from './action';

export interface State{
    sObject: string[];
    selectObject: string | null ;
    records: any[];
    fields: string[];
    selectedFileds: string[];

}

export const statingState: State = {
    sObject: [],
    selectObject: null ,
    selectedFileds: [],
    records : [],
    fields : [], 
};

export const reducer = createReducer(
    statingState,
    on(action.setObjects, (state, {sObject}) => ({...state, sObject})),
    on(action.setRecords, (state, {records}) => ({...state, records})),
    on(action.setFields, (state, {fields}) => ({...state, fields})),
);