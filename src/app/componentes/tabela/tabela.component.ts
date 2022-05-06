import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Observable, Subscription } from 'rxjs';
import { Patient } from 'src/app/modelos/Patient';
import { AppService } from 'src/app/services/app.service';
import { map } from 'rxjs/operators';

//NGRX
import { Store } from '@ngrx/store';
import { Direction } from 'src/app/modelos/myEnums';


@Component({
  selector: 'app-tabela',
  templateUrl: './tabela.component.html',
  styleUrls: ['./tabela.component.css']
})
export class TabelaComponent implements OnInit {
  // patients: Observable<{ patients: { name: string; gender: string; dob: string; id: string; }[];}>;
  isLoading: boolean = true;
  patients: Patient[];
  page: number;
  patientsListener: Subscription;
  isLoadingListener: Subscription;
  order: number = 0;

  constructor(
    private appSvc: AppService,
    private route: ActivatedRoute,
    private router: Router
  ) { }


  ngOnInit(): void {
    // this.patients = this.store.select('appStore');
    this.isLoading = true;
    this.appSvc.setTablePage(+this.route.snapshot.params['page']);
    this.patientsListener = this.appSvc.getSubPatients().subscribe(res => {
      if (res) {
        this.patients = this.appSvc.getPatientsPage();
      }
    });

    this.appSvc.getPatients();

    this.isLoadingListener = this.appSvc.getSubIsLoading().subscribe(res => {
      this.isLoading = res;
    });

  }

  nextPage() {
    this.appSvc.setTablePage(+this.route.snapshot.params['page'] + 1);
    this.router.navigate([this.appSvc.getTablePage()]);
    this.appSvc.getPatients(Direction.Forward);
  }
  prevPage() {
    if (this.appSvc.getTablePage() > 1) {
      this.appSvc.setTablePage(+this.route.snapshot.params['page'] - 1);
      this.router.navigate([this.appSvc.getTablePage()]);
      this.appSvc.getPatients(Direction.Backwards);
    }
  }

  switchSortOrder() {
    this.appSvc.switchSortOrder();
  }

  getPage(){
    return this.appSvc.getTablePage();
  }

  filtersApplied(){
    return this.appSvc.filtersApplied();
  }

}