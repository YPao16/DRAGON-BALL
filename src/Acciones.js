import Personaje from "./Personaje.js";

// Aquí están los movimientos y las formas de recuperar fuerzas.
class Acciones extends Personaje {
    
    // Guarda el nombre del jugador y el personaje que eligió.
    constructor(nombre, personaje = "") {
        super(nombre, personaje);
    }

    // El golpe básico gasta un poco de ki y energía.
    atkBasico() {
        this.setEnergia(parseInt(this.getEnergia() - 5));
        this.setKi(parseInt(this.getKi() - 10));
        this.mostrarEstadisticas();
    }

    // El ataque especial es más fuerte, pero también cuesta más.
    atkEspecial() {
        this.setEnergia(parseInt(this.getEnergia() - 15));
        this.setKi(parseInt(this.getKi() - 20));
        this.mostrarEstadisticas();
    }

    // La semilla recupera las barras y consume una semilla.
    curacion() {
        this.setEnergia(100);
        this.setKi(100);
        this.setVida(100);
        this.setSemilla(this.getSemilla() - 1);
        this.mostrarEstadisticas();
    }

    // Recupera ki y energía, sin pasar de 100.
    cargaEnergia() {
        this.setEnergia((this.getEnergia() + 15) > 100 ? 100 : (this.getEnergia() + 15));
        this.setKi((this.getKi() + 10) > 100 ? 100 : (this.getKi() + 10));
        this.mostrarEstadisticas();
    }

    // Aquí se puede agregar la defensa más adelante.
    defensa() {

    }
}

export default Acciones;