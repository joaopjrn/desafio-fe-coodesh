import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-modal',
  templateUrl: './modal.component.html',
  styleUrls: ['./modal.component.css']
})
export class ModalComponent implements OnInit {
  open = false;
  classes = "modal fade";

  constructor() { }

  ngOnInit(): void {
    // setTimeout(() => {
    //   this.toggleModal();
    // }, 2000);
  }

  toggleModal() {
    this.open = !this.open;

    if (this.open) {
      this.classes = "modal fade show"
    } else {
      this.classes = "modal fade";
    }
  }

}
