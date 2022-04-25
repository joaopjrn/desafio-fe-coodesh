import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Store } from '@ngrx/store';
import { Subject } from 'rxjs';
import { Patient } from '../modelos/Patient';
import * as fromApp from '../ngrx/app.reducer';

@Injectable({
  providedIn: 'root'
})
export class AppService {

  constructor(private store: Store<{ appStore: fromApp.State }>, private http: HttpClient) { }

  private patients: Patient[] = [];
  private patientsPage: Patient[] = [];
  private isLoading: boolean;
  private page: number = 1;

  private subPatients = new Subject<boolean>();
  private subIsLoading = new Subject<boolean>();

  getPatients(tablePage: number, pageSize: number, direction: (string | null) = null) {
    let getFromApi = false;
    let apiPage: number = Math.ceil((tablePage * pageSize) / 50);
    console.log(apiPage);
    // let apiPage: number = (this.patients.length / 50) + 1;
    if (this.patients.length < 1) {//no patients locally
      getFromApi = true;
      // apiPage = 1;
    } else {                       //patients locally
      this.setPatientsPage(tablePage, pageSize);
      if (this.patientsPage.length >= pageSize) { //enough local patients
        getFromApi = false;
        this.subPatients.next(true);
      } else {                             //not enough local patients
        getFromApi = true;
        // apiPage = (this.patients.length / 50) + 1;
      }
    }
    if(getFromApi){
      this.subIsLoading.next(true);
      this.http.get<{ results: any[] }>(`https://randomuser.me/api/?results=50&page=${apiPage}&seed=coodesh`).subscribe(res => {
        this.setPatients(direction, res.results.map((item, i) => {
          return <Patient>{
            apiIndex: i + ((apiPage - 1) * 50),
            name: `${item.name.first} ${item.name.last}`,
            pictureUrl: item.picture.large,
            email: item.email,
            gender: item.gender,
            dob: { date: new Date(item.dob.date), age: item.dob.age },
            phone: item.phone,
            country: item.location.country,
            address: `${item.location.street.name}, ${item.location.street.number} - ${item.location.city} / ${item.location.state}`,
            id: item.login.uuid,
            url: ''
          }
        }));
        console.log(this.patients);
        this.setPatientsPage(tablePage, pageSize);
        this.subPatients.next(true);
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

  public getSubPatients() {
    return this.subPatients.asObservable();
  }

  public getSubIsLoading() {
    return this.subIsLoading.asObservable();
  }

  public getPage() {
    return this.page;
  }

  public getPatientsPage() {
    return [...this.patientsPage];
  }

  setPatientsPage(tablePage: number, pageSize: number){
    let startIndex = tablePage <= 1 ? 0 : ((tablePage - 1) * pageSize);
    let endIndex = (startIndex + pageSize) - 1;
    this.patientsPage = this.patients.filter(patient => {
      return patient.apiIndex >= startIndex && patient.apiIndex <= endIndex;
    });
  }

  setPatients(direction: string, newPatients: Patient[]){
    if(!direction){
      console.log('sem dir')
      this.patients = [...newPatients];
    }else if(direction === 'fwd'){
      this.patients = [...this.patients, ...newPatients];
    }else if(direction === 'bwd'){
      this.patients = [...newPatients, ...this.patients];
    }
  }
}