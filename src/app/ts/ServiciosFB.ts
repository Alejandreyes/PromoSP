import { Descuentos, Productos, Servicios ,Establecimiento } from './Modelo';
import { AngularFireDatabase, FirebaseObjectObservable ,FirebaseListObservable} from 'angularfire2/database';
import {DescuentoAdicionalProductos , DescuentoAdicionalServicios , DescuentoFinalProductos,
        DescuentoFinalServicios , DescuentosProductos , DescuentosServicios} from './Descuentos'; 
import { EstablecimientoFB } from "./ModeloFB"; 
export class ServiciosFB {
  servicios: FirebaseListObservable<any>;
  DB :  AngularFireDatabase;
  constructor(db: AngularFireDatabase) {
    this.servicios = db.list('/Servicios/ServiciosMéxico', { preserveSnapshot: true });
    this.DB = db ; 
  }
  getDescuentosServicios(): FirebaseListObservable<any>{
     return this.servicios; 
  }
  /**
   * Regresa un objeto de la clase FirebaseObjectObservable<any>
   * @param llave identificador del objeto en la bas e de datos 
   */
  getServicioFB(llave :string) : FirebaseObjectObservable<any> {
      let objeto:FirebaseObjectObservable<any> =  this.DB.object('/Servicios/ServiciosMéxico/'+llave, { preserveSnapshot: true });  
      return objeto;
  }
  getServicio(llave : string) : Servicios {
      let servicio : Servicios = new Servicios(); 
      let servicioTemp : FirebaseObjectObservable<any> = this.getServicioFB(llave);
      let costo: number;
      let nombre: string;
      let establecimiento: Establecimiento;
      servicioTemp.subscribe(snapshot => {
        let estTemp : EstablecimientoFB = new EstablecimientoFB(this.DB); 
        costo = snapshot.val().costo;
        nombre  = snapshot.val().nombreServicio;
        establecimiento =  estTemp.getEstablecimiento(snapshot.val().establecimiento);
      });
      servicio.setCosto(costo);
      servicio.setEstablecimiento(establecimiento);
      servicio.setNombre(nombre);
      return servicio;
  }
  save(){
  }

}
