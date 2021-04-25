import { Objetomaestros } from './../config/indexedDb/tipado-maestros/objetomaestros';
import { DatosObject } from './../datos/object/DatosObject';
import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { CurrentStep } from '../currentStep.enum';
import { MaestrosDb } from '../config/indexedDb/db-maestros';

@Component({
  selector: 'app-lugar',
  templateUrl: './lugar.component.html'
})
export class LugarComponent implements OnInit {
  @Input() currentStep: CurrentStep;
  @Input() ObjDatos?: DatosObject;
  @Output() changeValueCurrentStep = new EventEmitter<CurrentStep>();
  Steps = CurrentStep;
  lstMaterial: Objetomaestros[];
  constructor(readonly maestrosDB: MaestrosDb) {
  }

  ngOnInit() {
    switch (this.ObjDatos.LugarSelect.toUpperCase()) {
      case 'RESTAURANTE':
        this.lstMaterial = this.maestrosDB.maestros.filter(x => x.type === 1);
        break;
      case 'PARQUEADERO':
        this.lstMaterial = this.maestrosDB.maestros.filter(x => x.type === 3);
        break;
      case 'PAPELERÍA':
        this.lstMaterial = this.maestrosDB.maestros.filter(x => x.type === 5);
        break;
    }
  }

}
