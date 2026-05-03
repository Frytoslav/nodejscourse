# Modul 02: JavaScript dla backendu

## Cel modulu

Ten modul porzadkuje JavaScript potrzebny do backendu. Nie chodzi o animacje, DOM ani przegladarke. Chodzi o dane, funkcje, transformacje, bledy i modularyzacje.

Po module umiesz:

- pracowac z obiektami i tablicami,
- pisac funkcje czyste i funkcje z efektami ubocznymi,
- uzywac metod tablicowych,
- obslugiwac bledy,
- dzielic kod na moduly,
- myslec o danych tak, jak backend mysli o requestach i rekordach.

## Teoria

### Dane w backendzie

Backend ciagle przetwarza dane:

- body requestu,
- parametry sciezki,
- query params,
- rekordy z bazy,
- tokeny,
- konfiguracje,
- wyniki z innych serwisow.

Dlatego musisz sprawnie pracowac na obiektach i tablicach.

```js
const user = {
  id: 'u1',
  email: 'ada@example.com',
  role: 'student',
  isActive: true,
};

const { email, role } = user;
```

Destrukturyzacja, spread i rest to codzienne narzedzia:

```js
const publicUser = {
  id: user.id,
  email: user.email,
};

const updatedUser = {
  ...user,
  isActive: false,
};
```

### Funkcje czyste i efekty uboczne

Funkcja czysta dla tych samych danych wejsciowych zawsze zwraca ten sam wynik i nie zmienia swiata zewnetrznego.

```js
function calculateDiscount(price, percent) {
  return price * (percent / 100);
}
```

Efekt uboczny to np. zapis do pliku, zapytanie do bazy, wyslanie maila albo `console.log`.

W backendzie chcesz miec logike biznesowa mozliwie czysta, bo wtedy latwo ja testowac. Efekty uboczne zamykasz w osobnych miejscach, np. repository, mailerze albo kliencie HTTP.

### Metody tablicowe

Najczesciej uzywane:

- `map`: przeksztalc kazdy element,
- `filter`: zostaw pasujace elementy,
- `find`: znajdz pierwszy element,
- `some`: czy istnieje pasujacy element,
- `every`: czy wszystkie spelniaja warunek,
- `reduce`: zbuduj jedna wartosc z wielu.

```js
const tasks = [
  { id: 1, title: 'Learn Node', done: true },
  { id: 2, title: 'Build API', done: false },
];

const openTasks = tasks.filter((task) => !task.done);
const taskTitles = tasks.map((task) => task.title);
```

### Bledy

Nie kazdy blad jest taki sam:

- blad programisty: literowka, zly import, `undefined`,
- blad danych: uzytkownik wyslal zle body,
- blad stanu: probujesz usunac cos, co nie istnieje,
- blad infrastruktury: baza nie odpowiada.

Na poczatku ucz sie jawnie rzucac i lapac bledy:

```js
function findTaskOrThrow(tasks, id) {
  const task = tasks.find((item) => item.id === id);

  if (!task) {
    throw new Error('Task not found');
  }

  return task;
}
```

## Praktyka prowadzona

Stworz plik `src/tasks.js`:

```js
const tasks = [
  { id: 1, title: 'Read about HTTP', done: false, priority: 'high' },
  { id: 2, title: 'Install Node', done: true, priority: 'medium' },
  { id: 3, title: 'Create API plan', done: false, priority: 'low' },
];

function listOpenTasks(items) {
  return items.filter((task) => !task.done);
}

function markTaskDone(items, id) {
  return items.map((task) => {
    if (task.id !== id) {
      return task;
    }

    return {
      ...task,
      done: true,
    };
  });
}

console.log(listOpenTasks(tasks));
console.log(markTaskDone(tasks, 1));
```

Uruchom:

```powershell
node src/tasks.js
```

## Zadania samodzielne

1. Dodaj funkcje `findTaskById(tasks, id)`.
2. Dodaj funkcje `removeTask(tasks, id)`, ktora nie mutuje oryginalnej tablicy.
3. Dodaj funkcje `countTasksByPriority(tasks)`, ktora zwraca obiekt z licznikami.
4. Dodaj blad, gdy `title` nowego zadania jest pusty.
5. Podziel kod na dwa pliki: `tasks.service.js` i `index.js`.

## Kryteria zaliczenia

Modul jest zaliczony, gdy:

- zadania sa rozwiazane bez mutowania oryginalnej tablicy,
- potrafisz wyjasnic roznice miedzy `map` i `forEach`,
- potrafisz wskazac, ktore funkcje sa czyste,
- potrafisz rzucic blad dla niepoprawnych danych,
- kod jest podzielony na moduly.

## Pytania kontrolne

- Dlaczego backend czesto zwraca kopie obiektu bez pola `password`?
- Co oznacza "mutacja danych"?
- Kiedy `reduce` ma sens, a kiedy lepiej uzyc prostszej metody?
- Dlaczego warto oddzielic walidacje danych od zapisu danych?

