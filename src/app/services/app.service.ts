import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Store } from '@ngrx/store';
import { filter, Subject } from 'rxjs';
import { Gender, SortOrder } from '../modelos/myEnums';
import { filterPatients, Patient } from '../modelos/Patient';
import { SearchFilters } from '../modelos/SearchFilters';
import * as fromApp from '../ngrx/app.reducer';

@Injectable({
  providedIn: 'root'
})
export class AppService {

  constructor(private store: Store<{ appStore: fromApp.State }>, private http: HttpClient) { }

  private patients: Patient[] = [];
  private patientsLoaded: boolean = false;
  private filteringPatients: Patient[] = [];
  private patientsPage: Patient[] = [];
  private countries: string[] = [];
  private isLoading: boolean = true;
  private filters: SearchFilters = {
    country: '',
    gender: Gender.Null,
    searchTerm: ''
  };

  private tablePage: number;
  private pageSize: number = 10;

  private sortOrder: SortOrder = SortOrder.Original;

  // ██████   █████  ████████ ██ ███████ ███    ██ ████████ ███████ 
  // ██   ██ ██   ██    ██    ██ ██      ████   ██    ██    ██      
  // ██████  ███████    ██    ██ █████   ██ ██  ██    ██    ███████ 
  // ██      ██   ██    ██    ██ ██      ██  ██ ██    ██         ██ 
  // ██      ██   ██    ██    ██ ███████ ██   ████    ██    ███████

  getPatients(direction: (string | null) = null) {
    let getFromApi = false;
    let apiPage: number = Math.ceil((this.tablePage * this.pageSize) / 50);
    console.log(apiPage);
    // let apiPage: number = (this.patients.length / 50) + 1;
    if (this.patients.length < 1) {//no patients locally
      getFromApi = true;
      // apiPage = 1;
    } else {                       //patients locally
      this.setPatientsPage();
      if (this.patientsPage.length >= this.pageSize) { //enough local patients
        getFromApi = false;
        this.subPatients.next(true);
      } else {                             //not enough local patients
        getFromApi = true;
        // apiPage = (this.patients.length / 50) + 1;
      }
    }
    if (getFromApi) {
      this.isLoading = true;
      this.subIsLoading.next(true);
      this.http.get<{ results: any[] }>(`https://randomuser.me/api/?results=50&page=${apiPage}&seed=coodesh`).subscribe(res => {
        this.setPatients(direction, res.results.map((item, i) => {
          if (!this.countries.includes(item.location.country)) {
            this.countries.push(item.location.country);
            this.countries.sort((a, b) => a <= b ? -1 : 1);
          }
          return <Patient>{
            apiIndex: i + ((apiPage - 1) * 50),
            name: `${item.name.first} ${item.name.last}`,
            pictureUrl: item.picture.large,
            email: item.email,
            gender: item.gender === 'female' ? Gender.Female : Gender.Male,
            dob: { date: new Date(item.dob.date), age: item.dob.age },
            phone: item.phone,
            country: item.location.country,
            address: `${item.location.street.name}, ${item.location.street.number} - ${item.location.city} / ${item.location.state}`,
            id: item.login.uuid,
            url: window.location.origin + "/" + this.tablePage + "/patient/" + item.login.uuid
          }
        }));
        console.log(this.patients);
        console.log(this.countries);
        this.setPatientsPage();
        this.patientsLoaded = true;
        this.subPatients.next(true);
        this.isLoading = false;
        this.subIsLoading.next(false);
      });
    }
  }

  getPatient(id: string) {
    let selectedPatient: Patient;
    this.patients.some(patient => {
      if (patient.id === id) {
        selectedPatient = patient;
        return true;
      }
      return false;
    });
    return selectedPatient;
  }

  setPatients(direction: string, newPatients: Patient[]) {
    if (!direction) {
      console.log('sem dir')
      this.patients = [...newPatients];
      this.filteringPatients = [...this.patients];
    } else if (direction === 'fwd') {
      this.patients = [...this.patients, ...newPatients];
      this.filteringPatients = [...this.patients];
    } else if (direction === 'bwd') {
      this.patients = [...newPatients, ...this.patients];
      this.filteringPatients = [...this.patients];
    }
  }

  switchSortOrder() {
    switch (this.sortOrder) {
      case SortOrder.Original:
        this.sortOrder = SortOrder.Alphabetical;
        break;
      case SortOrder.Alphabetical:
        this.sortOrder = SortOrder.ReverseAlphabetical;
        break;
      case SortOrder.ReverseAlphabetical:
        this.sortOrder = SortOrder.Original;
        break;
      default:
        this.sortOrder = SortOrder.Original;
        break;
    }
    this.subPatients.next(true);
  }

