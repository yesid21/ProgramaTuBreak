import { Objetomaestros, DatosQuanty } from './../config/indexedDb/tipado-maestros/objetomaestros';
import { DatosObject } from './../datos/object/DatosObject';
import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { CurrentStep } from '../currentStep.enum';
import { MaestrosDb } from '../config/indexedDb/db-maestros';
import { ModalDismissReasons, NgbModal } from '@ng-bootstrap/ng-bootstrap';
import swal from 'sweetalert2';
import { identifierModuleUrl } from '@angular/compiler';
@Component({
  selector: 'app-lugar',
  templateUrl: './lugar.component.html'
})
export class LugarComponent implements OnInit {
  @Input() currentStep: CurrentStep;
  @Input() ObjDatos?: DatosObject;
  @Output() changeValueCurrentStep = new EventEmitter<CurrentStep>();
  @Output() changeValueobjModal = new EventEmitter<DatosQuanty[]>();
  @Output() changeValuedetailsObj = new EventEmitter<DatosQuanty[]>();
  Steps = CurrentStep;
  @Input() lstMaterial: Objetomaestros[];
  @Input() lstMaterial2: Objetomaestros[];
  @Input() lstMaterial3: Objetomaestros[];
  closeResult = '';
  objModal: Objetomaestros;
  @Input() detailsObj: DatosQuanty[] = [];
  total?: number;
  constructor
    (
      readonly maestrosDB: MaestrosDb,
      private modalService: NgbModal) {
  }

  ngOnInit() {
  }

  open(content, item: Objetomaestros) {
    this.objModal = item;
    this.modalService.open(content, { ariaLabelledBy: 'modal-basic-title' }).result.then((result) => {
      this.closeResult = `Closed with: ${result}`;
    }, (reason) => {
      this.closeResult = `Dismissed ${this.getDismissReason(reason)}`;
    });
  }

  private getDismissReason(reason: any): string {
    if (reason === ModalDismissReasons.ESC) {
      return 'by pressing ESC';
    } else if (reason === ModalDismissReasons.BACKDROP_CLICK) {
      return 'by clicking on a backdrop';
    } else {
      return `with: ${reason}`;
    }
  }


  Add(item: DatosQuanty, quantity) {
    let exists = false;
    let itemToModified: DatosQuanty;
    this.detailsObj.forEach(control => {
      if (!exists && control.id === item.id) {
        exists = true;
        itemToModified = control;
      }
    });
    if (exists) {
      itemToModified.id = item.id;
      itemToModified.nombre = item.nombre;
      itemToModified.precio = item.precio;
      itemToModified.type = item.type;
      itemToModified.img = item.img;
      itemToModified.quantity = parseFloat(quantity);
      itemToModified.subTotal = parseFloat(quantity) * item.precio;
      swal.fire('Producto Actualizado', 'El producto ya existia asi que fue actualizado', 'success');
    } else {
      item.quantity = parseFloat(quantity);
      item.subTotal = parseFloat(quantity) * item.precio;
      this.detailsObj.push(item);
      swal.fire('Producto Agregado', 'El producto fue agregado', 'success');
    }
    this.changeValueobjModal.emit(this.detailsObj);
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
    if (this.ObjDatos.LugarSelect.toUpperCase() !== 'PARQUEADERO') {
      if (this.suma() <= 7000) {
        return 300;
      } else if (this.suma() >= 7000 && this.suma() <= 13000) {
        return 650;
      } else {
        return 1000;
      }
    } else {
      return 250;
    }
  }

  validateModal(value?: any) {
    const val = parseFloat(value);
    if (val <= 0) {
      return false;
    } else if (val > 0) {
      return true;
    }
    return false;
  }

  eliminarItem(item: DatosQuanty) {
    this.detailsObj = this.detailsObj.filter(x => x.id !== item.id);
  }

  despachar() {
    window.scroll(0, 0);
    this.currentStep = CurrentStep.STEP_3;
    this.changeValuedetailsObj.emit(this.detailsObj);
    this.changeValueCurrentStep.emit(this.currentStep);
  }

}
