# Modul 13: Architektura wiekszej aplikacji, kolejki, cache i pliki

## Cel modulu

Gdy aplikacja rosnie, problemem nie jest juz samo napisanie endpointu. Problemem jest utrzymanie granic modulow, unikniecie duplikacji i obsluga zadan, ktore nie powinny blokowac requestu. Ten modul pokazuje elementy dojrzalszego backendu.

Po module umiesz:

- projektowac moduly wedlug odpowiedzialnosci,
- rozumiec podstawy architektury warstwowej i modulowej,
- dodac cache tam, gdzie ma sens,
- zrozumiec kolejki zadan,
- obslugiwac upload plikow,
- rozdzielac synchroniczne API od pracy w tle.

## Teoria

### Granice modulow

Modul powinien miec jasny powod istnienia. `CoursesModule` odpowiada za kursy, `AuthModule` za auth, `UsersModule` za uzytkownikow.

Zly zapach:

- serwis kursow zaczyna wysylac maile bezposrednio,
- kontroler robi zapytania do Prisma,
- modul importuje wszystko ze wszystkiego,
- DTO sa wspoldzielone bez namyslu miedzy roznymi kontekstami.

Lepszy kierunek:

- osobny `NotificationsModule`,
- jawne metody publiczne serwisow,
- eventy albo kolejki dla pracy w tle,
- kontrakty miedzy modulami.

### Cache

Cache przyspiesza odczyt danych, ale komplikuje spojność.

Cache ma sens dla:

- publicznej listy opublikowanych kursow,
- statystyk,
- drogich zapytan,
- danych rzadko zmienianych.

Cache jest ryzykowny dla:

- uprawnien,
- danych prywatnych,
- danych czesto zmienianych,
- informacji finansowych.

### Kolejki

Nie kazda praca powinna dzialac w request-response.

Przyklady pracy w tle:

- wysylka maila po rejestracji,
- generowanie raportu,
- przetwarzanie uploadu,
- przeliczenie statystyk kursu,
- powiadomienie instruktora o nowym zadaniu.

Kolejka pozwala zapisac zadanie i wykonac je osobno. Popularny zestaw w NestJS to BullMQ i Redis.

### Upload plikow

Upload plikow wymaga decyzji:

- gdzie trzymasz pliki,
- jakie typy akceptujesz,
- jaki jest limit rozmiaru,
- kto moze pobrac plik,
- czy plik ma byc publiczny,
- czy skanujesz go albo przetwarzasz.

Na start mozesz trzymac pliki lokalnie w development, ale produkcyjnie czesto uzywa sie storage typu S3.

### Dokumentowanie decyzji

Wieksza aplikacja potrzebuje krotkich decyzji architektonicznych. Nie musza byc formalne. Wystarczy `docs/decisions/001-auth.md`:

```md
# 001: JWT access token

Decyzja: uzywamy JWT access tokenow dla API.

Powod:
- API jest stateless.
- Frontend moze wysylac token w headerze Authorization.

Konsekwencje:
- Musimy pilnowac wygasania tokenu.
- Nie wkladamy wrazliwych danych do payloadu.
```

## Praktyka prowadzona

Dodaj `NotificationsModule`:

- `NotificationsService`,
- metoda `sendWelcomeEmail(user)`,
- na poczatku tylko loguje komunikat.

Przy rejestracji wywolaj serwis powiadomien, ale nie mieszaj kodu maila w `AuthService`.

Dodaj decyzje:

```text
docs/decisions/001-notifications-module.md
```

Opisz, dlaczego powiadomienia sa osobnym modulem.

## Zadania samodzielne

1. Dodaj cache dla `GET /courses/public`.
2. Dodaj endpoint uploadu avatara uzytkownika.
3. Dodaj limit rozmiaru pliku.
4. Dodaj walidacje typu pliku.
5. Dodaj kolejke `notifications` albo zasymuluj ja interfejsem, jesli nie chcesz jeszcze uruchamiac Redis.
6. Po rejestracji dodaj zadanie wysylki maila do kolejki.
7. Dodaj dokument decyzji architektonicznej dla cache.
8. Dodaj test, ktory sprawdza, ze `AuthService` nie wysyla maila bezposrednio, tylko korzysta z serwisu powiadomien albo kolejki.

## Kryteria zaliczenia

Modul jest zaliczony, gdy:

- moduly maja jasne odpowiedzialnosci,
- cache jest dodany tylko do bezpiecznego odczytu,
- upload ma limit i walidacje,
- powiadomienia sa oddzielone od auth,
- potrafisz opisac koszt cache i kolejek,
- masz przynajmniej jedna zapisana decyzje architektoniczna.

## Pytania kontrolne

- Kiedy cache moze zwrocic niebezpiecznie nieaktualne dane?
- Dlaczego wysylka maila nie powinna blokowac rejestracji?
- Co powinno byc sprawdzone przy uploadzie pliku?
- Jak poznasz, ze modul ma zbyt wiele odpowiedzialnosci?

