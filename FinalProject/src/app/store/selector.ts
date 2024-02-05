import {createFeatureSelector, createSelector} from '@ngrx/store';
import { State } from './reducer';

const getState = createFeatureSelector<State>('state');

export const getObjects = createSelector(getState, (state) => state.sObject);
export const getFields = createSelector(getState, (state) => state.fields);
export const getRecords = createSelector(getState, (state) => state.records);