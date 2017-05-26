import { Cita } from './Modelo';
export class AgendarCita{

    validaHorario(cita: Cita) : boolean{
        let establecimiento = cita.getEstablecimiento();
        let hora = cita.getHorario();
        if (this.diaHabil(establecimiento.getHorario(),hora)){
            return false;
        }
        if (!(this.horasHabiles(establecimiento.getHorario(),hora))){
            return false;
        }
        return true; 
    }
    diaHabil(horario : string, hora: Date): boolean{
        let diasHabiles: number[] = this.diasHabiles(horario); 
        let diaSemana: number = hora.getDate();
        if (diasHabiles[diaSemana] == 1){
            return true;
        }
        return false;
    }
    /**
     * Metodo privado que sirve para saber si la hora especificada por el usuario se 
     * encuentra dentro del periodo que esta activo el establecimiento 
     * @param horarioServicio Horario semanal del estableciemto
     * @param horario horario solicitado por el usuario
     * @return true en caso de que el horario se encuetre dentrodel horario de servicio del dia escogido por el usuario 
     * false en otro caso
     */
    horasHabiles(horario :string, horaEst : Date) : boolean{
        horario = this.horarioDelDiaEscogido(horario, horaEst);
        let horaApertura : string = horario.substring(0, horario.indexOf(","));
        let horaCierre : string  = horario.substring(horario.indexOf(",") + 1);
        let hora : number = horaEst.getHours();
        let minutos : number = horaEst.getMinutes();
        let hApertura : number = parseInt(horaApertura.substring(0,horaApertura.indexOf(":")));
        let mApertura : number = parseInt(horaApertura.substring(horaApertura.indexOf(":")+1));
        let hCierre : number = parseInt(horaCierre.substring(0,horaCierre.indexOf(":")));
        let mCierre : number = parseInt(horaCierre.substring(horaCierre.indexOf(":")+1));
        let minutosHora : number = (hora*60) + minutos;
        let abrir :number = (hApertura*60) +mApertura; 
        let cierre :number  = (hCierre*60) + mCierre;
        if(abrir < minutosHora && minutosHora < cierre){
            return true;
        }
        return false;
    }
    diasHabiles(dias: string) : number[] {
        let arregloDias: number[] = [];
        var res : string[] = dias.split(",");
        for(var i=0 ;i<res.length; i++) {
    	    var token = res[i].trim().toLowerCase();
            switch (token) {
                case "lunes":
                    arregloDias[1] = 1;
                    break;
                case "martes":
                    arregloDias[2] = 1;
                    break;
                case "miercoles":
                    arregloDias[3] = 1;
                    break;
                case "jueves":
                    arregloDias[4] = 1;
                    break;
                case "viernes":
                    arregloDias[5] = 1;
                    break;
                case "sabado":
                    arregloDias[6] = 1;
                    break;
                default:
                    arregloDias[0] = 1;
            }
        }
        return arregloDias;
    }
    horarioDelDiaEscogido(horario: string, horaEst : Date) : string{
        let dia: number = horaEst.getDate();
        let diaSemana : string  = "";
        switch (dia) {
            case 1:
                diaSemana = "lunes";
                break;
            case 2:
                diaSemana = "martes";
                break;
            case 3:
                diaSemana = "miercoles";
                break;
            case 4:
                diaSemana = "jueves";
                break;
            case 5:
                diaSemana = "viernes";
                break;
            case 6:
                diaSemana = "sabado";
                break;
            case 0:
                diaSemana = "domingo";
                break;
        }
        let horariosDelDia : string = horario.substring(horario.indexOf(diaSemana));
        if (horariosDelDia.indexOf(",") > 0) {
            horariosDelDia = horariosDelDia.substring(0, horariosDelDia.indexOf(","));
        } else {
            horariosDelDia = horariosDelDia.substring(0);
        }
        let horaApertura : string = horariosDelDia.substring(horariosDelDia.indexOf("de ") + 3, horariosDelDia.indexOf(" a"));
        let horaCierre :string = horariosDelDia.substring(horariosDelDia.indexOf(" a ") + 3).trim();
        return horaApertura + "," + horaCierre;
    }
    guardarCita(cita :Cita) :void {
         let manejaCitas =  new ManejaCitas();
         manejaCitas.guardarCita(cita);
    }

}
export class ManejaCitas{
    constructor(){

    }
    guardarCita(cita: Cita) : void {
        
    }
    disponible(cita : Cita) :boolean {

        return false; 
    }
}