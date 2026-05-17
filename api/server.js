const express = require('express');
const bodyParser = require('body-parser');
const AIRequestHandler = require('../AIRequestHandler');

const app = express();

app.use(bodyParser.urlencoded({ extended: true }));
app.use(express.static('public'));

app.post('/procesar', (req, res) => {

    let texto = req.body.propuesta;

    let palabras = texto.trim().split(/\s+/);

    if (palabras.length < 10) {

        return res.send('Error: mínimo 10 palabras.');

    }

    let handler = new AIRequestHandler(texto);

    let limpio = handler.sanitizar();

    res.send(`

<!DOCTYPE html>
<html lang="es">

<head>

<meta charset="UTF-8">

<title>Resultado</title>

<style>

body {
    background: linear-gradient(to right, #141e30, #243b55);
    font-family: Arial, sans-serif;
    display: flex;
    justify-content: center;
    align-items: center;
    height: 100vh;
}

.resultado {
    background: white;
    width: 600px;
    padding: 30px;
    border-radius: 20px;
    box-shadow: 0px 0px 20px rgba(0,0,0,0.4);
}

h2 {
    color: #243b55;
    text-align: center;
}

p {
    font-size: 18px;
    color: #333;
}

.palabras {
    margin-top: 20px;
    font-weight: bold;
    color: #2563eb;
}

</style>

</head>

<body>

<div class="resultado">

    <h2>Datos listos para Gemini API</h2>

    <p><strong>Texto limpio:</strong></p>

    <p>${limpio}</p>

    <p class="palabras">
        Total de palabras: ${palabras.length}
    </p>

</div>

</body>

</html>

`);

});

const PORT = 3000;

module.exports = app;

;