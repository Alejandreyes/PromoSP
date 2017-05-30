import { Component } from "@angular/core";
import { AngularFireDatabase, FirebaseObjectObservable ,FirebaseListObservable} from 'angularfire2/database';
import {DescuentoServiciosFB} from '../ts/DescuentosFB'; 
import {DescuentosServicios} from '../ts/Descuentos' ; 
@Component({
    selector : "descuentos-tag",
    templateUrl : 'descuentos.component.html' ,
    styleUrls: ['../app.component.css']

})
export class DescuentosComponente{
    public titulo  =  'Descuentos';
    //descuento  : FirebaseObjectObservable<any>;
    productos: FirebaseListObservable<any>;
    DB:  AngularFireDatabase;
    //descuentos : DescuentoServiciosFB;
   //descuento : DescuentosServicios ; 
    constructor(db: AngularFireDatabase) {
        this.productos = db.list("Productos/");
        this.DB = db;
  }
  s(s : string){
    //let i  = this.DB.list("Colonias/México/"+s);
    let objeto:FirebaseObjectObservable<any> =  this.DB.object('Productos/'+s, { preserveSnapshot: true });
    let nombre : string ;
    objeto.subscribe(snapshot => {
        //activos  = snapshot.val().Servicio;
        nombre=  snapshot.val().nombre;
        nombre += "<br>" + snapshot.val().costo;
        
        nombre+= "<br><button (click)= 'a("+snapshot.val().key+")'>Comprar</button>";
        //nombre+= "<br><button (click)= 'b()'>Agendar Cita</button>";
        
  });
    
    let etiqueta = <HTMLElement>document.getElementById("producto");
    let nueva  = document.createElement('div');
    nueva.setAttribute("id","producto");
    //let n = document.getElementById("nueva");
    nueva.innerHTML = nombre;
    
    //etiqueta.appendChild(nueva);
    if(!etiqueta.hasChildNodes()){
      etiqueta.appendChild(nueva);
    }else {
      let n = document.getElementById("producto");
      n.innerHTML = nombre;
    }
    
    //let servicio = document.getElementById("servicio");
      //  servicio.style.display = "inline";
    

    //etiqueta.innerHTML = nombre;
    //console.log(s);
  }
}
