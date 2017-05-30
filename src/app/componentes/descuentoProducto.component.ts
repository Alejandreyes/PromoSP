import { Component } from "@angular/core";
import { AngularFireDatabase, FirebaseObjectObservable ,FirebaseListObservable} from 'angularfire2/database';
import {DescuentoServiciosFB} from '../ts/DescuentosFB'; 
import { Subject } from 'rxjs/Subject';
import {DescuentosServicios} from '../ts/Descuentos' ; 
@Component({
    selector : "descuentos-tag",
    templateUrl : 'descuentoProducto.component.html' ,
    styleUrls: ['../app.component.css']

})
export class DescuentoProductosComponente{
    public titulo  =  'Descuentos';
    productos: FirebaseListObservable<any>;
    cantidad : number; 
    DB:  AngularFireDatabase;
    descuentoBD:FirebaseObjectObservable<any>;
    descuento : number ;
    precio : number ; 
    idProducto : string;
    nombre : string;
    objeto:FirebaseObjectObservable<any>; 
    constructor(db: AngularFireDatabase) {
        this.productos = db.list("/Descuentos/", {
          query: {
            orderByChild : "categoria",
            equalTo: "Productos"
          }});
        this.DB = db;
  }
  
  aplicarDescuento(llave :string ,bienID: string ){
    this.idProducto = llave;
    this.idProducto = bienID;
    this.objeto=  this.DB.object('Productos/'+bienID, { preserveSnapshot: true });
    let nombre : string ;
    this.objeto.subscribe(snapshot => {
        this.nombre=  snapshot.val().nombre;
        this.precio = snapshot.val().costo;
        this.cantidad = snapshot.val().cantidad;
  });
    this.descuentoBD = this.DB.object('/Descuentos/'+llave, { preserveSnapshot: true });
    this.descuentoBD.subscribe(snapshot => {
        this.descuento=  snapshot.val().descuento;
  });
    
    
    let etiquetaProducto = <HTMLElement>document.getElementById("DescuentosProductos");
    etiquetaProducto.style.display = "inline";
   
    let etiqueta = <HTMLElement>document.getElementById("Descuentos");
    etiqueta.style.display = "none";
  }
  comprar(){
    if(this.cantidad == 1) {
      this.objeto.remove(); 
      this.descuentoBD.remove();
    }else{
      this.objeto.update({ cantidad : this.cantidad - 1 });
    }

    let etiquetaProducto = <HTMLElement>document.getElementById("DescuentosProductos");
    etiquetaProducto.style.display = "none";
   
    
  }
}
