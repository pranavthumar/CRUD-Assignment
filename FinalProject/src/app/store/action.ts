import {createAction, props } from '@ngrx/store';

export const getObjects = createAction('[Objects] Get Objects');
export const setObjects = createAction('[Objects] Set Objects', props<{ sObject: string[] }>());

export const getFields = createAction('[Objects] Get Fields', props<{ selectedObjects: string }>());
export const setFields = createAction('[Objects] Set Fields', props<{ fields: string[] }>());

export const getRecords = createAction('[Objects] Get Records', props<{ selectedObjectsName: string, selectedFields: string[] }>());
export const setRecords = createAction('[Objects] Set Records', props<{ records: any[] }>());

// export function loadObjectFields(loadObjectFields: any): import("rxjs").OperatorFunction<import("@ngrx/store").Action, any> {
//     throw new Error('Function not implemented.');
// }

