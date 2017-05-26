import { Component } from '@angular/core';
import { ValidarCodigoPostal } from './ts/Validacion';
import { DescuentoServiciosFB } from './ts/DescuentosFB'; 
import { DescuentoFinalServicios , DescuentoAdicionalProductos , DescuentoAdicionalServicios, DescuentoFinalProductos,
         DescuentosProductos,DescuentosServicios } from './ts/Descuentos'; 
import { AngularFireDatabase, FirebaseObjectObservable ,FirebaseListObservable} from 'angularfire2/database';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  descuentos : DescuentoServiciosFB;
  title = 'app works!';
  item: FirebaseObjectObservable<any>;
  constructor(db: AngularFireDatabase) {
    this.descuentos = new DescuentoServiciosFB(db);
    this.item = this.descuentos.getDescuento("1"); 
    //let descuentos : FirebaseListObservable<any> = db.list('/DescuentosServicios/1', { preserveSnapshot: true });
    this.item.subscribe(snapshot => {
    
    console.log(snapshot.val().categoria);
//    var nombre : string  = snapshot.val().name;
  //  var size : string = snapshot.val().size;
   // console.log(nombre.toUpperCase() + size);
  });
    
  }
  save(newName: string) {
    let objeto : DescuentoFinalServicios  = this.descuentos.getDescuentoServicios(newName);
    console.log(objeto.getCategoria());
  }
}
