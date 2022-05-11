import { createAction, props } from "@ngrx/store";

const actionString = (ev) => `[Table] ${ev}`;

export const setCurrentPage = createAction(
  actionString('Set Table Current Page'),
  props<{page: number}>()
);

export const loadPatients = createAction(actionString('Load Patients'));
export const prevPage = createAction(actionString('Go To Previous Page'));
export const nextPage = createAction(actionString('Go To Next Page'));