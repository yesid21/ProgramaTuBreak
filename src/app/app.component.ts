import { dbInit } from './config/indexedDb/dbInit';
import { Component } from '@angular/core';
import { fromEvent, merge, Observable, Observer } from 'rxjs';
import { IndexedDb } from './config/indexedDb/IndexedDb';
import { map } from 'rxjs/operators';
import swal from 'sweetalert2';
@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'Programa Tu Break';
  conectToFirst = false;
  constructor(
    private IndexedDb: IndexedDb,
    private dbin: dbInit
  ) {
    this.createOnline$().subscribe(isConnected => {
      this.IndexedDb.updateDB();
      this.dbin.fillAllmaestros();
      if (isConnected && this.conectToFirst) {
        this.conectToFirst = false;
        swal.fire('En Linea', 'Volviste a tener conexión!', 'success');
      } else if (!isConnected && !this.conectToFirst) {
        this.conectToFirst = true;
        swal.fire('Offline', 'puedes seguir con lo tuyo! en cuanto recuperemos la conexion sincronizaremos ;)', 'warning');
      }
      console.log(isConnected ? 'En Linea' : 'Offline');
    });
  }

  createOnline$() {
    return merge<boolean>(
      fromEvent(window, 'offline').pipe(map(() => false)),
      fromEvent(window, 'online').pipe(map(() => true)),
      new Observable((sub: Observer<boolean>) => {
        sub.next(navigator.onLine);
        sub.complete();
      }));
  }
}
