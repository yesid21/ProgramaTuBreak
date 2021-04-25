import { DatosDB } from './db/datos-db';
import { Component, OnInit } from '@angular/core';
import { ObjetoArrayMaestros } from '../config/indexedDb/tipado-maestros/objetomaestros';

@Component({
  selector: 'app-datos',
  templateUrl: './datos.component.html'
})
export class DatosComponent implements OnInit {
  nombre?: string;
  apellidos?: string;
  cedula?: string;
  celular?: number;
  correo?: string;
  fechaYHora?: Date;
  LugarSelect?: string;
  lstmaestroLugar: ObjetoArrayMaestros;

  constructor(private Db: DatosDB) {
    this.Db.getmaestrosLugar().subscribe(res => {
      this.lstmaestroLugar = res;
    });
  }

  ngOnInit() {
  }

  ValidateEmail() {
    if (!!this.correo) {
      this.correo = this.correo.replace(/\s+/g, '');
      this.correo = this.correo.trim();
    }
    if (this.correo == null) {
      this.correo = '';
    }
  }

  ValidateNombre() {
    if (this.nombre == null) {
      this.nombre = '';
    }
  }

  ValidateApellidos() {
    if (this.apellidos == null) {
      this.apellidos = '';
    }
  }

  ValidateCedula() {
    if (this.cedula == null) {
      this.cedula = '';
    }
  }

  ValidateCelular() {
    if (this.celular === undefined) {
      this.celular = null;
    } else {
      if (this.celular.toString() === '') {
        this.celular = null;
      }

    }
  }
}
