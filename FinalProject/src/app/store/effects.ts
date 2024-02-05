import { Injectable } from '@angular/core';
import { Actions, ofType, createEffect } from '@ngrx/effects';
import { EMPTY, of } from 'rxjs';
import { mergeMap, map, catchError, withLatestFrom, filter } from 'rxjs/operators';
import * as Action from './action';
import { SalesforceService } from '../salesforce-service.service';
import { Store, select } from '@ngrx/store';
// import { consumerPollProducersForChange } from '@angular/core/primitives/signals';

@Injectable()
export class Effects{
    loadObjects$ = createEffect(() => this.action$.pipe(
        ofType(Action.getObjects),
        mergeMap(() => this.salesforceService.getAvailableObjects().pipe(
            map(data => Action.setObjects({ sObject : data.sobjects.map((objects: any) => objects.name) }))
        ))   
    ));

    loadObjectFields$ = createEffect(() => this.action$.pipe(
        ofType(Action.getFields),
        mergeMap(action => this.salesforceService.getObjectFields(action.selectedObjects).pipe(
            map(data => Action.setFields({ fields : data.fields}) ),
            catchError((error) => {
                console.log(error) 
                return EMPTY
            })
        ))
    ));

    loadRecords$ = createEffect(() => this.action$.pipe(
        ofType(Action.getRecords),
        mergeMap(action => this.salesforceService.getRecords(action.selectedObjectsName, action.selectedFields).pipe(
            map(data => Action.setRecords({ records : data.records}) ),
            catchError((error) => {
                console.log(error) 
                return EMPTY})
        ))
        ));


    constructor(private action$: Actions, private salesforceService: SalesforceService, private store: Store){}
}