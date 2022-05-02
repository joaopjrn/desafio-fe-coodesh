import { NgModule } from "@angular/core";
import { RouterModule, Routes } from "@angular/router";
import { AppComponent } from "./app.component";
import { ModalComponent } from "./componentes/modal/modal.component";
import { TabelaComponent } from "./componentes/tabela/tabela.component";
import { PatientGuard } from "./patient-guard";

const routes: Routes = [
  { path: '', redirectTo: '1', pathMatch: 'full' },
  { path: ':page', component: TabelaComponent, canActivateChild: [PatientGuard], children: [
    { path: 'patient/:id', component: ModalComponent}
  ] }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})

export class AppRoutingModule {


}