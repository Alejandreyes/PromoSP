import { Component } from '@angular/core';
import { ValidarCodigoPostal } from './ts/Validacion';

import { LoginComponent } from './componentes/login.component';
import { Cita, Establecimiento } from './ts/Modelo';
import { DescuentoServiciosFB } from './ts/DescuentosFB'; 
import { CitaFB , EstablecimientoFB , ServiciosFB} from './ts/ModeloFB'; 
import { DescuentoFinalServicios , DescuentoAdicionalProductos , DescuentoAdicionalServicios, DescuentoFinalProductos,
         DescuentosProductos,DescuentosServicios } from './ts/Descuentos'; 
import { AngularFireDatabase, FirebaseObjectObservable ,FirebaseListObservable} from 'angularfire2/database';
import {ManejaCitas } from './ts/ManejaCita';
@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  //descuentos : DescuentoServiciosFB;
  DB : AngularFireDatabase;
  objeto : FirebaseObjectObservable<any>;
  nombre : string;
  establecimiento : Establecimiento ;
  costo : number;
  llave : string;
  es : EstablecimientoFB ;
  objetoLista : FirebaseListObservable<any>;
  items : FirebaseListObservable<any>;
  constructor(db: AngularFireDatabase) {
    this.es  = new EstablecimientoFB(db);
    this.items = db.list('Descuentos', {
    query: {
      limitToFirst: 5,
    }});
    
    this.DB = db;
  }
    
}
