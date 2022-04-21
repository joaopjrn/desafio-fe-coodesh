import { Action } from "@ngrx/store";

export const GET_PATIENTS = "GET_PATIENTS";

export class GetPatients implements Action {
  readonly type: string = GET_PATIENTS;
  data: {};
}