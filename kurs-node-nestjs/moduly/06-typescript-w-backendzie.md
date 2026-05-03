# Modul 06: TypeScript w backendzie

## Cel modulu

NestJS jest zbudowany wokol TypeScriptu. Ten modul uczy TypeScriptu praktycznie: jako narzedzia do opisywania danych, kontraktow funkcji i granic miedzy warstwami aplikacji.

Po module umiesz:

- skonfigurowac TypeScript w projekcie Node,
- typowac funkcje, obiekty i tablice,
- uzywac `type`, `interface`, union types i generics,
- rozroznic typy runtime od typow compile-time,
- projektowac DTO,
- unikac najczestszych pulapek `any`.

## Teoria

### TypeScript nie dziala w runtime

TypeScript sprawdza kod przed uruchomieniem. Po kompilacji typy znikaja. To bardzo wazne w backendzie: jezeli klient wysle zle JSON body, TypeScript sam tego nie zatrzyma. Do danych z zewnatrz potrzebujesz walidacji runtime.

Przyklad:

```ts
type CreateTaskInput = {
  title: string;
};

function createTask(input: CreateTaskInput) {
  return {
    id: Date.now(),
    title: input.title,
    done: false,
  };
}
```

To chroni Ciebie podczas pisania kodu, ale nie sprawdza automatycznie requestu HTTP.

### Typy jako dokumentacja decyzji

Dobre typy mowia, jakie dane sa legalne.

```ts
type TaskStatus = 'todo' | 'in_progress' | 'done';

type Task = {
  id: string;
  title: string;
  status: TaskStatus;
  createdAt: Date;
};
```

Zamiast `status: string`, uzywasz union type. Dzieki temu nie da sie przypadkiem ustawic `finished`, jesli Twoja domena zna tylko `done`.

### Interface czy type

Na start przyjmij prosta zasade:

- `type` dla aliasow, union types i kompozycji,
- `interface` dla ksztaltu obiektow, zwlaszcza gdy klasa ma implementowac kontrakt.

W wielu projektach oba podejscia sa mieszane. Najwazniejsza jest konsekwencja zespolu.

### DTO

DTO, czyli Data Transfer Object, opisuje dane na granicy aplikacji. Np. body do utworzenia zadania:

```ts
type CreateTaskDto = {
  title: string;
  description?: string;
};
```

DTO nie musi byc takie samo jak encja w bazie. Klient nie powinien wysylac `id`, `createdAt` ani pol technicznych.

### `unknown` lepsze niz `any`

`any` wylacza TypeScript. `unknown` mowi: "nie wiem, co to jest, musze sprawdzic".

```ts
function parseTitle(value: unknown): string {
  if (typeof value !== 'string' || value.trim() === '') {
    throw new Error('Title must be a non-empty string');
  }

  return value.trim();
}
```

To myslenie przyda sie pozniej przy walidacji requestow.

## Praktyka prowadzona

Zainstaluj TypeScript:

```powershell
npm install --save-dev typescript tsx @types/node
npx tsc --init
```

Przykladowe skrypty:

```json
{
  "scripts": {
    "dev": "tsx src/index.ts",
    "typecheck": "tsc --noEmit"
  }
}
```

Stworz `src/tasks.types.ts`:

```ts
export type TaskStatus = 'todo' | 'in_progress' | 'done';

export type Task = {
  id: string;
  title: string;
  description?: string;
  status: TaskStatus;
  createdAt: Date;
};

export type CreateTaskDto = {
  title: string;
  description?: string;
};
```

Stworz `src/tasks.service.ts`:

```ts
import { CreateTaskDto, Task } from './tasks.types';

const tasks: Task[] = [];

export function createTask(input: CreateTaskDto): Task {
  const task: Task = {
    id: crypto.randomUUID(),
    title: input.title,
    description: input.description,
    status: 'todo',
    createdAt: new Date(),
  };

  tasks.push(task);

  return task;
}
```

## Zadania samodzielne

1. Dodaj `UpdateTaskDto`, w ktorym wszystkie pola sa opcjonalne.
2. Dodaj funkcje `changeTaskStatus(id, status)`.
3. Dodaj typ `TaskListFilters` z polami `status` i `search`.
4. Dodaj funkcje `listTasks(filters)`.
5. Dodaj `typecheck` do codziennego uruchamiania.
6. Zamien wszystkie `any` na konkretne typy albo `unknown` z walidacja.

## Kryteria zaliczenia

Modul jest zaliczony, gdy:

- projekt przechodzi `npm run typecheck`,
- funkcje maja typy argumentow i wynikow,
- nie uzywasz `any` bez bardzo dobrego powodu,
- rozumiesz, ze TypeScript nie waliduje requestow w runtime,
- umiesz zaprojektowac DTO inne niz model bazodanowy.

## Pytania kontrolne

- Dlaczego TypeScript nie wystarczy do walidacji danych z requestu?
- Kiedy uzyc union type?
- Co jest zlego w `any`?
- Czym DTO rozni sie od encji?

