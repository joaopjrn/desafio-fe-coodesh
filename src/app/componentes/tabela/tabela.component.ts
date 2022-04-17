import { Component, OnInit } from '@angular/core';

@Component({
  selector: '[app-tabela]',
  templateUrl: './tabela.component.html',
  styleUrls: ['./tabela.component.css']
})
export class TabelaComponent implements OnInit {
  pacientes = [
    {name: "Mark", gender: "male", dob: "24/05/1975", id: "123456"},
    {name: "Mark", gender: "male", dob: "24/05/1975", id: "123456"},
    {name: "Mark", gender: "male", dob: "24/05/1975", id: "123456"},
    {name: "Mark", gender: "male", dob: "24/05/1975", id: "123456"},
    {name: "Mark", gender: "male", dob: "24/05/1975", id: "123456"},
    {name: "Mark", gender: "male", dob: "24/05/1975", id: "123456"},
    {name: "Mark", gender: "male", dob: "24/05/1975", id: "123456"},
    {name: "Mark", gender: "male", dob: "24/05/1975", id: "123456"},
    {name: "Mark", gender: "male", dob: "24/05/1975", id: "123456"},
    {name: "Mark", gender: "male", dob: "24/05/1975", id: "123456"},
    {name: "Mark", gender: "male", dob: "24/05/1975", id: "123456"},
    {name: "Mark", gender: "male", dob: "24/05/1975", id: "123456"},
    {name: "Mark", gender: "male", dob: "24/05/1975", id: "123456"},
    {name: "Mark", gender: "male", dob: "24/05/1975", id: "123456"},
    {name: "Mark", gender: "male", dob: "24/05/1975", id: "123456"},
    {name: "Mark", gender: "male", dob: "24/05/1975", id: "123456"},
  ];
  constructor() { }

  ngOnInit(): void {
  }

}
