import { Action, createReducer, on } from "@ngrx/store";
import { Gender } from "src/app/modelos/myEnums";
import * as fromFilters from './filter.actions';

export interface State {
  searchTerm: string;
  country: string;
  gender: Gender
}

const initialState: State = {
  searchTerm: '',
  country: '',
  gender: Gender.Null
}

const filterReducer = createReducer(
  initialState,
  on(fromFilters.updateSearchTerm, (state, action) => {
    return {
      ...state,
      searchTerm: action.searchTerm
    }
  }),
  on(fromFilters.updateCountry, (state, action) => {
    return {
      ...state,
      country: action.country
    }
  }),
  on(fromFilters.updateGender, (state, action) => {
    return {
      ...state,
      gender: action.gender
    }
  }),
  on(fromFilters.clearFilters, (state, action) => {
    return initialState;
  }),
);

export const selectFilters = (state: State) => ({searchTerm: state.searchTerm, country: state.country, gender: state.gender});

export function reducer(state: State | undefined, action: Action) {
  return filterReducer(state, action);
}