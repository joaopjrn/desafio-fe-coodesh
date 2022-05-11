import { createAction, props } from "@ngrx/store";
import { Patient } from "src/app/modelos/Patient";

export const dataLoaded = createAction(
  '[API] Data Loaded Success',
  props<{results: Patient[]}>()
  );