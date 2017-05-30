import { Descuentos, Productos, Servicios ,Establecimiento, Colonia ,Cita, CodigoPostal } from './Modelo';
import { AngularFireDatabase, FirebaseObjectObservable ,FirebaseListObservable} from 'angularfire2/database';
import {DescuentoAdicionalProductos , DescuentoAdicionalServicios , DescuentoFinalProductos,
        DescuentoFinalServicios , DescuentosProductos , DescuentosServicios} from './Descuentos'; 

export class ServiciosFB {
  servicios: FirebaseListObservable<any>;
  DB :  AngularFireDatabase;
  objeto:FirebaseObjectObservable<any> ;
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
      let servicio : Servicios = new Servicios(llave); 
      let servicioTemp : FirebaseObjectObservable<any> = this.getServicioFB(llave);
      let costo: number;
      let nombre: string;
      let establecimiento: Establecimiento;
      servicioTemp.subscribe(snapshot => {
        let establecimientoTmp : EstablecimientoFB = new EstablecimientoFB(this.DB); 
        costo = snapshot.val().costo;
        nombre  = snapshot.val().nombreServicio;
        establecimiento =  establecimientoTmp.getEstablecimiento(snapshot.val().establecimiento);
      });
      servicio.setCosto(costo);
      servicio.setNombre(nombre);
      servicio.setEstablecimiento(establecimiento);
      return servicio;
  }
  save(){
  }

}
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
        let servicios : ServiciosFB  = new ServiciosFB(this.DB);
        activos  = snapshot.val().Servicio;
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
export class EstablecimientoFB {
  objeto:FirebaseObjectObservable<any> ;
  establecimientos: FirebaseListObservable<any>;
  DB :  AngularFireDatabase;
  establecimientoTemp : FirebaseObjectObservable<any> ;
  constructor(db: AngularFireDatabase) {
    this.establecimientos = db.list('/Establecimientos/', { preserveSnapshot: true });
    this.DB = db ; 
  }
  getDescuentosServicios(): FirebaseListObservable<any>{
     return this.establecimientos; 
  }
  /**
   * Regresa un objeto de la clase FirebaseObjectObservable<any>
   * @param llave identificador del objeto en la bas e de datos 
   */
  getEstablecimientosFB(llave :string) : FirebaseObjectObservable<any> {
      let objeto:FirebaseObjectObservable<any> =  this.DB.object('/Establecimientos/'+llave, { preserveSnapshot: true });  
      return objeto;
  }
  getEstablecimiento(llave : string) : Establecimiento {
      let establecimiento : Establecimiento = new Establecimiento(llave); 
      this.establecimientoTemp = this.getEstablecimientosFB(llave);
      let nombre: string;
      let direccion: string;
      let telefono: string;
      let horarioAtencion: string;
      let colonia: Colonia;      
      this.establecimientoTemp.subscribe(snapshot => {
          nombre = snapshot.val().nombre;
          direccion = snapshot.val().direccion ;
          telefono = snapshot.val().telefono ;
          horarioAtencion = snapshot.val().horarioServicio ;
          //colonia = this.getColonia(snapshot.val().codigoPostal+"");
        });
        establecimiento.setNombre(nombre);
        establecimiento.setDireccion(direccion);
        establecimiento.setTelefono(telefono);
        establecimiento.setHorario(horarioAtencion);

        //establecimiento.setColonia(colonia);
      return establecimiento;
  }
  save(){
  }
  getColonia(llave : string) : Colonia{
      let colonia : Colonia;
      let codigoPostal: CodigoPostal;
      let nombre: string;
      this.objeto =  this.DB.object('/Colonias/México/'+llave, { preserveSnapshot: true });
      this.objeto.subscribe(snapshot => {
          nombre = snapshot.val().delegacion_municipio;
          console.dir("-------------------------------------------------as");
          codigoPostal = this.getCodigoPostal(llave);
          //console.clear();

      });
        colonia.setCodigoPostal(codigoPostal);
        colonia.setNombre(nombre);
      return colonia ;
  }
  getCodigoPostal(llave : string) : CodigoPostal{
    /** No es necesario solo estamos tomando a Mexico por el momento 
     * let regExp: string;
    let codigoPostal: string;
    let pais: string;
    let objeto:FirebaseObjectObservable<any> =  this.DB.object('/Colonias/México/'+llave, { preserveSnapshot: true });
    objeto.subscribe(snapshot => {

    });*/
    let codigo : CodigoPostal  = new CodigoPostal(); 
    codigo.setCodigoPostal(llave);
    codigo.setPais("México");
    codigo.setRegExp("#####");
    return codigo; 
  }
}
export class CitaFB{

  citas: FirebaseListObservable<any>;
  DB :  AngularFireDatabase;
  constructor(db: AngularFireDatabase) {
    this.citas = db.list('/Citas/', { preserveSnapshot: true });
    this.DB = db ; 
  }
  getCitas(): FirebaseListObservable<any>{
     return this.citas; 
  }
  /**
   * Regresa un objeto de la clase FirebaseObjectObservable<any>
   * @param llave identificador del objeto en la bas e de datos 
   */
  getCitaFB(llave :string) : FirebaseObjectObservable<any> {
      let objeto:FirebaseObjectObservable<any> =  this.DB.object('/Citas/'+llave, { preserveSnapshot: true });  
      return objeto;
  }
  getCita(llave : string) : Cita {
      let cita : Cita = new Cita(); 
      let citaTem : FirebaseObjectObservable<any> = this.getCitaFB(llave);
      let nombre: string;
      let establecimiento:Establecimiento  ;
      let horario : Date;
      let servicio : Servicios;
      citaTem.subscribe(snapshot => {
      let estFB : EstablecimientoFB= new EstablecimientoFB(this.DB); 
      let ser : ServiciosFB = new ServiciosFB(this.DB);
        //nombre = snapshot.val().nombre;
        console.log(snapshot.val().establecimiento);
        establecimiento = estFB.getEstablecimiento(snapshot.val().establecimiento) ;
        horario = snapshot.val().horario ;
        servicio = ser.getServicio(snapshot.val().servicio);
      });
      cita.setEstablecimiento(establecimiento);
      cita.setHorario(horario);
      cita.setServicio(servicio);
      return cita;
  }
}