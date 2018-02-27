import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { ServicioService } from './servicio.service';
import { RouterModule, Routes } from '@angular/router';
import { FormsModule } from '@angular/forms';

import { AppComponent } from './app.component';
import { InicioComponent } from './inicio/inicio.component';
import { MenuComponent } from './menu/menu.component';
import { ChatGeneralComponent } from './chat-general/chat-general.component';
import { RuletaComponent } from './ruleta/ruleta.component';
import { ChatSalaComponent } from './chat-sala/chat-sala.component';

const routes: Routes = [
  {path: '', component: InicioComponent},
  {path: 'menu', component: MenuComponent},
  {path: 'menu/ruleta', component: RuletaComponent},
  {path: '**', component: InicioComponent}
]

@NgModule({
  declarations: [
    AppComponent,
    InicioComponent,
    MenuComponent,
    ChatGeneralComponent,
    RuletaComponent,
    ChatSalaComponent
  ],
  imports: [
    BrowserModule,
    FormsModule,
    RouterModule.forRoot(routes)
  ],
  providers: [ServicioService],
  bootstrap: [AppComponent]
})
export class AppModule { }
