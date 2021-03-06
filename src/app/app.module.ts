import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppComponent } from './app.component';
import { NavbarComponent } from './componentes/navbar/navbar.component';
import { BuscaComponent } from './componentes/busca/busca.component';
import { TabelaComponent } from './componentes/tabela/tabela.component';
import { ModalComponent } from './componentes/modal/modal.component';
import { LinhaTabelaComponent } from './componentes/tabela/linha-tabela/linha-tabela.component';
import { AppRoutingModule } from './app-routing.module';

import { StoreModule } from '@ngrx/store';
import { appReducer } from './ngrx/app.reducer';
import { HttpClientModule } from '@angular/common/http';

@NgModule({
  declarations: [
    AppComponent,
    NavbarComponent,
    BuscaComponent,
    TabelaComponent,
    ModalComponent,
    LinhaTabelaComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    StoreModule.forRoot({appStore: appReducer}),
    HttpClientModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
