// Generated by CoffeeScript 1.4.0

/*
 -*- encoding: utf-8 -*-
 pilasweb engine - a video game framework.

 copyright 2013 - Hugo Ruscitti, Sergio Lindo <sergiolindo.empresa at gmail.com>
 license: lgplv3 (see http://www.gnu.org/licenses/lgpl.html)

 website - http://hugoruscitti.github.com/pilasweb
*/


(function() {

  define(function() {
    var Actor;
    Actor = (function() {

      function Actor(imagen, options) {
        if (!(options != null)) {
          options = {};
        }
        this.x = options.x || 0;
        this.y = options.y || 0;
        this.centro_x = options.centro_x || 0;
        this.centro_y = options.centro_y || 0;
        this.escala_x = options.escala_x || 1;
        this.escala_y = options.escala_y || 1;
        this.rotacion = options.rotacion || 0;
        this.transparencia = options.transparencia || 0;
        this.imagen = pilas.imagenes.cargar(imagen);
        console.log(this.imagen);
        this.sprite = new createjs.Bitmap(this.imagen);
        this.sprite.x = 100;
        this.sprite.y = 100;
        pilas.agregar(this);
      }

      Actor.prototype.actualizar = function() {};

      Actor.prototype.dibujar = function(painter) {
        this.imagen.dibujar(painter, this.x, this.y, this.centro_x, this.centro_y, this.escala_x, this.escala_y, this.rotacion, this.transparencia);
        return void 0;
      };

      Actor.prototype.__getattr__ = function(x) {
        return this.x;
      };

      Actor.prototype.__setattr__ = function(x, v) {
        return this[x] = v;
      };

      return Actor;

    })();
    return Actor;
  });

}).call(this);
