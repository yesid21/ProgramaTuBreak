import { Objetomaestros } from './tipado-maestros/objetomaestros';
import { Injectable } from '@angular/core';
import { openDB } from 'idb';
@Injectable({
  providedIn: 'root'
})
export class MaestrosDb {
  dbName = 'ProgramaTuBreak';

  maestros: Objetomaestros[] = [
    { id: 1, nombre: 'Hamburguesa', type: 1, precio: 13000, img: 'hamburguesa' },
    { id: 2, nombre: 'Perro', type: 1, precio: 80000, img: 'perro' },
    { id: 3, nombre: 'Arepa rellena', type: 1, precio: 10000, img: 'areparellena' },
    { id: 4, nombre: 'Salchipapas', type: 1, precio: 10000, img: 'salchipapas' },
    { id: 5, nombre: 'Gratinados', type: 1, precio: 15000, img: 'gratinados' },
    { id: 6, nombre: 'Butifarras', type: 1, precio: 700, img: 'butifarras' },
    { id: 7, nombre: 'Choripapa', type: 1, precio: 10000, img: 'choripapa' },
    { id: 8, nombre: 'Pizza', type: 1, precio: 30000, img: 'pizza' },
    { id: 9, nombre: 'Burrito', type: 1, precio: 13000, img: 'burrito' },
    { id: 10, nombre: 'Restaurante', type: 2, precio: 0, img: null },
    { id: 11, nombre: 'Parqueadero', type: 2, precio: 0, img: null },
    { id: 12, nombre: 'Papelería', type: 2, precio: 0, img: null },
    { id: 13, nombre: 'Carro', type: 3, precio: 4000, img: 'carro' },
    { id: 14, nombre: 'Moto', type: 3, precio: 2500, img: 'moto' },
    { id: 15, nombre: 'Efectivo ', type: 4, precio: 0, img: null },
    { id: 16, nombre: 'Tarjeta de crédito', type: 4, precio: 0, img: null },
    { id: 17, nombre: 'Tarjeta de débito', type: 4, precio: 0, img: null },
    { id: 18, nombre: 'Longaniza', type: 5, precio: 13000, img: 'longaniza' },
    { id: 19, nombre: 'Longaniza', type: 5, precio: 13000, img: 'longaniza' },
  ];

  async updateTypeListData(id: number, nombre: string, type: number, precio: number, img: string) {
    const db = await openDB(this.dbName, 1);
    const item = await db.getKey('maestros', id);
    if (item) {
      await db.put('maestros', {
        id: id,
        nombre: nombre,
        type: type,
        precio: precio,
        img: img
      });
    } else {
      await db.add('maestros', {
        id: id,
        nombre: nombre,
        type: type,
        precio: precio,
        img: img
      });
    }
  }

  async getTypeListFiltered(filter: number) {
    const db = await openDB(this.dbName, 1);
    const items = await db.getAll('maestros');
    const responseItems = [];
    for (const item of items) {
      if (item.type === filter) {
        responseItems.push(item);
      }
    }
    return responseItems;
  }

  async getTypeList() {
    const db = await openDB(this.dbName, 1);
    return await db.getAll('maestros');
  }
}
