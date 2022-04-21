import { Component, OnInit } from '@angular/core';
import { Store } from '@ngrx/store';
import { Observable } from 'rxjs';

@Component({
  selector: '[app-tabela]',
  templateUrl: './tabela.component.html',
  styleUrls: ['./tabela.component.css']
})
export class TabelaComponent implements OnInit {
  patients: Observable<{ patients: { name: string; gender: string; dob: string; id: string; }[];
  }>;

  constructor(
    private store: Store<{ patientsStore: { patients: { name: string, gender: string, dob: string, id: string }[] } }>
  ) { }


  ngOnInit(): void {
    this.patients = this.store.select('patientsStore');
  }

}