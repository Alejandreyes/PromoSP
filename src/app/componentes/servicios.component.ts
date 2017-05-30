import { Component } from '@angular/core';
import { ValidarCodigoPostal } from '../ts/Validacion';
import { Cita, Establecimiento } from '../ts/Modelo';
import { DescuentoServiciosFB } from '../ts/DescuentosFB'; 
import { CitaFB , EstablecimientoFB , ServiciosFB} from '../ts/ModeloFB'; 
import { DescuentoFinalServicios , DescuentoAdicionalProductos , DescuentoAdicionalServicios, DescuentoFinalProductos,
         DescuentosProductos,DescuentosServicios } from '../ts/Descuentos'; 
import { AngularFireDatabase, FirebaseObjectObservable ,FirebaseListObservable} from 'angularfire2/database';
import {ManejaCitas } from '../ts/ManejaCita';

@Component({
  selector: 'servicios-tag',
  templateUrl : 'servicios.component.html' ,
  styleUrls: ['../app.component.css']
})
export class ServiciosComponente {
  DB : AngularFireDatabase;
  objeto : FirebaseObjectObservable<any>;
  nombre : string;
  establecimiento : string;
  direccion : string ;
  costo : number;
  llave : string;
  descuento : number ;
  descuentoBD:FirebaseObjectObservable<any>;
  es : EstablecimientoFB ;
  establecimientoOBS : FirebaseObjectObservable<any>;
  items : FirebaseListObservable<any>;
  constructor(db: AngularFireDatabase) {
    this.es  = new EstablecimientoFB(db);
    this.items = db.list('/Descuentos', {
    query: {
      orderByChild : "categoria",
      equalTo: "Servicios"
    }});
    
    this.DB = db;
  }
  verPublicacion(llave : string,bienID : string){
    let etiquetaProducto = <HTMLElement>document.getElementById("DescuentosProductos");
    etiquetaProducto.style.display = "none";
    this.llave = bienID;
    this.objeto =  this.DB.object('Servicios/ServiciosMéxico/'+bienID, { preserveSnapshot: true });
    let establecimientoID : string;
    this.objeto.subscribe(snapshot => {
        this.nombre=  snapshot.val().nombreServicio;
        this.costo = snapshot.val().costo;
  });
    this.descuentoBD = this.DB.object('Descuentos/'+llave, { preserveSnapshot: true });
    this.descuentoBD.subscribe(snapshot => {
        this.descuento = snapshot.val().descuento;
        establecimientoID = snapshot.val().establecimiento;
  });
      this.establecimientoOBS = this.DB.object('/Establecimientos/'+establecimientoID, { preserveSnapshot: true });
      this.establecimientoOBS.subscribe(snapshot => {
      this.establecimiento = snapshot.val().nombre;
      this.direccion = snapshot.val().direccion;
    let etiqueta = <HTMLElement>document.getElementById("Descuentos");
    etiqueta.style.display = "inline";
  });
  }
  agendarCita(dia : number, mes : number,anio:number,hora:number,minutos:number): void {
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
        //this.descuentoBD.update();
      }, 100);
  } 
    
}