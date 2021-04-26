import { DatosObject } from './../datos/object/DatosObject';
import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { CurrentStep } from '../currentStep.enum';

@Component({
  selector: 'app-detalle',
  templateUrl: './detalle.component.html'
})
export class DetalleComponent implements OnInit {
  @Input() currentStep: CurrentStep;
  Steps = CurrentStep;
  @Output() changeValueCurrentStep = new EventEmitter<CurrentStep>();
  @Input() ObjDatos?: DatosObject;
  constructor() { }

  ngOnInit() {
  }

  despachar() {
    window.scroll(0, 0);
    this.currentStep = CurrentStep.STEP_4;
    this.changeValueCurrentStep.emit(this.currentStep);
  }
}
