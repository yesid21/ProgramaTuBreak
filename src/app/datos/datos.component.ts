import { DatosDB } from './db/datos-db';
import { Component, OnInit } from '@angular/core';
import { ObjetoArrayMaestros } from '../config/indexedDb/tipado-maestros/objetomaestros';
import { DatosObject } from './object/DatosObject';

@Component({
  selector: 'app-datos',
  templateUrl: './datos.component.html'
})
export class DatosComponent implements OnInit {
  ObjDatos?: DatosObject = {};
  today = new Date().toISOString().split('.')[0];
  lstmaestroLugar: ObjetoArrayMaestros;
  lstMetodoPago: ObjetoArrayMaestros;

  constructor(private Db: DatosDB) {
    const day = this.today.substring(0, this.today.length - 3);
    this.today = day;
    this.Db.getmaestrosLugar().subscribe(res => {
      this.lstmaestroLugar = res;
    });

    this.Db.getMetodoPago().subscribe(res => {
      this.lstMetodoPago = res;
    });
  }

  ngOnInit() {
  }

  ValidateEmail() {
    if (!!this.ObjDatos.correo) {
      this.ObjDatos.correo = this.ObjDatos.correo.replace(/\s+/g, '');
      this.ObjDatos.correo = this.ObjDatos.correo.trim();
    }
    if (this.ObjDatos.correo == null) {
      this.ObjDatos.correo = '';
    }
  }

  ValidateNombre() {
    if (this.ObjDatos.nombre == null) {
      this.ObjDatos.nombre = '';
    }
  }

  ValidateApellidos() {
    if (this.ObjDatos.apellidos == null) {
      this.ObjDatos.apellidos = '';
    }
  }

  ValidateCedula() {
    if (this.ObjDatos.cedula == null) {
      this.ObjDatos.cedula = '';
    }
  }

  ValidateCelular() {
    if (this.ObjDatos.celular === undefined) {
      this.ObjDatos.celular = null;
    } else {
      if (this.ObjDatos.celular.toString() === '') {
        this.ObjDatos.celular = null;
      }

    }
  }
}
