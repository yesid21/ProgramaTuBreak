import { Component, OnInit } from '@angular/core';

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
  constructor() { }

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
