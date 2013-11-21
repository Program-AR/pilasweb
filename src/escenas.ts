/// <reference path="camara.ts />
/// <reference path="evento.ts />
/// <reference path="control.ts />

class Base {
  click_de_mouse;
  cuando_termina_click;
  mueve_mouse;
  actualiza;
  pulsa_tecla;
  suelta_tecla;
  fisica;

  control;

  constructor() {
    this.click_de_mouse = new Evento('click_de_mouse');             // ['boton', 'x', 'y']
    this.cuando_termina_click = new Evento('cuando_termina_click'); // ['boton', 'x', 'y']
    this.mueve_mouse = new Evento('mueve_mouse');                   // ['x', 'y', 'dx', 'dy']
    this.pulsa_tecla = new Evento('pulsa_tecla');                   // ['codigo', 'texto']
    this.suelta_tecla = new Evento('suelta_tecla');                 // ['codigo', 'texto']
    this.actualiza = new Evento('actualiza');                       // []
    this.fisica = new Fisica();

    this.control = new Control(this);
  }
}

/**
 * @class Normal
 *
 * Escena básica de pilas.
 *
 * Si no se define ninguna escena, cuando se ejecuta:
 *
 *     @example
 *     pilas.iniciar();
 *
 * esta es la escena que se muestra en la pantalla.
 *
 */
class Normal extends Base {
  actores;
  stage;      // escenario de cretejs.
  camara;

  constructor() {
    super();
    this.actores = [];
    this.stage = new createjs.Stage(pilas.canvas);
    this.camara = new Camara();
  }

  actualizar() {
    this.fisica.actualizar();

    for (var i=0; i<this.actores.length; i++) {
      this.actores[i].actualizar();
      this.actores[i].actualizar_comportamientos(); // TODO: implementar dentro del actualizar del actor.
    }

    this.ordenar_actores_por_valor_z();
    this.stage.update();
    this.actualiza.emitir();
    pilas.colisiones.verificar_colisiones();
  }

  ordenar_actores_por_valor_z() {
    var sortFunction = function(item1, item2, options) {
      if (item1.z < item2.z)
        return 1; 

      if (item1.z > item2.z)
        return -1; 

      return 0;
    }
    this.stage.sortChildren(sortFunction);
  }

  agregar_actor(actor) {
    this.actores.push(actor);

    this.stage.addChild(actor.sprite);
    this.stage.update();
  }

  eliminar_actor(actor) {
    var index = this.actores.indexOf(actor);
    this.actores.splice(index, 1);

    this.stage.removeChild(actor.sprite);
    this.stage.update();
  }

  obtener_posicion_pantalla(x, y) {
    return this.camara.obtener_posicion_pantalla(x, y);
  }

  obtener_posicion_escenario(x, y) {
    return this.camara.obtener_posicion_escenario(x, y);
  }
}
