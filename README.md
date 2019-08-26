# Express API template

Template per API in stile RESTful, scritte in Node.js e basate sul framework [Express](https://expressjs.com/).

Le API sono in crado di parsare delle richieste con un payload in formato json che sarà poi disponibile in `request.body`.
Per rispondere alla chiamata in formato json utilizzare `res.json({})`

```sh
npm install
npm start
```

```sh
curl http://localhost:3000/status
{"data":"ok"}
```

## Environments
Le API contengono alcuni paramentri configurabili tramite le variabili d'ambiente.
Il modo più semplice per settarle è creare un file chiamato `.env` nella root della cartella.
**Variables:**
```sh
# Indirizzo del server
HOST=localhost
# Numero porta del servizio
PORT=3000
# Abilitare Cross-Origin Resource-Sharing
CORS=true
```

## Development
Per facilitare lo sviluppo è incluso tra le devDependencies il pacchetto [nodemon](https://www.npmjs.com/package/nodemon) che in automatico riavvia le API al salvataggio di un file. Per avviarlo in modalità sviluppo usare il comando `npm run dev`

## Routes
Gli enpoint sono organizzati in routes. Idealmente ad ogni route corrisponde una risorsa che si vuole servire. Per aggiungere una nuva route creare un modulo sotto la cartella routes. Per creare un nuovo modulo, creare una cartella che prende il nome del modulo e all'interno creare un file index.js contentente il seguente template:
```js
const route = require('express').Router()

// here writes the routes - follow the syntax explained at http://expressjs.com/en/5x/api.html#router

module.exports = route
```

## Logger
È incluso un logger basato su [bunyay](https://www.npmjs.com/package/bunyan) e disponibile nelle varie routes tramite l'oggetto `request`.

```js
route.get('/', (req, res) => {
    req.logger.info('hello from looger')
    res.json({})
})
```
Il logger stampa sia nello stream `stdout`, sia in un file all'interno della cartella `./logs/`.

I log nel file contengono anche informazioni per il debug ed il trace di enventuali errori.
Per visualizzare il file da terminale usare `npm run trace`.

## Docker
È incluso inoltre un `Dockerfile` per buildare un immagine della tua API.

**How to use it**
1. Inanzitutto ricordati di modificare le variabili ENV ed EXPOSE - il valore di EXPOSE deve coincidere con quello di ENV PORT
2. Build:
```sh
docker build -t my-custom-api .
```
3. Run:
```sh
docker run -d -p 3000:3000 my-custom-api
```