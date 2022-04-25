import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Store } from '@ngrx/store';
import { Observable, Subscription } from 'rxjs';
import { Patient } from 'src/app/modelos/Patient';
import { AppService } from 'src/app/services/app.service';

@Component({
  selector: 'app-tabela',
  templateUrl: './tabela.component.html',
  styleUrls: ['./tabela.component.css']
})
export class TabelaComponent implements OnInit {
  // patients: Observable<{ patients: { name: string; gender: string; dob: string; id: string; }[];}>;
  isLoading: boolean = true;
  patients: Patient[];
  pageSize: number = 10;
  page: number;
  patientsListener: Subscription;
  isLoadingListener: Subscription;

  constructor(
    private store: Store<{ appStore: { patients: { name: string, gender: string, dob: string, id: string }[] } }>,
    private appSvc: AppService,
    private route: ActivatedRoute,
    private router: Router
  ) { }


  ngOnInit(): void {
    // this.patients = this.store.select('appStore');
    this.isLoading = true;
    this.page = +this.route.snapshot.params['page'];
    this.patientsListener = this.appSvc.getSubPatients().subscribe(res => {
      if (res) {
        this.patients = this.appSvc.getPatientsPage();
        // console.log(this.patients);
      }
    });

    this.appSvc.getPatients(+this.route.snapshot.params['page'], this.pageSize);
    
    this.isLoadingListener = this.appSvc.getSubIsLoading().subscribe(res => {
      this.isLoading = res;
    });

  }

  nextPage() {
    this.page = +this.route.snapshot.params['page'] + 1;
    this.router.navigate([this.page]);
    this.appSvc.getPatients(this.page, this.pageSize, 'fwd');
  }
  prevPage() {
    if(this.page > 1){
      this.page = +this.route.snapshot.params['page'] - 1;
      this.router.navigate([this.page]);
      this.appSvc.getPatients(this.page, this.pageSize, 'bwd');
    }
  }

}