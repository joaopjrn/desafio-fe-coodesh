import * as PatientActions from "./patient.actions";

const initialState = {
  patients: <{name: string, gender: string, dob: string, id: string}[]>[
    {name: "Mark", gender: "male", dob: "24/05/1975", id: "123456"},
    {name: "Mark", gender: "male", dob: "24/05/1975", id: "123456"},
    {name: "Mark", gender: "male", dob: "24/05/1975", id: "123456"}
  ],

}

export function patientReducer(state = initialState, action: PatientActions.GetPatients){
  switch (action.type) {
    case PatientActions.GET_PATIENTS:
      return {
        ...state,
        patients: [...state.patients, action.data]
      }
  
    default:
      return state;
  }
}