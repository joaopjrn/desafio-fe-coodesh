import { Injectable } from "@angular/core";
import { createEffect, ofType, Actions } from "@ngrx/effects";
import { mergeMap, map, exhaustMap, concatMap } from "rxjs";
import { Gender } from "src/app/modelos/myEnums";
import { Patient } from "src/app/modelos/Patient";
import { AppService } from "src/app/services/app.service";
import * as fromTable from '../table/table.actions';
import * as fromApi from './api.actions';

@Injectable()
export class ApiEffects {
  constructor(private appSvc: AppService, private actions$: Actions) { }

  loadPatients$ = createEffect(() => {
    return this.actions$.pipe(
      ofType(fromTable.loadPatients),
      mergeMap(() => {
        return this.appSvc
          .getPatients()
          .pipe(
            map((data) => {
              return fromApi.dataLoaded({
                results: data.results.map((item: any, i) => {
                  return <Patient>{
                    apiIndex: 0,
                    name: `${item.name.first} ${item.name.last}`,
                    pictureUrl: item.picture.large,
                    email: item.email,
                    gender: item.gender === 'female' ? Gender.Female : Gender.Male,
                    dob: { date: new Date(item.dob.date), age: item.dob.age },
                    phone: item.phone,
                    country: item.location.country,
                    address: `${item.location.street.name}, ${item.location.street.number} - ${item.location.city} / ${item.location.state}`,
                    id: item.login.uuid,
                    url: ''
                    // url: window.location.origin + "/" + this.tablePage + "/patient/" + item.login.uuid
                  }
                })
              });
            })
          );
      })
    );
  });
}