  // ██████   █████   ██████  ███████ 
  // ██   ██ ██   ██ ██       ██      
  // ██████  ███████ ██   ███ █████   
  // ██      ██   ██ ██    ██ ██      
  // ██      ██   ██  ██████  ███████

  setTablePage(page: number) {
    this.tablePage = page;
  }

  getTablePage() {
    return this.tablePage;
  }

  getPageSize() {
    return this.pageSize;
  }

  getPatientsPage() {
    return [...this.patientsPage].sort((a: Patient, b: Patient): number => {
      switch (this.sortOrder) {
        case SortOrder.Original:
          return 0;
        case SortOrder.Alphabetical:
          if (a.name < b.name) {
            return -1;
          } else {
            return 1;
          }
        case SortOrder.ReverseAlphabetical:
          if (a.name > b.name) {
            return -1;
          } else {
            return 1;
          }
        default:
          return 0;
      }
    });
  }

  private setPatientsPage() {
    let startIndex = this.tablePage <= 1 ? 0 : ((this.tablePage - 1) * this.pageSize);
    let endIndex = (startIndex + this.pageSize) - 1;
    this.patientsPage = this.patients.filter(patient => {
      return patient.apiIndex >= startIndex && patient.apiIndex <= endIndex;
    });
    this.subPatients.next(true);
  }

  // ███████ ██ ██      ████████ ███████ ██████  ███████ 
  // ██      ██ ██         ██    ██      ██   ██ ██      
  // █████   ██ ██         ██    █████   ██████  ███████ 
  // ██      ██ ██         ██    ██      ██   ██      ██ 
  // ██      ██ ███████    ██    ███████ ██   ██ ███████

  filterPatients() {
    this.patients = filterPatients(this.filteringPatients, this.filters);
    console.log(this.patients);
    if (this.filters.country === '' && this.filters.gender === 0 && this.filters.searchTerm === '') {

      this.setPatientsPage();
    } else {
      console.log('???')
      this.setPatientsPageFiltered();
    }
  }

  setFilters(gender: string, country: string, searchStr: string) {
    this.filters = {
      searchTerm: searchStr,
      gender: gender == '0' ? Gender.Null : gender == '1' ? Gender.Male : Gender.Female,
      country: country,
    }
  }

  private setPatientsPageFiltered() {
    this.patientsPage = [...this.patients];
    this.subPatients.next(true);
  }

  getFilters() {
    return { ...this.filters };
  }

  filtersApplied() {
    return !(this.filters.country === '' && this.filters.gender === Gender.Null && this.filters.searchTerm === '');
  }


  //  ██████  ██████  ███████ ███████ ██████  ██    ██  █████  ██████  ██      ███████ ███████ 
  // ██    ██ ██   ██ ██      ██      ██   ██ ██    ██ ██   ██ ██   ██ ██      ██      ██      
  // ██    ██ ██████  ███████ █████   ██████  ██    ██ ███████ ██████  ██      █████   ███████ 
  // ██    ██ ██   ██      ██ ██      ██   ██  ██  ██  ██   ██ ██   ██ ██      ██           ██ 
  //  ██████  ██████  ███████ ███████ ██   ██   ████   ██   ██ ██████  ███████ ███████ ███████

  private subPatients = new Subject<boolean>();
  private subIsLoading = new Subject<boolean>();

  getSubPatients() {
    return this.subPatients.asObservable();
  }

  getSubIsLoading() {
    return this.subIsLoading.asObservable();
  }

  getIsLoading() {
    return this.isLoading;
  }

  getPatientsLoaded() {
    return this.patientsLoaded;
  }

  //  ██████  ████████ ██   ██ ███████ ██████  ███████ 
  // ██    ██    ██    ██   ██ ██      ██   ██ ██      
  // ██    ██    ██    ███████ █████   ██████  ███████ 
  // ██    ██    ██    ██   ██ ██      ██   ██      ██ 
  //  ██████     ██    ██   ██ ███████ ██   ██ ███████

  getCountries() {
    return [...this.countries];
  }

  //  ██████  ███████ ████████ ████████ ███████ ██████  ███████ 
  // ██       ██         ██       ██    ██      ██   ██ ██      
  // ██   ███ █████      ██       ██    █████   ██████  ███████ 
  // ██    ██ ██         ██       ██    ██      ██   ██      ██ 
  //  ██████  ███████    ██       ██    ███████ ██   ██ ███████

  // ███████ ███████ ████████ ████████ ███████ ██████  ███████ 
  // ██      ██         ██       ██    ██      ██   ██ ██      
  // ███████ █████      ██       ██    █████   ██████  ███████ 
  //      ██ ██         ██       ██    ██      ██   ██      ██ 
  // ███████ ███████    ██       ██    ███████ ██   ██ ███████ 


}