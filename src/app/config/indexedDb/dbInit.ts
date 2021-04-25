import { Injectable } from '@angular/core';
import { MaestrosDb } from './db-maestros';
import { Objetomaestros } from './tipado-maestros/objetomaestros';
@Injectable({
  providedIn: 'root'
})
export class dbInit {
  constructor(
    private maestros: MaestrosDb
  ) { }
  mestrosDb: Objetomaestros[];
  fillAllmaestros() {
    this.mestrosDb = this.copyObj(this.maestros.maestros);
    this.mestrosDb.forEach(item => {
      this.maestros.updateTypeListData(item.id, item.nombre, item.type, item.precio, item.img);
      localStorage.dateUpdate = new Date();
    });
  }

  copyObj<T>(obj: T): T {
    return JSON.parse(JSON.stringify(obj));
  }

}
