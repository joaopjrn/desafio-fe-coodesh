import { Gender } from "./myEnums";

export interface SearchFilters {
  searchTerm: string,
  gender: Gender,
  country: string
}