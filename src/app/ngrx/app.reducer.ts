import * as PatientActions from "./patient.actions";

export interface State {
  isLoading: boolean,
  patients: {name: string, gender: string, dob: string, id: string}[]
}

const initialState: State = {
  isLoading: false,
  patients: [
    {name: "Mark", gender: "male", dob: "24/05/1975", id: "123456"},
    {name: "Mark", gender: "male", dob: "24/05/1975", id: "123456"},
    {name: "Mark", gender: "male", dob: "24/05/1975", id: "123456"}
  ],

}

export function appReducer(state = initialState, action: PatientActions.GetPatients){
  switch (action.type) {
    case 'START_LOADING':
      return {
        ...state,
        isLoading: true
      }
    case 'STOP_LOADING':
      return {
        ...state,
        isLoading: false
      }
    case PatientActions.GET_PATIENTS:
      return {
        ...state,
        patients: [...state.patients, action.data]
      }
  
    default:
      return state;
  }
}