import { Injectable } from '@angular/core';
import { deleteDB, openDB } from 'idb';

@Injectable({
  providedIn: 'root'
})
export class IndexedDb {
  dbName = 'ProgramaTuBreak';

  async createDB() {
    await openDB(this.dbName, 1, {
      upgrade(db) {
        db.createObjectStore('formulario', { keyPath: 'id' });
        db.createObjectStore('productos', { keyPath: 'id' });
        db.createObjectStore('maestros', { keyPath: 'id' });
      }
    });
  }

  async deleteDB() {
    await deleteDB(this.dbName);
  }

  async updateDB() {
    const numberTablesDB = 3;
    const dbProgramaTuBreak = await openDB(this.dbName, 1);
    if (dbProgramaTuBreak.objectStoreNames.length < numberTablesDB) {
      this.deleteDB();
      this.createDB();
    }
  }

}
