import { CodigoPostal } from './Modelo';
export class ValidarCodigoPostal {
    valida(codigoPostal: CodigoPostal): boolean{
       
        if (codigoPostal.getRegExp() != null) {
             console.log("Estoy aqui");
            if (codigoPostal.getCodigoPostal() != null) {
                let codigo = codigoPostal.getCodigoPostal().toUpperCase().trim();
                let reg = codigoPostal.getRegExp().toUpperCase().trim();
                console.log("Paso aqui");
                if (codigo.length != reg.length){
                    return false;
                }
                for (let i = 0; i < reg.length; i++){
                    let regCaracter = reg.charAt(i);
                    let codigoCaracter = codigo.charAt(i); 
                    console.log(regCaracter + codigoCaracter); 
                    if (!this.caracterValido(regCaracter, codigoCaracter)) {
                        return false;
                    }
                }
                return true;
            }
         }
        
    }
    caracterValido(c1, c2) : boolean {
        if (c1 == '#') {
            return !isNaN(c2);
        } else {
            if (c2 == '$') {
                return this.esLetra(c2);
            } else {
                if (c1 == c2) {
                    return true;
                }
            }
        }
        return false;
    }
    esLetra(cadena){
      if (cadena.match(/^[a-zA-Z]+$/))
      {
        return true;
      }
      else
      {
        return false;
      }
    }
    
}
export class ValidarDescuentos{

}
