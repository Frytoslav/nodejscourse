# Modul 12: Testy, konfiguracja i obserwowalnosc

## Cel modulu

Backend bez testow i logow jest trudny do utrzymania. Ten modul uczy, jak sprawdzac logike, endpointy i konfiguracje, oraz jak zostawiac sobie slady potrzebne do diagnozowania problemow.

Po module umiesz:

- pisac testy jednostkowe serwisow,
- pisac testy e2e endpointow,
- rozumiec mocki i test doubles,
- konfigurac aplikacje przez env,
- walidowac konfiguracje,
- dodac sensowne logi,
- przygotowac health check.

## Teoria

### Piramida testow

W backendzie zwykle masz:

- testy jednostkowe: szybkie, sprawdzaja mala logike,
- testy integracyjne: sprawdzaja wspolprace z baza albo modulami,
- testy e2e: sprawdzaja API tak, jak klient.

Nie wszystko musi byc e2e. Jesli funkcja liczy postep kursu, test jednostkowy bedzie szybszy i czytelniejszy.

### Co testowac

Testuj rzeczy, ktore moga sie popsuc i maja znaczenie:

- reguly domenowe,
- walidacje,
- uprawnienia,
- transakcje,
- format odpowiedzi,
- przypadki bledow.

Nie pisz testu tylko po to, zeby pokryc linie. Test ma dawac zaufanie.

### Mocki

Mock to podstawiona zaleznosc. W testach serwisu mozesz podstawic fake repository albo mock Prisma, zeby nie odpalac calej bazy.

Zasada:

- logike domenowa testuj bez infrastruktury,
- integracje z infrastruktura testuj osobno.

### Konfiguracja

Aplikacja powinna rozniac sie miedzy development, test i production przez konfiguracje, nie przez zmiany w kodzie.

Typowe zmienne:

- `NODE_ENV`,
- `PORT`,
- `DATABASE_URL`,
- `JWT_SECRET`,
- `JWT_EXPIRES_IN`,
- `CORS_ORIGIN`.

W NestJS warto uzyc `@nestjs/config` i walidacji env.

### Obserwowalnosc

Obserwowalnosc to mozliwosc zrozumienia, co dzieje sie w systemie.

Na tym etapie wystarcza:

- log requestow,
- log bledow,
- request id,
- health endpoint,
- metryki jako temat dodatkowy.

## Praktyka prowadzona

Test funkcji domenowej:

```ts
export function calculateProgress(completedLessons: number, totalLessons: number): number {
  if (totalLessons === 0) {
    return 0;
  }

  return Math.round((completedLessons / totalLessons) * 100);
}
```

Test:

```ts
describe('calculateProgress', () => {
  it('returns 0 when course has no lessons', () => {
    expect(calculateProgress(0, 0)).toBe(0);
  });

  it('returns rounded percent', () => {
    expect(calculateProgress(2, 3)).toBe(67);
  });
});
```

Konfiguracja:

```powershell
npm install @nestjs/config
```

W `AppModule`:

```ts
ConfigModule.forRoot({
  isGlobal: true,
});
```

## Zadania samodzielne

1. Dodaj testy jednostkowe dla:
   - zapisu na kurs,
   - ukonczenia lekcji,
   - liczenia postepu.
2. Dodaj test e2e dla rejestracji i logowania.
3. Dodaj test e2e, ktory sprawdza, ze endpoint admina zwraca `403` dla studenta.
4. Dodaj `ConfigModule` i przenies sekrety do env.
5. Dodaj walidacje wymaganych zmiennych srodowiskowych.
6. Dodaj `GET /health`.
7. Dodaj middleware albo interceptor logujacy request method, path, status i czas.

## Kryteria zaliczenia

Modul jest zaliczony, gdy:

- testy jednostkowe przechodza,
- test e2e obejmuje przynajmniej auth,
- aplikacja nie startuje bez wymaganych env,
- logi pomagaja znalezc problem,
- health endpoint zwraca stan aplikacji,
- potrafisz wyjasnic, kiedy test jednostkowy jest lepszy niz e2e.

## Pytania kontrolne

- Co powinien testowac serwis, a co endpoint e2e?
- Dlaczego testy uprawnien sa wazne?
- Dlaczego konfiguracja powinna byc walidowana na starcie?
- Co powinno znalezc sie w logu requestu?

