import { Injectable } from '@angular/core';
import { Guid } from 'guid-typescript';
import { openDB } from 'idb';
import { GuardarForm } from './tipado-maestros/objetomaestros';

@Injectable({
  providedIn: 'root'
})
export class FormularioDb {
  dbName = 'ProgramaTuBreak';

  async insertForm(form: GuardarForm): Promise<any> {
    const db = await openDB(this.dbName, 1);
    const guiquotation = Guid.create().toString();
    await db.add('formulario', {
      guid: guiquotation,
      datos: form.datos,
      compra: form.compra,
      mensaje: form.mensaje
    });
    return true;
  }
}
