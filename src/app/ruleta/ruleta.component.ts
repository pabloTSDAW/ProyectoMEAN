import { Component, OnInit, OnDestroy } from '@angular/core';
import { ServicioService } from '../servicio.service';
declare var jquery: any;
declare var $: any;

@Component({
  selector: 'app-ruleta',
  templateUrl: './ruleta.component.html',
  styleUrls: ['./ruleta.component.css']
})
export class RuletaComponent implements OnInit, OnDestroy {
  sala;
  vasos;
  nick;
  jugador;
  rival;
  ganador;
  perdedor;
  puntos = 0;

  suscripcion1;
  suscripcion2;
  suscripcion3;
  suscripcion4;
  suscripcion5;
  suscripcion6;

  constructor(private _ServicioService:ServicioService) {}

  ngOnInit() {
    this.nick = this._ServicioService.nombre;
    $('.mensaje').hide();
    $('.info').hide();
    $('.resultado').hide();
    $('.maspuntos').hide();
    $('.final').hide();
    this.suscripcion1 = this._ServicioService.getSala().subscribe(data=>{
      this.sala = data;
    });
    this.suscripcion2 = this._ServicioService.getVasos().subscribe(data=>{
      this.vasos = data;
      $('.esperando').hide();
    });
    this.suscripcion3 = this._ServicioService.getJugadoresSala().subscribe(data=>{
      for(let elem of data){
        if (this.nick == elem.nombre) {
          this.jugador = elem;
          this.puntos = elem.puntos;
        }
        else this.rival = elem;
      }
      $('.info').hide();
    });
    this.suscripcion4 = this._ServicioService.getVasoElegido().subscribe(data=>{
      this.perder(this.vasos[data])
    });
    this.suscripcion5 = this._ServicioService.getGanador().subscribe(data=>{
      this.compruebaGanador(data);
    });
    this.suscripcion6 = this._ServicioService.getGanador2().subscribe(data=>{
      this.compruebaGanador2(data);
    });
  }

  ngOnDestroy(){
    this.suscripcion1.unsubscribe();
    this.suscripcion2.unsubscribe();
    this.suscripcion3.unsubscribe();
    this.suscripcion4.unsubscribe();
    this.suscripcion5.unsubscribe();
    this.suscripcion6.unsubscribe();
  }

  muestra(event, elem){
    if (this.jugador.turno) this._ServicioService.sendVasoElegido(this.vasos.indexOf(elem));
    else this._ServicioService.sendMessageSala({nombre: 'SISTEMA', mensaje: 'Es el turno de tu rival'});
  }

  perder(elem){
    if(elem.veneno){
      elem.lleno = true;
    }
    else{
      elem.lleno = false;
      if (this.jugador.turno) {
        $('.maspuntos').fadeIn("slow");
        $('.maspuntos').fadeOut("slow");
      }
    }
  }

  // verVidas(jugador){
  //   $('.vidas').empty();
  //   for(let i=1; i <= jugador.vidas; i++){
  //     $('.vidas').append('<img src="../assets/vida.png" width="50px" height="50px">');
  //   }
  // }

  compruebaGanador(lista){
    for(let elem of lista){
      if(elem.vidas == 0) this.perdedor = elem;
      else this.ganador = elem;
    }
    $('.vasos').hide();
    $('.modal-body').empty();
    $('.modal-body').append(
          '<p>El ganador ha sido: <span style="color: rgb(99, 183, 230); font-weight: bold;">' + this.ganador.nombre + '</span> con <span style="color: rgb(99, 183, 230); font-weight: bold;">' + this.ganador.puntos + '</span> puntos.</p>'+
          '<p>El perdedor ha sido: <span style="color: rgb(99, 183, 230); font-weight: bold;">' + this.perdedor.nombre + '</span> con <span style="color: rgb(99, 183, 230); font-weight: bold;">' + this.perdedor.puntos + '</span> puntos.</p>'
    );
    $('#myModal').modal('show');
  }

  cerrarModal(){
    $('#myModal').modal('hide');
  }

  compruebaGanador2(dato){
    $('.vasos').hide();
    $('.modal-body').empty();
    $('.modal-body').append(
          '<p><span style="color: rgb(99, 183, 230); font-weight: bold;">' + dato + '</span></p>');
    $('#myModal').modal('show');
  }

}
