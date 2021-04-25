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
    { id: 2, nombre: 'Perro', type: 1, precio: 8000, img: 'perro' },
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
    { id: 26, nombre: 'Tijeras', type: 5, precio: 6000, img: 'tijeras' },
    { id: 27, nombre: 'Bloc', type: 5, precio: 2500, img: 'bloc' },
    { id: 28, nombre: 'Cuaderno', type: 5, precio: 5000, img: 'cuaderno' },
    { id: 29, nombre: 'Lápiz', type: 5, precio: 1200, img: 'lapiz' },
    { id: 30, nombre: 'Portaminas', type: 5, precio: 7000, img: 'portaminas' },
    { id: 31, nombre: 'Minas', type: 5, precio: 2500, img: 'minas' },
    { id: 32, nombre: 'Lápicero', type: 5, precio: 2500, img: 'lapicero' },
    { id: 33, nombre: 'Carpeta', type: 5, precio: 4000, img: 'carpeta' },
    { id: 34, nombre: 'Marcador', type: 5, precio: 3500, img: 'marcador' },
    { id: 35, nombre: 'Borrador', type: 5, precio: 1000, img: 'borrador' },
    { id: 36, nombre: 'Grapadora', type: 5, precio: 15000, img: 'grapadora' },
    { id: 37, nombre: 'Cinta', type: 5, precio: 1400, img: 'cinta' },
    { id: 38, nombre: 'Resaltador', type: 5, precio: 5000, img: 'resaltador' },
    { id: 39, nombre: 'Cartulina', type: 5, precio: 2000, img: 'cartulina' },
    { id: 40, nombre: 'Papel periódico', type: 5, precio: 700, img: 'papelperiodico' },
    { id: 20, nombre: 'CocaCola', type: 6, precio: 3000, img: 'cocacola' },
    { id: 21, nombre: 'Agua', type: 6, precio: 2500, img: 'agua' },
    { id: 22, nombre: 'Cerveza', type: 6, precio: 3500, img: 'cerveza' },
    { id: 23, nombre: 'Gomitas', type: 7, precio: 2000, img: 'gomitas' },
    { id: 24, nombre: 'Maní', type: 7, precio: 1000, img: 'mani' },
    { id: 25, nombre: 'Paquetes', type: 7, precio: 4000, img: 'paquetes' }
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
