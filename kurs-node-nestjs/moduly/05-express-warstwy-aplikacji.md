# Modul 05: Express i warstwy aplikacji

## Cel modulu

Express pokazuje pierwszy poziom frameworka: routing, middleware, obsluge requestow i odpowiedzi. Ten modul uczy tez podzialu kodu na warstwy, zanim NestJS narzuci bardziej formalna architekture.

Po module umiesz:

- stworzyc API w Express,
- uzyc middleware,
- podzielic kod na router, service i repository,
- obslugiwac bledy centralnie,
- projektowac proste endpointy REST,
- rozumiec, dlaczego wieksze aplikacje potrzebuja struktury.

## Teoria

### Express jako cienka warstwa

Express daje wygodny routing:

```js
app.get('/tasks', (req, res) => {
  res.json(tasks);
});
```

Ale Express nie mowi Ci, gdzie trzymac logike. To zaleta i wada. W malym projekcie jest elastyczny. W wiekszym szybko powstaje chaos, jesli wszystko trafia do jednego pliku.

### Middleware

Middleware to funkcja, ktora wykonuje sie w trakcie obslugi requestu.

Moze:

- logowac request,
- parsowac JSON,
- sprawdzac auth,
- dodawac dane do `req`,
- konczyc odpowiedz,
- przekazac sterowanie dalej przez `next()`.

Kolejnosc middleware ma znaczenie.

### Warstwy aplikacji

Na start wystarcza trzy warstwy:

- **Router/controller**: zna HTTP, odbiera request, zwraca response.
- **Service**: trzyma logike aplikacyjna.
- **Repository/storage**: trzyma sposob dostepu do danych.

Kontroler nie powinien wiedziec, czy dane sa w tablicy, pliku czy bazie. Serwis nie powinien znac szczegolow HTTP.

### Centralna obsluga bledow

Zamiast powtarzac `try/catch` w kazdym endpointcie, mozna uzyc error middleware:

```js
app.use((error, req, res, next) => {
  res.status(error.statusCode ?? 500).json({
    error: {
      message: error.message,
    },
  });
});
```

W NestJS podobna idee zobaczysz w exception filters i wbudowanych wyjatkach.

## Praktyka prowadzona

Zainstaluj Express:

```powershell
npm install express
```

Proponowana struktura:

```text
src/
  app.js
  server.js
  tasks/
    tasks.router.js
    tasks.service.js
    tasks.repository.js
```

`src/app.js`:

```js
const express = require('express');
const { tasksRouter } = require('./tasks/tasks.router');

const app = express();

app.use(express.json());

app.use((req, res, next) => {
  console.log(`${req.method} ${req.path}`);
  next();
});

app.use('/tasks', tasksRouter);

app.use((req, res) => {
  res.status(404).json({
    error: {
      message: 'Route not found',
      code: 'ROUTE_NOT_FOUND',
    },
  });
});

app.use((error, req, res, next) => {
  res.status(error.statusCode ?? 500).json({
    error: {
      message: error.message,
      code: error.code ?? 'INTERNAL_ERROR',
    },
  });
});

module.exports = { app };
```

`src/server.js`:

```js
const { app } = require('./app');

const port = process.env.PORT ?? 3000;

app.listen(port, () => {
  console.log(`API listening on http://localhost:${port}`);
});
```

## Zadania samodzielne

1. Zaimplementuj `tasks.repository.js` na tablicy w pamieci.
2. Zaimplementuj `tasks.service.js` z metodami:
   - `listTasks(filters)`,
   - `getTask(id)`,
   - `createTask(input)`,
   - `updateTask(id, input)`,
   - `deleteTask(id)`.
3. Zaimplementuj `tasks.router.js`.
4. Dodaj query params:
   - `done`,
   - `search`,
   - `limit`.
5. Dodaj centralny blad `AppError`.
6. Dodaj middleware, ktory mierzy czas requestu i wypisuje go w logu.

## Kryteria zaliczenia

Modul jest zaliczony, gdy:

- endpointy CRUD dzialaja,
- router nie zawiera logiki biznesowej,
- service nie uzywa `req` ani `res`,
- bledy sa obslugiwane centralnie,
- potrafisz wymienic trzy warstwy i ich odpowiedzialnosci.

## Pytania kontrolne

- Dlaczego nie warto pisac calej logiki w routerze?
- Co sie stanie, jesli middleware nie wywola `next()` i nie zwroci odpowiedzi?
- Gdzie powinno byc sprawdzenie, ze tytul zadania nie jest pusty?
- Dlaczego Express jest prosty, ale nie zawsze wystarczajacy strukturalnie?

