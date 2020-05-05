
const celeste = document.querySelector('#celeste')
const violeta = document.querySelector('#violeta')
const naranja = document.querySelector('#naranja')
const verde = document.querySelector('#verde')

const btnEmpezar = document.querySelector('#start');
const ULTIMO_NIVEL = 4



class Juego  {
    constructor (){
        this.incicializar()
        setTimeout(() => {
            this.generarSecuencia()
            this.siguienteNivel()
        }, 500)
    }
    
    incicializar() {
        this.siguienteNivel = this.siguienteNivel.bind(this)
        this.elegirColor = this.elegirColor.bind(this)
        btnEmpezar.classList.add('hide')
        this.nivel = 1
        this.colores = {
            celeste,
            violeta,
            naranja,
            verde
        }
    }

    generarSecuencia() {
        this.secuencia = new Array(ULTIMO_NIVEL).fill(0).map(n => Math.floor(Math.random() *4))
    }

    siguienteNivel() {
        this.subNivel = 0
        this.iluminarSecuencia()
        this.agregarEventosClick()
    }

    transformarNumeroAColor(num) {
        switch(num) {
            case 0: 
                return 'celeste'
            case 1: 
                return 'violeta'
            case 2: 
                return 'naranja'
            case 3: 
                return 'verde'
        }
    }

    transformarColorANumero(color) {
        switch(color) {
            case 'celeste': 
                return 0
            case 'violeta': 
                return 1
            case 'naranja': 
                return 2
            case 'verde': 
                return 3
        }
    }

    
    iluminarColor(color) {
        this.colores[color].classList.add('light')
        setTimeout(() => this.apagarColor(color), 350)
    }
    
    iluminarSecuencia() {
        for (let i = 0; i < this.nivel; i ++) {
            const color = this.transformarNumeroAColor(this.secuencia[i])
            setTimeout(() => this.iluminarColor(color), 1000 * i)
        }
    }
    
    apagarColor(color) {
        this.colores[color].classList.remove('light')
    }

    agregarEventosClick() {
        this.colores.celeste.addEventListener('click', this.elegirColor)
        this.colores.violeta.addEventListener('click', this.elegirColor)
        this.colores.naranja.addEventListener('click', this.elegirColor)
        this.colores.verde.addEventListener('click', this.elegirColor)
    }

    eliminarEventosClick() {
        this.colores.celeste.removeEventListener('click', this.elegirColor)
        this.colores.violeta.removeEventListener('click', this.elegirColor)
        this.colores.naranja.removeEventListener('click', this.elegirColor)
        this.colores.verde.removeEventListener('click', this.elegirColor)
    }

    elegirColor(ev) {
        const nombreColor = ev.target.dataset.color
        const numeroColor = this.transformarColorANumero(nombreColor)
        this.iluminarColor(nombreColor)
        if (numeroColor === this.secuencia[this.subNivel]) {
            console.log(numeroColor)
            console.log(this.secuencia[this.subNivel])
            this.subNivel++
            if (this.subNivel === this.nivel) {
                this.nivel++
                console.log(this.nivel)
                this.eliminarEventosClick()
                if (this.nivel === (ULTIMO_NIVEL + 1)) {
                    this.winner()
                }else {
                    setTimeout(this.siguienteNivel, 1500 )  
                }
            }
        } else {
            this.loser()
        }
    }

    winner() {
        swal('Ganaste!!', 'Felicitaciones', 'success')
            .then(() => {
                btnEmpezar.classList.remove('hide')
            })
    }

    loser() {
        swal('Perdiste', `No seguiste el patron quedaste en el nivel: ${this.nivel}`, 'error')
            .then(() => {
                this.eliminarEventosClick()
                btnEmpezar.classList.remove('hide')
            })
    }
}


function startGame() {
    juego = new Juego()
}