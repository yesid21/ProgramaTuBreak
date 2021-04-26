import { DatosObject } from './../datos/object/DatosObject';
import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { CurrentStep } from '../currentStep.enum';
import { DatosQuanty } from '../config/indexedDb/tipado-maestros/objetomaestros';

@Component({
  selector: 'app-detalle',
  templateUrl: './detalle.component.html'
})
export class DetalleComponent implements OnInit {
  @Input() currentStep: CurrentStep;
  Steps = CurrentStep;
  @Output() changeValueCurrentStep = new EventEmitter<CurrentStep>();
  @Input() ObjDatos?: DatosObject;
  validation = true;
  @Input() detailsObj: DatosQuanty[];
  total?: number;
  mensajeFinal?:string;
  constructor() { }

  ngOnInit() {
  }

  despachar() {
    window.scroll(0, 0);
    this.currentStep = CurrentStep.STEP_4;
    this.changeValueCurrentStep.emit(this.currentStep);
  }

  suma() {
    this.total = null;
    if (this.detailsObj.length > 0) {
      this.detailsObj.forEach((elem: DatosQuanty) => {
        this.total += elem.subTotal;
      });
    }
    return this.total;
  }

  servicio() {
    if (this.suma() <= 7000) {
      return 300;
    } else if (this.suma() >= 7000 && this.suma() <= 13000) {
      return 650;
    } else {
      return 1000;
    }
  }

  totalService() {
    return this.suma() + this.servicio();
  }

  guardar(){

  }
}
