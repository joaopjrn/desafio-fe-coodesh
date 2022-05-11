import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Observable, Subscription, map } from 'rxjs';
import { Patient } from 'src/app/modelos/Patient';
import { AppService } from 'src/app/services/app.service';

//NGRX
import { Store } from '@ngrx/store';
import { Direction } from 'src/app/modelos/myEnums';
import * as fromRoot from '../../ngrx/app.reducer';
import * as fromTable from '../../ngrx/table/table.actions';


@Component({
  selector: 'app-tabela',
  templateUrl: './tabela.component.html',
  styleUrls: ['./tabela.component.css']
})
export class TabelaComponent implements OnInit {
  patients$: Observable<Patient[]>;
  page$: Observable<number>;
  order: number = 0;

  constructor(
    private store: Store<fromRoot.AppState>,
    private appSvc: AppService,
    private route: ActivatedRoute,
    private router: Router
  ) { }

  ngOnInit(): void {
    this.store.dispatch(fromTable.setCurrentPage({page: this.route.snapshot.params['page']}));
    this.store.dispatch(fromTable.loadPatients());
    this.patients$ = this.store.select(fromRoot.selectPatients);
    this.page$ = this.store.select(fromRoot.selectTablePage);

    // this.patients = this.store.select('appStore');
    // this.isLoading = true;
    // this.appSvc.setTablePage(+this.route.snapshot.params['page']);
    // this.patientsListener = this.appSvc.getSubPatients().subscribe(res => {
    //   if (res) {
    //     this.patients = this.appSvc.getPatientsPage();
    //   }
    // });

    // this.appSvc.getPatients();

    // this.isLoadingListener = this.appSvc.getSubIsLoading().subscribe(res => {
    //   this.isLoading = res;
    // });

  }

  nextPage() {
    this.appSvc.setTablePage(+this.route.snapshot.params['page'] + 1);
    this.router.navigate([this.appSvc.getTablePage()]);
    // this.appSvc.getPatients(Direction.Forward);
  }
  prevPage() {
    if (this.appSvc.getTablePage() > 1) {
      this.appSvc.setTablePage(+this.route.snapshot.params['page'] - 1);
      this.router.navigate([this.appSvc.getTablePage()]);
      // this.appSvc.getPatients(Direction.Backwards);
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