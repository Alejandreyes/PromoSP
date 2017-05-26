import { Descuentos, Productos, Servicios  } from './Modelo';
import { AngularFireDatabase, FirebaseObjectObservable ,FirebaseListObservable} from 'angularfire2/database';
import {DescuentoAdicionalProductos , DescuentoAdicionalServicios , DescuentoFinalProductos,
        DescuentoFinalServicios , DescuentosProductos , DescuentosServicios} from './Descuentos'; 
export class DescuentoServiciosFB {
  descuentos: FirebaseObjectObservable<any>;
  DB :  AngularFireDatabase;
  constructor(db: AngularFireDatabase) {
    this.descuentos = db.object('/DescuentosServicios', { preserveSnapshot: true });
    this.DB = db ; 
  }
  getDescuentosServicios(): FirebaseObjectObservable<any>{
     return this.descuentos; 
  }
  /**
   * Metodo que obtiene un objeto de la clase FirebaseObjectObservable<any> 
   * @param llave string identificador unico que trae la base de datos 
   */
  getDescuento(llave :string) : FirebaseObjectObservable<any> {
      let objeto:FirebaseObjectObservable<any> =  this.DB.object('/DescuentosServicios/'+llave, { preserveSnapshot: true });  
      return objeto;
  }
  /**
   * Metodo que regresa un objeto de las clase DescuentoFinalServicios 
   * @param llave string identificador unico que trae la base de datos
   */
  getDescuentoServicios(llave : string) : DescuentoFinalServicios {
      let descuento : DescuentoFinalServicios = new DescuentoFinalServicios(); 
      let descuentoTemp : FirebaseObjectObservable<any> = this.getDescuento(llave);
      let activos: Servicios;
      let descuentoF : number;
      let categoria : string;
      descuentoTemp.subscribe(snapshot => {
        //activos  = snapshot.val().Servicio;
        descuentoF = snapshot.val().descuento;
        categoria = snapshot.val().categoria;
      });
      descuento.setBienes(activos);
      descuento.setDescuentos(descuentoF);
      descuento.setCategoria(categoria);
      return descuento;
  }
  save(){

  }

}
