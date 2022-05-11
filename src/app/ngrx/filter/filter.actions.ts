import { createAction, props } from "@ngrx/store";
import { Gender } from "src/app/modelos/myEnums";

const actionString = (ev) => `[Filters] ${ev}`;

export const updateSearchTerm = createAction(
  actionString('Update Search Term'),
  props<{ searchTerm: string }>()
);

export const updateCountry = createAction(
  actionString('Update Country'),
  props<{ country: string }>()
);

export const updateGender = createAction(
  actionString('Update Gender'),
  props<{ gender: Gender }>()
);

export const clearFilters = createAction(
  actionString('Clear Filters')
);