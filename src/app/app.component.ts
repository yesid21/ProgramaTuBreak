import { Component } from '@angular/core';
import { fromEvent, merge, Observable, Observer } from 'rxjs';
import { IndexedDb } from './config/indexedDb/IndexedDb';
import { map } from 'rxjs/operators';
import swal from 'sweetalert2'

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'Programa Tu Break';

  constructor(private IndexedDb: IndexedDb) {

    this.createOnline$().subscribe(isConnected => {
      this.IndexedDb.updateDB();
      if (isConnected) {
        swal.fire('En Linea', 'Volviste a tener conexión!', 'success');
      } else {
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
