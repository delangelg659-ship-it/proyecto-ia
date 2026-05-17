class AIRequestHandler {

    constructor(texto) {
        this.texto = texto;
    }

    sanitizar() {

        return this.texto
            .replace(/[^\w\s]/gi, '')
            .trim();

    }

}

module.exports = AIRequestHandler;