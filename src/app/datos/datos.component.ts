import { CurrentStep } from './../currentStep.enum';
import { Objetomaestros } from './../config/indexedDb/tipado-maestros/objetomaestros';
import { MaestrosDb } from './../config/indexedDb/db-maestros';
import { DatosDB } from './db/datos-db';
import { Component, EventEmitter, OnInit } from '@angular/core';
import { DatosObject } from './object/DatosObject';

@Component({
  selector: 'app-datos',
  templateUrl: './datos.component.html'
})
export class DatosComponent implements OnInit {
  ObjDatos?: DatosObject = {};
  today = new Date().toISOString().split('.')[0];
  lstmaestroLugar?: Objetomaestros[];
  lstMetodoPago?: Objetomaestros[];
  currentStep: CurrentStep;
  Steps = CurrentStep;
  changeValueCurrentStep = new EventEmitter<CurrentStep>();

  constructor(
    private Db: DatosDB,
    readonly maestrosDB: MaestrosDb
  ) {
    const day = this.today.substring(0, this.today.length - 3);
    this.today = day;

    this.lstmaestroLugar = this.maestrosDB.maestros.filter(x => x.type === 2);
    this.lstMetodoPago = this.maestrosDB.maestros.filter(x => x.type === 4);
  }

  ngOnInit() {
    this.currentStep = CurrentStep.STEP_1;
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

  despachar(){
    this.currentStep = CurrentStep.STEP_2
    this.changeValueCurrentStep.emit(this.currentStep);
  }
}
