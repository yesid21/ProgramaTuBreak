import { CurrentStep } from './../currentStep.enum';
import { DatosQuanty, Objetomaestros } from './../config/indexedDb/tipado-maestros/objetomaestros';
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
  changeValueObjDatos = new EventEmitter<DatosObject>();
  changeValuedetailsObj = new EventEmitter<DatosQuanty[]>();
  lstMaterial: Objetomaestros[];
  lstMaterial2: Objetomaestros[];
  lstMaterial3: Objetomaestros[];
  detailsObj: DatosQuanty[] = [];
  changeValuelstMaterial = new EventEmitter<Objetomaestros[]>();
  changeValuelstMaterial2 = new EventEmitter<Objetomaestros[]>();
  changeValuelstMaterial3 = new EventEmitter<Objetomaestros[]>();
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
    this.currentStep = CurrentStep.STEP_3;
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

  despachar() {
    window.scroll(0, 0);

    switch (this.ObjDatos.LugarSelect.toUpperCase()) {
      case 'RESTAURANTE':
        this.lstMaterial = this.maestrosDB.maestros.filter(x => x.type === 1);
        this.lstMaterial2 = this.maestrosDB.maestros.filter(x => x.type === 6);
        this.lstMaterial3 = this.maestrosDB.maestros.filter(x => x.type === 7);
        break;
      case 'PARQUEADERO':
        this.lstMaterial = this.maestrosDB.maestros.filter(x => x.type === 3);
        break;
      case 'PAPELERÍA':
        this.lstMaterial = this.maestrosDB.maestros.filter(x => x.type === 5);
        break;
    }
    this.currentStep = CurrentStep.STEP_2;
    this.changeValuelstMaterial.emit(this.lstMaterial);
    this.changeValuelstMaterial2.emit(this.lstMaterial2);
    this.changeValuelstMaterial3.emit(this.lstMaterial3);
    this.changeValueObjDatos.emit(this.ObjDatos);
    this.changeValueCurrentStep.emit(this.currentStep);
    this.changeValuedetailsObj.emit(this.detailsObj);
  }

  validateLstCompra() {
    this.detailsObj = [];
  }
}
