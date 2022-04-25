import { Component, Input, OnInit } from '@angular/core';
import { Patient } from 'src/app/modelos/Patient';
import { NavigationExtras, Router } from '@angular/router';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: '[app-linha-tabela]',
  templateUrl: './linha-tabela.component.html',
  styleUrls: ['./linha-tabela.component.css']
})
export class LinhaTabelaComponent implements OnInit {
  @Input() patient: Patient;
  constructor(private router: Router, private route: ActivatedRoute) { }

  ngOnInit(): void {
  }

  viewPatientInfo(patientId: string){
    this.router.navigate(['patient', patientId], {relativeTo: this.route});
  }

}