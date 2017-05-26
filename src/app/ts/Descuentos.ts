import { Descuentos, Productos, Servicios } from './Modelo';

export class DescuentosProductos implements Descuentos {
    constructor(){}
    activos: Productos;
    descuento : number;
    categoria : string;
    getDescuentos(): number{
        return this.descuento;
    }
    setBienes(bien : Productos): void{
        this.activos = bien;
    }
    getProductos():Productos{
        return this.activos;
    }
    setProductos(producntos : Productos) {
        this.activos = producntos;
    }
    setDescuentos(descuentos : number) : void{
        this.descuento = descuentos;
    }
    setCategoria(categoria : string) :void{
        this.categoria = categoria;
    }   
    getCategoria(): string{
        return this.categoria;
    }
    precioOriginal():number{
        return this.activos.getCosto();
    }
}
export class DescuentosServicios implements Descuentos{
    activos: Servicios;
    descuento : number;
    categoria : string;
    constructor(){}
    getDescuentos(): number{
        return this.descuento;
    }
    setBienes(bien : Servicios): void{
        this.activos = bien;
    }
    getServicios():Servicios{
        return this.activos;
    }
    setDescuentos(descuentos : number) : void{
        this.descuento = descuentos;
    }
    setCategoria(categoria : string) :void{
        this.categoria = categoria;
    }   
    getCategoria(): string{
        return this.categoria;
    }
    precioOriginal():number{
        return this.activos.getCosto();
    }
    
}
export class DescuentoFinalServicios extends DescuentosServicios{
    constructor() {super();}
    
    precioFinal() : number  {
        let descuentoFinal:number = super.getDescuentos() / 100;
        descuentoFinal *= super.getServicios().getCosto();
        return (super.getServicios().getCosto()) - descuentoFinal;
    }
} 
export class DescuentoAdicionalServicios extends DescuentosServicios{
     descuentoAdiccional : number;

    constructor(){super()}    
    
    precioFinal() : number {
        let descuentoInicial : number = super.getDescuentos() / 100;
        descuentoInicial *= super.getServicios().getCosto();
        descuentoInicial = (super.getServicios().getCosto()) - descuentoInicial;
        let descuentoFinal : number = this.descuentoAdiccional / 100;
        descuentoFinal*= descuentoInicial;
        descuentoFinal = descuentoInicial - descuentoFinal;
        return descuentoFinal;
    }  

    getDescuentoAdiccional() :number {
        return this.descuentoAdiccional;
    }

    setDescuentoAdiccional(descuentoAdiccional: number) : void {
        this.descuentoAdiccional = descuentoAdiccional;
    }

}
export class DescuentoFinalProductos extends DescuentosProductos{
    constructor() {super();}
    
    precioFinal() : number  {
        let descuentoFinal:number = super.getDescuentos() / 100;
        descuentoFinal *= super.getProductos().getCosto();
        return (super.getProductos().getCosto()) - descuentoFinal;
    }
} 
export class DescuentoAdicionalProductos extends DescuentosProductos{
     descuentoAdiccional : number;

    constructor(){super()}    
    
    precioFinal() : number {
        let descuentoInicial : number = super.getDescuentos() / 100;
        descuentoInicial *= super.getProductos().getCosto();
        descuentoInicial = (super.getProductos().getCosto()) - descuentoInicial;
        let descuentoFinal : number = this.descuentoAdiccional / 100;
        descuentoFinal*= descuentoInicial;
        descuentoFinal = descuentoInicial - descuentoFinal;
        return descuentoFinal;
    }  

    getDescuentoAdiccional() :number {
        return this.descuentoAdiccional;
    }

    setDescuentoAdiccional(descuentoAdiccional: number) : void {
        this.descuentoAdiccional = descuentoAdiccional;
    }
    
}