import { Location } from '@angular/common';
import { Component, ElementRef, HostListener, OnInit, Renderer2 } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Observable, Subscription } from 'rxjs';
import { Patient } from 'src/app/modelos/Patient';
import { AppService } from 'src/app/services/app.service';
import {map} from 'rxjs/operators';

//NGRX

@Component({
  selector: 'app-modal',
  templateUrl: './modal.component.html',
  styleUrls: ['./modal.component.css']
})
export class ModalComponent implements OnInit {

  patientsListener: Subscription;
  isLoading: boolean = true;
  showAlert: boolean = false;
  
  constructor(private router: Router, private route: ActivatedRoute, private appSvc: AppService, private location: Location) { }

  patient: Patient;
  
  ngOnInit(): void {
    if(this.appSvc.getPatientsLoaded()){
      this.isLoading = false;
      this.patient = this.appSvc.getPatient(this.route.snapshot.params['id']);
    }
    this.patientsListener = this.appSvc.getSubPatients().subscribe(res => {
      if(res){
        this.isLoading = false;
        this.patient = this.appSvc.getPatient(this.route.snapshot.params['id']);
      }
    });
  }
  
  @HostListener('click', ['$event.target'])
  onClick(target: HTMLElement) {
    if(target.id == "modalBackdrop" || target.id == 'closeModal'){
      // this.location.back();
      this.router.navigate(["../.."], {relativeTo: this.route});
    }
  }

  copyLink(){
    navigator.clipboard.writeText(this.patient.url);
    this.showAlert = true;
    setTimeout(() => {
      this.showAlert = false;
    }, 2000);
  }


}
