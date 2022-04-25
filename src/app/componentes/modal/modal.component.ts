import { Location } from '@angular/common';
import { Component, ElementRef, HostListener, OnInit, Renderer2 } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Patient } from 'src/app/modelos/Patient';
import { AppService } from 'src/app/services/app.service';

@Component({
  selector: 'app-modal',
  templateUrl: './modal.component.html',
  styleUrls: ['./modal.component.css']
})
export class ModalComponent implements OnInit {
  
  constructor(private router: Router, private route: ActivatedRoute, private appSvc: AppService, private location: Location) { }

  patient: Patient;
  
  ngOnInit(): void {
    this.patient = this.appSvc.getPatient(this.route.snapshot.params['id']);
  }
  
  @HostListener('click', ['$event.target'])
  onClick(target: HTMLElement) {
    if(target.id == "modalBackdrop" || target.id == 'closeModal'){
      this.location.back();
    }
  }


}
