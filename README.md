# Minijuegos

Proyecto realizado con Angular + Node + Socket + Bootstrap.

Página del juego: <a href="minijuegospablo.herokuapp.com">minijuegospablo.herokuapp.com</a>

Requerimientos cumplidos (a evaluar):

- Permitir a, al menos, dos jugadores realizar una partida simultánea. Ambos deben jugar de un modo simultaneo gracias a Socket.io
- Inicialmente la aplicación mostrará una página de bienvenida (no debe comenzar el juego con sólo cargar la página). Uno de los jugadores (o de otro modo que consideres según tu juego) podrá iniciar la partida. Si no hay contrincantes conectados no debe poder comenzarse ninguna partida.
- Debe implementarse un sistema de puntuaciones.
- Se deben controlar los casos en que se gana o pierde, controlando el juego todas las situaciones posibles y evitando que la partida continúe.
- Al finalizar la partida, ambos ven un resumen del resultado y vuelven a la pantalla de inicio.
- El servidor debe ser estable y tratar correctamente cualquier problema.

- (extra) El cliente será una SAP que deberá desarrollarse usando Angular y Bootstrap.
- (extra) Implementar salas de juego. Es decir, permitir que varios usuarios realicen partidas independientes entre ellos.
- (extra) Los usuarios se identifican con nombre como requisito obligatorio antes de acceder a la aplicación.
- (extra) Crear un chat general de la aplicación al que se accede desde la página inicial.
- (extra) Asociar a cada juego una sala de chat independiente.


This project was generated with [Angular CLI](https://github.com/angular/angular-cli) version 1.6.5.

## Development server

Run `ng serve` for a dev server. Navigate to `http://localhost:4200/`. The app will automatically reload if you change any of the source files.

## Code scaffolding

Run `ng generate component component-name` to generate a new component. You can also use `ng generate directive|pipe|service|class|guard|interface|enum|module`.

## Build

Run `ng build` to build the project. The build artifacts will be stored in the `dist/` directory. Use the `-prod` flag for a production build.

## Running unit tests

Run `ng test` to execute the unit tests via [Karma](https://karma-runner.github.io).

## Running end-to-end tests

Run `ng e2e` to execute the end-to-end tests via [Protractor](http://www.protractortest.org/).

## Further help

To get more help on the Angular CLI use `ng help` or go check out the [Angular CLI README](https://github.com/angular/angular-cli/blob/master/README.md).
