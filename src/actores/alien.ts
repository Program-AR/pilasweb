// <reference path="comportamientos.ts />

class Alien extends Actor {
  constructor(x=0, y=0) {
    var imagen = pilas.imagenes.cargar_animacion('alien_camina.png', 11);
    super(imagen, x, y);

    this.centro_y = 40;

    this._imagen.definir_animacion("parado", [0], 10);
    this._imagen.definir_animacion("camina", [4, 5, 6, 7, 8, 9, 8, 7, 6, 5], 10);
    this._imagen.cargar_animacion("parado");

  }

  actualizar() {
    this._imagen.avanzar();
    this.z = this.y;
  }

  ir_derecha() {
    this.hacer_luego(MoverHaciaDerecha, {cantidad: 100, tiempo: 2});
  }

  ir_izquierda() {
    this.hacer_luego(MoverHaciaIzquierda, {cantidad: 100, tiempo: 2});
  }

  ir_arriba() {
    this.hacer_luego(MoverHaciaArriba, {cantidad: 100, tiempo: 2});
  }

  ir_abajo() {
    this.hacer_luego(MoverHaciaAbajo, {cantidad: 100, tiempo: 2});
  }

  esperar(tiempo=2) {
    this.hacer_luego(Esperar, {tiempo: tiempo});
  }

  detener() {
    this.esperar(0);
  }

}

class Movimiento {
  receptor;
  argumentos;

  tiempo;
  cantidad;
  _contador_de_tiempo;
  _velocidad;

  constructor(argumentos) {
    this.argumentos = argumentos;
  }

  iniciar(receptor) {
    this.receptor = receptor;
    this.tiempo = this.argumentos.tiempo || 2;
    this.cantidad = this.argumentos.cantidad || 32;

    this._contador_de_tiempo = 0;
    this._velocidad = (this.cantidad / 60.0) / this.tiempo;
    this.iniciar_animacion();
  }

  iniciar_animacion() {
  }

  supero_el_tiempo() {
    return (this._contador_de_tiempo > this.tiempo * 60);
  }
}

class MoverHaciaDerecha extends Movimiento {

  iniciar_animacion() {
    this.receptor._imagen.cargar_animacion("camina");
    this.receptor.espejado = false;
  }

  actualizar() {
    this.realizar_movimiento();

    if (this.supero_el_tiempo()) {
      this.receptor._imagen.cargar_animacion('parado');
      return true;
    }

    this._contador_de_tiempo += 1;
  }

  realizar_movimiento() {
    this.receptor.x += this._velocidad;
  }
}

class MoverHaciaIzquierda extends MoverHaciaDerecha {

  iniciar_animacion() {
    this.receptor._imagen.cargar_animacion("camina");
    this.receptor.espejado = true;
  }

  realizar_movimiento() {
    this.receptor.x -= this._velocidad;
  }
}


class MoverHaciaArriba extends MoverHaciaDerecha {

  iniciar_animacion() {
    this.receptor._imagen.cargar_animacion("camina");
  }

  realizar_movimiento() {
    this.receptor.y += this._velocidad;
  }
}

class MoverHaciaAbajo extends MoverHaciaDerecha {

  iniciar_animacion() {
    this.receptor._imagen.cargar_animacion("camina");
  }

  realizar_movimiento() {
    this.receptor.y -= this._velocidad;
  }
}

class Esperar extends MoverHaciaDerecha {

  iniciar_animacion() {
    this.receptor._imagen.cargar_animacion("parado");
    this.receptor.espejado = false;
  }

  realizar_movimiento() {
  }
}
