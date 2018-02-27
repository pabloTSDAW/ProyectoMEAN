import { Component, OnInit, OnDestroy } from '@angular/core';
import { ServicioService } from '../servicio.service';

@Component({
  selector: 'app-chat-sala',
  templateUrl: './chat-sala.component.html',
  styleUrls: ['./chat-sala.component.css']
})
export class ChatSalaComponent implements OnInit, OnDestroy {
  msj;
  lista=[];
  nick;
  sala;

  suscripcion1;
  suscripcion2;

  constructor(private _ServicioService: ServicioService) { }

  ngOnInit() {
    this.nick = this._ServicioService.nombre;
    this.suscripcion1 = this._ServicioService.getSala().subscribe(data=>{
      this.sala = data;
    });
    this.suscripcion2 = this._ServicioService.getMessageSala().subscribe(data=>{
      this.lista.push(data);
    });
  }

  ngOnDestroy(){
    this.suscripcion1.unsubscribe();
    this.suscripcion2.unsubscribe();
  }

  enviarMensaje(){
    this._ServicioService.sendMessageSala({nombre: this.nick, mensaje: this.msj});
    this.msj = "";
  }

}
