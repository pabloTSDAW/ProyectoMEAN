import { Component, OnInit, OnDestroy } from '@angular/core';
import { ServicioService } from '../servicio.service';

@Component({
  selector: 'app-chat-general',
  templateUrl: './chat-general.component.html',
  styleUrls: ['./chat-general.component.css']
})
export class ChatGeneralComponent implements OnInit, OnDestroy {
  msj;
  lista=[];
  nick;

  suscripcion;

  constructor(private _ServicioService: ServicioService) { }

  ngOnInit() {
    this.nick = this._ServicioService.nombre;
    this.suscripcion = this._ServicioService.getMessage().subscribe(data=>{
      this.lista.push(data);
    });
  }

  ngOnDestroy(){
    this.suscripcion.unsubscribe();
  }

  enviarMensaje(){
    this._ServicioService.sendMessage({nombre: this.nick, mensaje: this.msj});
    this.msj = "";
  }

}
