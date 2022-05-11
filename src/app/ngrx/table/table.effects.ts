// import { Injectable } from "@angular/core";
// import { ActivatedRoute, ActivatedRouteSnapshot } from "@angular/router";
// import { createEffect, ofType, Actions } from "@ngrx/effects";
// import { mergeMap, map, exhaustMap, concatMap } from "rxjs";
// import { AppService } from "src/app/services/app.service";
// import * as fromTable from '../table/table.actions';
// import * as fromApi from './api.actions';

// @Injectable()
// export class TableEffects {
//   constructor(private appSvc: AppService, private actions$: Actions, private route: ActivatedRouteSnapshot) { }

//   setTablePage$ = createEffect(() => {
//     return this.actions$.pipe(
//       ofType(fromTable.),
//       mergeMap(() => {
//         return this.appSvc
//           .getPatients()
//           .pipe(map((data) => fromApi.dataLoaded({ results: data.results })));
//       })
//     );
//   });
// }