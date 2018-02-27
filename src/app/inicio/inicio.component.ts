import { Component, OnInit } from '@angular/core';
import { ServicioService } from '../servicio.service';

@Component({
  selector: 'app-inicio',
  templateUrl: './inicio.component.html',
  styleUrls: ['./inicio.component.css']
})
export class InicioComponent implements OnInit {
  nick: string = "";

  constructor(private _ServicioService: ServicioService) { }

  ngOnInit() {
  }

  entrar() {
    if (this.nick == "") {
      this.nick = "Anonymous";
    }
    this._ServicioService.nombre = this.nick;
    this._ServicioService.sendUser(this.nick);
  }

}
