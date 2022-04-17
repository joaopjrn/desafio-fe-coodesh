import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppComponent } from './app.component';
import { NavbarComponent } from './componentes/navbar/navbar.component';
import { BuscaComponent } from './componentes/busca/busca.component';
import { TabelaComponent } from './componentes/tabela/tabela.component';
import { ModalComponent } from './componentes/modal/modal.component';
import { BackdropComponent } from './componentes/modal/backdrop/backdrop.component';
import { LinhaTabelaComponent } from './componentes/tabela/linha-tabela/linha-tabela.component';

@NgModule({
  declarations: [
    AppComponent,
    NavbarComponent,
    BuscaComponent,
    TabelaComponent,
    ModalComponent,
    BackdropComponent,
    LinhaTabelaComponent,
  ],
  imports: [
    BrowserModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
