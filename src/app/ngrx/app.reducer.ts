import { ActionReducerMap, createFeatureSelector, createSelector } from '@ngrx/store';

import * as fromTable from './table/table.reducer';
import * as fromFilters from './filter/filter.reducer';
import { routerReducer, RouterReducerState, RouterState } from '@ngrx/router-store';

export interface AppState {
  router: RouterReducerState,
  table: fromTable.State
  filters: fromFilters.State
}

export const appReducer: ActionReducerMap<AppState> = {
  router: routerReducer,
  table: fromTable.reducer,
  filters: fromFilters.reducer
};

export const selectFiltersState = (state: AppState) => state.filters;
export const selectTableState = (state: AppState) => state.table;
export const selectRouterState = (state: AppState) => state.router;

export const selectFilters = createSelector(
  selectFiltersState,
  (filtersState: fromFilters.State) => ({searchTerm: filtersState.searchTerm, country: filtersState.country, gender: filtersState.gender})
);

export const selectPatients = createSelector(
  selectTableState,
  (tableState: fromTable.State) => tableState.allPatients
);

export const selectTableStatus = createSelector(
  selectTableState,
  (tableState: fromTable.State) => tableState.loading
);

export const selectTablePage = createSelector(
  selectTableState,
  (tableState: fromTable.State) => tableState.currPageNumber
);

export const selectRouteParams = createSelector(
  selectRouterState,
  (routerState: RouterReducerState) => routerState.state.root.params
);