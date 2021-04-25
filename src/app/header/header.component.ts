import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { CurrentStep } from '../currentStep.enum';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html'
})
export class HeaderComponent implements OnInit {

  @Input() currentStep: CurrentStep;
  Steps = CurrentStep;
  @Output() changeValueCurrentStep = new EventEmitter<CurrentStep>();
  constructor() { }

  ngOnInit() {
  }

  despachar() {
    switch (this.currentStep) {
      case this.Steps.STEP_1:
        location.assign('/');
        break;
      case this.Steps.STEP_2:
        this.currentStep = CurrentStep.STEP_1;
        break;
      case this.Steps.STEP_3:
        this.currentStep = CurrentStep.STEP_2;
        break;
      case this.Steps.STEP_4:
        this.currentStep = CurrentStep.STEP_3;
        break;
      case this.Steps.STEP_5:
        this.currentStep = CurrentStep.STEP_4;
        break;
      case this.Steps.STEP_6:
        this.currentStep = CurrentStep.STEP_5;
        break;
      default:
        location.assign('/');
        break;
    }
    this.changeValueCurrentStep.emit(this.currentStep);
  }

}
