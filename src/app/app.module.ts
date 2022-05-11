import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppComponent } from './app.component';
import { NavbarComponent } from './componentes/navbar/navbar.component';
import { BuscaComponent } from './componentes/busca/busca.component';
import { TabelaComponent } from './componentes/tabela/tabela.component';
import { ModalComponent } from './componentes/modal/modal.component';
import { LinhaTabelaComponent } from './componentes/tabela/linha-tabela/linha-tabela.component';
import { AppRoutingModule } from './app-routing.module';

import { HttpClientModule } from '@angular/common/http';
import { FormsModule } from '@angular/forms';
import { ModalAlertComponent } from './componentes/modal/modal-alert/modal-alert.component';

//NGRX
import { StoreModule } from '@ngrx/store';
import { EffectsModule } from '@ngrx/effects';
import { ApiEffects } from './ngrx/api/api.effects';
import { appReducer } from './ngrx/app.reducer';
import { StoreRouterConnectingModule } from '@ngrx/router-store';


@NgModule({
  declarations: [
    AppComponent,
    NavbarComponent,
    BuscaComponent,
    TabelaComponent,
    ModalComponent,
    LinhaTabelaComponent,
    ModalAlertComponent,
  ],
  imports: [
    BrowserModule,
    FormsModule,
    AppRoutingModule,
    StoreModule.forRoot(appReducer),
    EffectsModule.forRoot([ApiEffects]),
    StoreRouterConnectingModule.forRoot(),
    HttpClientModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
