import { NgModule } from "@angular/core";
import { RouterModule, Routes } from "@angular/router";
import { HomeComponent } from "./componentes/home/home.component";
import { ModalComponent } from "./componentes/modal/modal.component";
import { PatientGuard } from "./patient-guard";

const routes: Routes = [
  {
    path: '', component: HomeComponent, canActivateChild: [PatientGuard], children: [
      { path: 'patient/:id', component: ModalComponent }
    ]
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})

export class AppRoutingModule {


}