export class CodigoPostal {
    regExp: string;
    codigoPostal: string;
    pais: string;
    constructor(){
        
    }
    /*constructor(pais : string, regExp : string ) {
        this.pais = pais;
        this.regExp = regExp;
    }*/
    getCodigoPostal() : string {
        return this.codigoPostal;
    }
    setCodigoPostal(codigo: string) {
        this.codigoPostal = codigo;
    }
    getPais():
     string{
        return this.pais;
    }
    setPais(paisAux: string): void{
        this.pais = paisAux;
    }
    getRegExp(): string{
        return this.regExp;
    }
    setRegExp(exp: string): void{
        this.regExp;
    }
}

export class Colonia {
    codigoPostal: CodigoPostal;
    nombre: string;
    constructor(nombre : string, codigoPostal : CodigoPostal ) {
        this.nombre = nombre;
        this.codigoPostal = codigoPostal;
    }
    getNombre(): string {
        return this.nombre;
    }
    getCodigoPostal() :CodigoPostal{
        return this.codigoPostal
    }
    setNombre(nombre :string): void {
        this.nombre = nombre;
    }
    setCodigoPostal(codigo: CodigoPostal): void{
        this.codigoPostal = codigo;
    }
}
export interface Descuentos{
    activos: Bienes;
    descuento : number;
    categoria : string;
    getDescuentos(): number;
    setBienes(bien : Bienes): void;
}
export interface Bienes{
    costo: number;
    nombre: string;
    getCosto(): number;
    setCosto(costo: number): void;
    getNombre(): string;
    setNombre(nombre: string): void;
}
export class Establecimiento {
    id : string;
    nombre: string;
    direccion: string;
    telefono: string;
    horarioAtencion: string;
    colonia: Colonia;
    constructor(id : string){
        this.id=id;
    }
    getId(): string{
        return this.id;
    }
    getNombre(): string {
        return this.nombre;
     }
    setNombre(nombre: string) {
        this.nombre = nombre;
     }
    getDireccion(): string {
        return this.direccion;
     }
    setDireccion(direccion: string) {
        this.direccion = direccion;
     }
    getTelefono(): string {
        return this.telefono;
     }
    setTelefono(telefono: string) {
        this.telefono = telefono;
     }
    getHorario(): string {
        return this.horarioAtencion;
    }
    setHorario(horario: string) {
        this.horarioAtencion = horario;
     }
     getColonia() : Colonia{
        return this.colonia;
     }
     setColonia(colonia : Colonia) : void {
         this.colonia = colonia;
     }
}
export class Servicios implements Bienes{
    id : string;
    costo: number;
    nombre: string;
    establecimiento: Establecimiento;
    constructor(id : string){
        this.id=id;
    }
    getId(){
        return this.id;
    }
    getCosto(): number { 
        return this.costo;
    }
    setCosto(costo: number): void { 
        this.costo = costo;
    }
    getNombre(): string {
        return this.nombre;
     }
    setNombre(nombre: string): void { 
        this.nombre = nombre;
    }
    getEstablecimiento() : Establecimiento{
        return this.establecimiento;
    }
    setEstablecimiento(establecimiento: Establecimiento) : void {
        this.establecimiento = establecimiento;
    }
} 
export class Cita{
    private id: string;
    private estableciemiento: Establecimiento;
    private horario: Date;
    private servicio: Servicios; 
    constructor(){
       
    }
    
    getId() : string{
        return this.id;
    }
    getEstablecimiento(): Establecimiento{
        return this.estableciemiento;
    }
    getHorario() : Date {
        return this.horario;
    }
    getServicio(): Servicios {
        return this.servicio;
    }
    setId(id : string): void{
        this.id = id;
    }
    setEstablecimiento(establecimiento: Establecimiento): void {
        this.estableciemiento = establecimiento;
    }
    setHorario(horario: Date): void {
        this.horario = horario;        
    }
    setServicio(servicio : Servicios) {
        this.servicio = servicio;
    }
}
export class Productos{
    costo: number;
    nombre: string;
    cantidad : number;
    constructor(){}
    
    getCosto(): number { 
        return this.costo;
    }
    setCosto(costo: number): void { 
        this.costo = costo;
    }
    getNombre(): string {
        return this.nombre;
     }
    setNombre(nombre: string): void { 
        this.nombre = nombre;
    }
    getCantidad() :number{
        return this.cantidad;
    }
    setCantidad(cantidad : number) : void {
        this.cantidad = cantidad;
    }

}