import { Component } from '@angular/core';
import { ValidarCodigoPostal } from './ts/Validacion';
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
    this.items = db.list('Servicios/ServiciosMéxico', {
    query: {
      limitToFirst: 5,
    }});
    
    this.DB = db;
  }
  s(s : string){
    this.llave = s;
    //let i  = this.DB.list("Colonias/México/"+s);
    this.objeto =  this.DB.object('Servicios/ServiciosMéxico/'+s, { preserveSnapshot: true });
    
    this.objeto.subscribe(snapshot => {
        this.nombre=  snapshot.val().nombreServicio;
        this.costo = snapshot.val().costo;
        this.establecimiento = snapshot.val().establecimiento;
  });
    
    let etiqueta = <HTMLElement>document.getElementById("Descuentos");
    etiqueta.style.display = "inline";
    this.objetoLista = this.DB.list("Servicios/ServiciosMéxico/"+s);
  }
  agendarCita(dia : number, mes : number,anio:number,hora:number,minutos:number): void {
    var citafb : CitaFB = new CitaFB(this.DB);
    var estTe : EstablecimientoFB = new EstablecimientoFB(this.DB);
    var ser : ServiciosFB  = new ServiciosFB(this.DB);
    var fecha = new Date(anio, mes - 1 , dia, hora, minutos);
    var manejaCitas : ManejaCitas = new ManejaCitas(this.DB);
    var cita : Cita = new Cita();
    this.objeto =  this.DB.object('/Establecimientos/'+this.llave, { preserveSnapshot: true });
    let nombre:string;
    let direccion : string;
    let telefono : string;
    let horarioAtencion : string;
    let servicio = ser.getServicio(this.llave);
    let establecimiento : Establecimiento = new Establecimiento(this.llave);
    this.objeto.subscribe(snapshot => {
          establecimiento.setNombre(snapshot.val().nombre) ;
          establecimiento.setDireccion (snapshot.val().direccion );
          establecimiento.setTelefono(snapshot.val().telefono );
          establecimiento.setHorario(snapshot.val().horarioServicio) ;
          
    });
    cita.setHorario(fecha);
    servicio.setEstablecimiento(establecimiento);
    cita.setEstablecimiento(establecimiento);
    cita.setServicio(servicio);
    
    setTimeout(function(){ 
        manejaCitas.guardarCita(cita);  
    
      }, 100);
    
    //

    
  } 
    
}
