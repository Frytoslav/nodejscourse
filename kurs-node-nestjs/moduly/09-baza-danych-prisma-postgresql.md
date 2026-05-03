# Modul 09: Baza danych z Prisma i PostgreSQL

## Cel modulu

Dane w pamieci znikaja po restarcie. Pliki JSON nie wystarcza do aplikacji z wieloma uzytkownikami. Ten modul wprowadza relacyjna baze danych, PostgreSQL i Prisma jako narzedzie do modelowania, migracji i zapytan.

Po module umiesz:

- wyjasnic, po co backendowi baza danych,
- uruchomic PostgreSQL lokalnie albo przez Docker,
- skonfigurowac Prisma,
- stworzyc model danych,
- wykonac migracje,
- uzyc Prisma Client w NestJS,
- zaimplementowac CRUD na prawdziwej bazie.

## Teoria

### Relacyjna baza danych

PostgreSQL przechowuje dane w tabelach. Tabela ma kolumny, rekordy i ograniczenia. Relacje pozwalaja laczyc dane, np. kurs ma wiele lekcji, a uzytkownik ma wiele zapisow na kurs.

Najwazniejsze pojecia:

- tabela,
- rekord,
- klucz glowny,
- klucz obcy,
- indeks,
- unikalnosc,
- migracja.

### Prisma

Prisma sklada sie z kilku czesci:

- `schema.prisma`: model danych i konfiguracja,
- migracje: historia zmian schematu bazy,
- Prisma Client: typowany klient do zapytan,
- seed: dane startowe.

Przyklad modelu:

```prisma
model Course {
  id          String   @id @default(uuid())
  title       String
  slug        String   @unique
  description String?
  createdAt   DateTime @default(now())
  updatedAt   DateTime @updatedAt
}
```

### Migracje

Migracja to kontrolowana zmiana struktury bazy. Nie zmieniasz produkcyjnej bazy "na oko". Tworzysz migracje, przegladasz ja i uruchamiasz.

W development:

```powershell
npx prisma migrate dev
```

W produkcji zwykle:

```powershell
npx prisma migrate deploy
```

### Prisma w NestJS

Zwykle tworzysz `PrismaService`, ktory rozszerza `PrismaClient`, a potem wstrzykujesz go do serwisow domenowych.

```ts
@Injectable()
export class PrismaService extends PrismaClient {}
```

Serwis domenowy nie powinien tworzyc `new PrismaClient()` samodzielnie.

## Praktyka prowadzona

Instalacja:

```powershell
npm install prisma --save-dev
npm install @prisma/client
npx prisma init
```

Przykladowy `docker-compose.yml`:

```yaml
services:
  postgres:
    image: postgres:16
    ports:
      - "5432:5432"
    environment:
      POSTGRES_USER: skillforge
      POSTGRES_PASSWORD: skillforge
      POSTGRES_DB: skillforge
    volumes:
      - postgres_data:/var/lib/postgresql/data

volumes:
  postgres_data:
```

`DATABASE_URL`:

```env
DATABASE_URL="postgresql://skillforge:skillforge@localhost:5432/skillforge?schema=public"
```

Pierwszy model:

```prisma
model Course {
  id          String   @id @default(uuid())
  title       String
  slug        String   @unique
  description String?
  createdAt   DateTime @default(now())
  updatedAt   DateTime @updatedAt
}
```

## Zadania samodzielne

1. Dodaj model `Lesson` powiazany z `Course`.
2. Utworz migracje.
3. Dodaj `PrismaModule` i `PrismaService`.
4. Przepisz `CoursesService`, aby korzystal z bazy.
5. Dodaj obsluge bledu unikalnego slugu jako `ConflictException`.
6. Dodaj endpoint `GET /courses?search=&page=&limit=`.
7. Dodaj seed z trzema kursami i kilkoma lekcjami.

## Kryteria zaliczenia

Modul jest zaliczony, gdy:

- PostgreSQL dziala,
- migracje tworza tabele,
- CRUD kursow uzywa Prisma,
- relacja Course-Lesson dziala,
- potrafisz odtworzyc baze od zera,
- nie commitujesz pliku `.env` z sekretami.

## Pytania kontrolne

- Czym migracja rozni sie od modelu Prisma?
- Dlaczego `slug` powinien byc unikalny?
- Co sie stanie, gdy usuniesz kurs majacy lekcje?
- Dlaczego `PrismaService` powinien byc wstrzykiwany?

