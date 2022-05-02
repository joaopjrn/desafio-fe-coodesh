import { Gender } from "./myEnums";
import { SearchFilters } from "./SearchFilters";

export interface Patient {
  apiIndex: number,
  name: string,
  pictureUrl: string,
  email: string,
  gender: Gender,
  dob: {date: Date, age: number},
  phone: string,
  country: string,
  address: string,
  id: string,
  url: string
}

export function filterPatients(arr: Patient[] ,filters: SearchFilters) : Patient[]{
  return arr.filter((patient: Patient) => {
    if(patient.name.toLowerCase().includes(filters.searchTerm.toLowerCase())){
      if((patient.gender === +filters.gender || +filters.gender === Gender.Null)
        && (patient.country === filters.country || filters.country === '')
        ){
        return true;
      }else{
        return false;
      }
    }else{
      return false;
    }
  });
}