import { Objetomaestros, ObjetoArrayMaestros } from './../../config/indexedDb/tipado-maestros/objetomaestros';
import { MaestrosDb } from './../../config/indexedDb/db-maestros';
import { Injectable } from "@angular/core";
import { from, Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class DatosDB {
  constructor(readonly maestrosDB: MaestrosDb) { }

  getmaestrosLugar(): Observable<ObjetoArrayMaestros> {
    return from(this.getTypeListFilteredToResponse(2));
  }

  getMetodoPago(): Observable<ObjetoArrayMaestros> {
    return from(this.getTypeListFilteredToResponse(4));
  }


  // todo : needs to do more elegant
  async getTypeListToResponse() {
    const typelistResponse = new ObjetoArrayMaestros();
    typelistResponse.items = [];
    const responseItems = await this.maestrosDB.getTypeList();
    responseItems.forEach((item: Objetomaestros) => {
      typelistResponse.items.push(new Objetomaestros(item.id, item.nombre, item.type, item.precio, item.img));
    });
    return typelistResponse;
  }

  async getTypeListFilteredToResponse(filter: number) {
    const typelistResponse = new ObjetoArrayMaestros();
    typelistResponse.items = [];
    const responseItems = await this.maestrosDB.getTypeListFiltered(filter);
    responseItems.forEach(item => {
      typelistResponse.items.push(new Objetomaestros(item.id, item.nombre, item.type, item.precio, item.img));
    });
    return typelistResponse;
  }
}
