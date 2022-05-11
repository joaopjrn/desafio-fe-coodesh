import { Action, createReducer, on } from "@ngrx/store";
import * as fromTable from './table.actions';
import * as fromFilters from '../filter/filter.actions';
import { Patient } from "src/app/modelos/Patient";
import { Gender } from "src/app/modelos/myEnums";
import * as fromApi from '../api/api.actions';
import { routerNavigatedAction, routerNavigationAction } from "@ngrx/router-store";


export interface State {
  allPatients: Patient[];
  currPageNumber: number | null;
  loading: boolean;
}

export const initialState: State = {
  allPatients: [],
  currPageNumber: null,
  loading: true
}

const tableReducer = createReducer(
  initialState,
  on(fromApi.dataLoaded, (state, action) => {
    return {
      ...state,
      allPatients: action.results
    }
  }),
  on(routerNavigatedAction, (state, action) => {
    console.log(state)
    return {
      ...state,
      currPageNumber: +action.payload.routerState.root.firstChild.params['page']
    };
  })
  // on(fromTable.prevPage, (state, action) => {
  //   return {

  //   }
  // }),
  // on(fromTable.nextPage, (state, action) => {
  //   return {

  //   }
  // }),
  // on(
  //   fromFilters.updateSearchTerm, 
  //   fromFilters.updateCountry, 
  //   fromFilters.updateGender, 
  //   (state, action: {type: string, searchTerm: string, country: string, gender: Gender}) => {
  //   return {
  //     ...state,
  //     allPatients: action.
  //   }
  // })
);

const filterPatients = (searchTerm: string, country: string, gender: Gender, patients: Patient[]) => {
  return patients.filter(patient => (
    patient.name.toLowerCase().includes(searchTerm) ||
    patient.country === country ||
    patient.gender === gender)
  );
}

const mapPatients = (patientsData: {}[]) => {
  return patientsData.map((item:any, i) => {
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
  });
}

export function reducer(state: State | undefined, action: Action) {
  return tableReducer(state, action);
}

