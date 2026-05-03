# Modul 04: HTTP i pierwsze API bez frameworka

## Cel modulu

Zanim uzyjesz Express albo NestJS, zbudujesz minimalne API na natywnym module `http`. To pokazuje, co framework ukrywa: parsowanie URL, routing, body requestu, statusy i odpowiedzi JSON.

Po module umiesz:

- wyjasnic request i response,
- obsluzyc metody HTTP,
- odczytac route params i body,
- zwrocic JSON,
- dobrac podstawowe statusy HTTP,
- zbudowac proste API CRUD bez frameworka.

## Teoria

### Request i response

HTTP to protokol wymiany wiadomosci. Klient wysyla request, serwer zwraca response.

Request ma m.in.:

- metode, np. `GET`, `POST`, `PATCH`, `DELETE`,
- URL,
- headers,
- body.

Response ma m.in.:

- status code,
- headers,
- body.

Backend developer projektuje kontrakt: co klient moze wyslac i co dostanie w odpowiedzi.

### Statusy HTTP

Najwazniejsze na start:

- `200 OK`: operacja sie udala,
- `201 Created`: zasob zostal utworzony,
- `204 No Content`: operacja sie udala, ale nie ma body,
- `400 Bad Request`: klient wyslal niepoprawne dane,
- `401 Unauthorized`: brak poprawnego uwierzytelnienia,
- `403 Forbidden`: klient jest znany, ale nie ma uprawnien,
- `404 Not Found`: zasob nie istnieje,
- `409 Conflict`: konflikt stanu, np. email juz istnieje,
- `500 Internal Server Error`: blad po stronie serwera.

### REST jako styl projektowania

REST nie oznacza "kazdy endpoint zwraca JSON". Chodzi o modelowanie zasobow i operacji na nich.

Przyklad dla zadan:

- `GET /tasks`: lista zadan,
- `GET /tasks/:id`: jedno zadanie,
- `POST /tasks`: utworzenie zadania,
- `PATCH /tasks/:id`: czesciowa aktualizacja,
- `DELETE /tasks/:id`: usuniecie.

Nazwy endpointow powinny byc rzeczownikami, a czasownik zwykle wynika z metody HTTP.

## Praktyka prowadzona

Stworz `src/server.js`:

```js
const http = require('node:http');

const tasks = [
  { id: 1, title: 'Learn HTTP', done: false },
];

function sendJson(res, statusCode, data) {
  res.writeHead(statusCode, { 'Content-Type': 'application/json' });
  res.end(JSON.stringify(data));
}

function readBody(req) {
  return new Promise((resolve, reject) => {
    let body = '';

    req.on('data', (chunk) => {
      body += chunk;
    });

    req.on('end', () => {
      try {
        resolve(body ? JSON.parse(body) : {});
      } catch (error) {
        reject(new Error('Invalid JSON body'));
      }
    });
  });
}

const server = http.createServer(async (req, res) => {
  const url = new URL(req.url, 'http://localhost');

  if (req.method === 'GET' && url.pathname === '/tasks') {
    return sendJson(res, 200, tasks);
  }

  if (req.method === 'POST' && url.pathname === '/tasks') {
    try {
      const body = await readBody(req);

      if (!body.title || typeof body.title !== 'string') {
        return sendJson(res, 400, { message: 'Title is required' });
      }

      const task = {
        id: Date.now(),
        title: body.title,
        done: false,
      };

      tasks.push(task);

      return sendJson(res, 201, task);
    } catch (error) {
      return sendJson(res, 400, { message: error.message });
    }
  }

  sendJson(res, 404, { message: 'Route not found' });
});

server.listen(3000, () => {
  console.log('Server listening on http://localhost:3000');
});
```

Uruchom:

```powershell
node src/server.js
```

Przetestuj:

```http
GET http://localhost:3000/tasks
```

```http
POST http://localhost:3000/tasks
Content-Type: application/json

{
  "title": "Build first API"
}
```

## Zadania samodzielne

1. Dodaj `GET /tasks/:id`.
2. Dodaj `PATCH /tasks/:id` z aktualizacja `title` i `done`.
3. Dodaj `DELETE /tasks/:id`.
4. Dodaj odpowiedz `404`, gdy zadanie nie istnieje.
5. Dodaj prosty format bledu:

```json
{
  "error": {
    "message": "Task not found",
    "code": "TASK_NOT_FOUND"
  }
}
```

6. Dodaj query param `?done=true`, ktory filtruje liste.

## Kryteria zaliczenia

Modul jest zaliczony, gdy:

- API obsluguje CRUD,
- potrafisz przetestowac kazdy endpoint,
- bledy maja spójny format,
- rozumiesz, dlaczego reczny routing robi sie niewygodny,
- potrafisz powiedziec, co Express i NestJS zrobia za Ciebie.

## Pytania kontrolne

- Dlaczego `POST /tasks` zwraca `201`, a nie zawsze `200`?
- Czym rozni sie `PATCH` od `PUT`?
- Dlaczego `DELETE` czesto zwraca `204`?
- Co powinno znalezc sie w body bledu?

