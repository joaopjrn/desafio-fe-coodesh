import { Component, ElementRef, HostListener, OnInit, Renderer2 } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-modal',
  templateUrl: './modal.component.html',
  styleUrls: ['./modal.component.css']
})
export class ModalComponent implements OnInit {
  
  constructor(private router: Router) { }
  
  ngOnInit(): void {

  }
  
  @HostListener('click', ['$event.target'])
  onClick(target: HTMLElement) {
    // if(target.id == "exampleModal" || target.id == 'closeModal'){
    //   this.router.navigate(['/']);
    // }
    console.log(target);
  }


}
