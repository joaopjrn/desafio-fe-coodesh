import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppComponent } from './app.component';
import { NavbarComponent } from './componentes/navbar/navbar.component';
import { BuscaComponent } from './componentes/busca/busca.component';
import { TabelaComponent } from './componentes/tabela/tabela.component';
import { ModalComponent } from './componentes/modal/modal.component';
import { LinhaTabelaComponent } from './componentes/tabela/linha-tabela/linha-tabela.component';
import { AppRoutingModule } from './app-routing.module';
import { HomeComponent } from './componentes/home/home.component';

import { StoreModule } from '@ngrx/store';
import { patientReducer } from './ngrx/patient.reducer';

@NgModule({
  declarations: [
    AppComponent,
    NavbarComponent,
    BuscaComponent,
    TabelaComponent,
    ModalComponent,
    LinhaTabelaComponent,
    HomeComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    StoreModule.forRoot({patientsStore: patientReducer})
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
