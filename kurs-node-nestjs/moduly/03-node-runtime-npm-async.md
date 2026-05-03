# Modul 03: Node.js runtime, npm i asynchronicznosc

## Cel modulu

Node.js to nie tylko "JavaScript na serwerze". To runtime z wlasnym modelem I/O, modulem plikow, procesem, zmiennymi srodowiskowymi i event loop. Ten modul buduje intuicje potrzebna do API, baz danych i NestJS.

Po module umiesz:

- wyjasnic, czym Node rozni sie od przegladarki,
- uzywac `fs/promises`,
- czytac zmienne srodowiskowe,
- instalowac i importowac paczki,
- rozumiec `Promise` i `async/await`,
- obslugiwac bledy asynchroniczne.

## Teoria

### Runtime

Runtime to srodowisko, w ktorym wykonuje sie kod. Przegladarka daje API takie jak `document`, `window` i `fetch`. Node daje API takie jak `fs`, `http`, `path`, `process` i dostep do systemu plikow.

W backendzie czesto operujesz na rzeczach, ktore trwaja:

- odczyt pliku,
- zapytanie do bazy,
- request do innego API,
- hashowanie hasla,
- wysylka maila.

Dlatego asynchronicznosc jest fundamentem.

### Event loop w praktyce

Node obsluguje wiele operacji I/O bez tworzenia osobnego watku dla kazdego requestu. Gdy czekasz na plik albo baze, Node moze obsluzyc inne rzeczy. To nie znaczy, ze CPU jest magicznie szybszy. Ciezkie obliczenia nadal blokuja proces.

Praktyczna zasada:

- I/O robimy asynchronicznie,
- nie blokujemy glownego watku dlugimi petlami,
- bledy w `async` lapiesz przez `try/catch`,
- kazdy `await` oznacza miejsce, w ktorym moze pojawic sie blad.

### npm i paczki

Paczka to cudzy albo Twoj modul opublikowany do uzycia przez projekty. Instalujesz ja, bo nie chcesz pisac od zera loggera, frameworka, walidatora czy klienta bazy.

Ale kazda paczka to koszt:

- trzeba ja aktualizowac,
- moze miec podatnosci,
- moze zmienic API,
- moze byc nadmiarowa.

Na poczatku instaluj paczki swiadomie i zapisuj, po co sa w projekcie.

### Zmienne srodowiskowe

Konfiguracja nie powinna byc zaszyta w kodzie. Port, adres bazy, sekrety JWT i tryb aplikacji powinny przychodzic ze srodowiska.

```js
const port = process.env.PORT ?? '3000';
```

Nigdy nie commituj prawdziwych sekretow.

## Praktyka prowadzona

Stworz `src/storage.js`:

```js
const fs = require('node:fs/promises');
const path = require('node:path');

const filePath = path.join(__dirname, '..', 'tasks.json');

async function readTasks() {
  try {
    const content = await fs.readFile(filePath, 'utf8');
    return JSON.parse(content);
  } catch (error) {
    if (error.code === 'ENOENT') {
      return [];
    }

    throw error;
  }
}

async function writeTasks(tasks) {
  const content = JSON.stringify(tasks, null, 2);
  await fs.writeFile(filePath, content);
}

module.exports = {
  readTasks,
  writeTasks,
};
```

Stworz `src/index.js`:

```js
const { readTasks, writeTasks } = require('./storage');

async function main() {
  const tasks = await readTasks();
  const nextTask = {
    id: Date.now(),
    title: 'Persist data in a file',
    done: false,
  };

  await writeTasks([...tasks, nextTask]);

  console.log('Saved task:', nextTask);
}

main().catch((error) => {
  console.error(error);
  process.exit(1);
});
```

## Zadania samodzielne

1. Dodaj funkcje `findTaskById(id)`, ktora czyta dane z pliku.
2. Dodaj funkcje `deleteTask(id)`.
3. Dodaj walidacje, ze tytul nie moze byc pusty.
4. Dodaj zmienna `DATA_FILE`, ktora pozwala wskazac inna sciezke pliku.
5. Celowo popsuj JSON w pliku i obsluz blad czytelnym komunikatem.

## Kryteria zaliczenia

Modul jest zaliczony, gdy:

- potrafisz czytac i zapisac JSON w pliku,
- rozumiesz, dlaczego `await` musi byc w funkcji `async`,
- potrafisz uzyc `try/catch` dla operacji asynchronicznej,
- wiesz, czym jest `process.env`,
- potrafisz wyjasnic, dlaczego plik JSON nie jest dobra baza produkcyjna.

## Pytania kontrolne

- Co sie stanie, gdy zapomnisz `await`?
- Dlaczego `JSON.parse` moze rzucic blad?
- Czym rozni sie blad braku pliku od bledu niepoprawnego JSON?
- Dlaczego sekrety nie powinny byc w kodzie?

