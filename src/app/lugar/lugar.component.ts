import { Objetomaestros, DatosQuanty } from './../config/indexedDb/tipado-maestros/objetomaestros';
import { DatosObject } from './../datos/object/DatosObject';
import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { CurrentStep } from '../currentStep.enum';
import { MaestrosDb } from '../config/indexedDb/db-maestros';
import { ModalDismissReasons, NgbModal } from '@ng-bootstrap/ng-bootstrap';
import swal from 'sweetalert2';
@Component({
  selector: 'app-lugar',
  templateUrl: './lugar.component.html'
})
export class LugarComponent implements OnInit {
  @Input() currentStep: CurrentStep;
  @Input() ObjDatos?: DatosObject;
  @Output() changeValueCurrentStep = new EventEmitter<CurrentStep>();
  @Output() changeValueobjModal = new EventEmitter<DatosQuanty[]>();
  Steps = CurrentStep;
  lstMaterial: Objetomaestros[];
  lstMaterial2: Objetomaestros[];
  lstMaterial3: Objetomaestros[];
  closeResult = '';
  objModal: Objetomaestros;
  detailsObj: DatosQuanty[] = [];
  constructor
    (
      readonly maestrosDB: MaestrosDb,
      private modalService: NgbModal) {
  }

  ngOnInit() {
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
      swal.fire('Producto Actualizado', 'El producto ya existia asi que fue actualizado', 'success');
    } else {
      item.quantity = parseFloat(quantity);
      this.detailsObj.push(item);
      swal.fire('Producto Agregado', 'El producto fue agregado', 'success');
    }
    this.changeValueobjModal.emit(this.detailsObj);
  }

}
