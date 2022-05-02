import { Component, OnInit } from '@angular/core';
import { Subscription } from 'rxjs';
import { Gender } from 'src/app/modelos/myEnums';
import { SearchFilters } from 'src/app/modelos/SearchFilters';
import { AppService } from 'src/app/services/app.service';

@Component({
  selector: '[app-busca]',
  templateUrl: './busca.component.html',
  styleUrls: ['./busca.component.css']
})
export class BuscaComponent implements OnInit {
  isLoading: boolean = true;
  searchStr: string = '';
  gender: string = '0';
  country: string = '';
  countries: string[] = [];

  isLoadingListener: Subscription;

  constructor(private appSvc: AppService) { }

  ngOnInit(): void {
    this.isLoadingListener = this.appSvc.getSubIsLoading().subscribe(res => {
      this.isLoading = res;
      this.countries = this.appSvc.getCountries();
    })
  }

  yo() {
    this.appSvc.setFilters(this.gender, this.country, this.searchStr);
    this.appSvc.filterPatients();
  }

  clearFilters() {
    this.searchStr = '';
    this.gender = '0';
    this.country = '';
    this.appSvc.setFilters(this.gender, this.country, this.searchStr);
    this.yo();
  }

  filtersApplied(){
    return this.appSvc.filtersApplied();
  }

}
