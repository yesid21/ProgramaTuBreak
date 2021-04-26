import { DatosObject } from "src/app/datos/object/DatosObject";

export class Objetomaestros {
  id?: number;
  nombre?: string;
  type?: number;
  precio?: number;
  img?: string;

  constructor(
    id: number,
    nombre: string,
    type: number,
    precio: number,
    img: string) {
    this.id = id;
    this.nombre = nombre;
    this.type = type;
    this.precio = precio;
    this.img = img;
  }
}

export class ObjetoArrayMaestros {
  items: Objetomaestros[];
}

export class DatosQuanty extends Objetomaestros {
  quantity?: number;
  subTotal?: number;
}

export class GuardarForm {
  guid?: string;
  datos?: DatosObject;
  compra?: DatosQuanty[];
  mensaje?: string;
}

