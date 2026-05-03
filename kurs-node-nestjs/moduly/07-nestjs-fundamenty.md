# Modul 07: NestJS: fundamenty

## Cel modulu

Wchodzisz do NestJS. Teraz wiele rzeczy, ktore robiles recznie w Express, dostaje formalna strukture: moduly, kontrolery, providery, dependency injection i dekoratory.

Po module umiesz:

- stworzyc projekt NestJS,
- zrozumiec role `Module`, `Controller` i `Injectable`,
- wygenerowac zasob CLI,
- napisac prosty CRUD,
- wstrzyknac serwis do kontrolera,
- porownac NestJS z Express.

## Teoria

### NestJS jako architektura aplikacji

NestJS jest frameworkiem do budowania skalowalnych aplikacji serwerowych w Node.js. Uzywa TypeScriptu, dekoratorow i dependency injection. Domyslnie dziala na Express, ale moze tez uzywac Fastify.

Najwazniejsza zmiana po Express:

- Express daje Ci narzedzia.
- NestJS daje Ci narzedzia i architekture.

### Modul

Modul grupuje powiazane elementy aplikacji.

```ts
@Module({
  controllers: [TasksController],
  providers: [TasksService],
})
export class TasksModule {}
```

Kazda wieksza funkcja aplikacji powinna miec wlasny modul: `UsersModule`, `AuthModule`, `CoursesModule`.

### Kontroler

Kontroler zna HTTP. Odbiera request, wywoluje serwis i zwraca wynik.

```ts
@Controller('tasks')
export class TasksController {
  constructor(private readonly tasksService: TasksService) {}

  @Get()
  findAll() {
    return this.tasksService.findAll();
  }
}
```

Kontroler nie powinien trzymac logiki biznesowej.

### Provider i service

Provider to klasa zarzadzana przez kontener NestJS. Najczesciej bedzie to service.

```ts
@Injectable()
export class TasksService {
  findAll() {
    return [];
  }
}
```

Nest tworzy instancje i wstrzykuje zaleznosci przez konstruktor.

### Dependency injection

Dependency injection oznacza, ze klasa nie tworzy swoich zaleznosci samodzielnie. Dostaje je z zewnatrz.

Zamiast:

```ts
class TasksController {
  private tasksService = new TasksService();
}
```

masz:

```ts
class TasksController {
  constructor(private readonly tasksService: TasksService) {}
}
```

Dzieki temu latwiej testowac, podmieniac implementacje i utrzymac porzadek.

## Praktyka prowadzona

Utworz projekt:

```powershell
npm i -g @nestjs/cli
nest new skillforge-api --strict
```

Alternatywnie bez globalnej instalacji:

```powershell
npx @nestjs/cli new skillforge-api --strict
```

W projekcie:

```powershell
npm run start:dev
```

Wygeneruj zasob:

```powershell
npx nest generate resource tasks
```

Wybierz REST API i potwierdz generowanie CRUD.

## Zadania samodzielne

1. Przejrzyj wygenerowane pliki i opisz role kazdego z nich.
2. Zmien `TasksService`, aby trzymal zadania w tablicy w pamieci.
3. Zaimplementuj:
   - `findAll`,
   - `findOne`,
   - `create`,
   - `update`,
   - `remove`.
4. Dodaj `CoursesModule` recznie, bez generatora.
5. Dodaj endpoint `GET /health`, ktory zwraca status aplikacji.
6. Porownaj strukture z Express z modulu 05.

## Kryteria zaliczenia

Modul jest zaliczony, gdy:

- aplikacja NestJS startuje,
- masz dzialajacy CRUD z danymi w pamieci,
- rozumiesz role modulu, kontrolera i serwisu,
- potrafisz wytlumaczyc dependency injection,
- potrafisz stworzyc modul recznie.

## Pytania kontrolne

- Dlaczego kontroler nie powinien zawierac logiki biznesowej?
- Co robi `@Injectable()`?
- Po co aplikacji moduly?
- Jak NestJS wie, jaka klase wstrzyknac do konstruktora?

