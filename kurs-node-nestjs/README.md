# Kurs Node.js i NestJS od zera do projektu backendowego

Ten kurs jest zaprojektowany dla osoby, ktora zaczyna przygode z backendem. Nie zaklada znajomosci NestJS ani profesjonalnych wzorcow backendowych. Zaklada tylko podstawowa orientacje w JavaScript albo gotowosc do spokojnego przejscia przez fundamenty.

Stan rekomendacji wersji: 2026-05-03. Do nauki i nowych projektow uzywaj aktywnej wersji LTS Node.js. Wedlug oficjalnej strony Node.js linie LTS sa przeznaczone do aplikacji produkcyjnych, a obecnie warto celowac w Node.js 24 LTS albo nowsza aktywna LTS, gdy czytasz ten kurs pozniej.

## Jak pracowac z kursem

Kazdy modul ma cztery warstwy:

- **Teoria**: pojecia, ktore trzeba zrozumiec przed pisaniem kodu.
- **Praktyka prowadzona**: male cwiczenia, ktore buduja intuicje.
- **Zadania samodzielne**: sprawdzaja, czy umiesz zastosowac temat bez przepisywania.
- **Kryteria zaliczenia**: konkretna lista tego, co powinno dzialac.

Najlepszy rytm:

1. Przeczytaj modul raz bez kodowania.
2. Zrob praktyke prowadzona.
3. Zrob zadania samodzielne bez zagladania do gotowych rozwiazan.
4. Zapisz wlasnymi slowami 3-5 rzeczy, ktore zrozumiales.
5. Dopiero potem przejdz do kolejnego modulu.

## Sciezka modulow

| Modul | Temat | Efekt |
| --- | --- | --- |
| 00 | [Jak pracowac z kursem](moduly/00-jak-pracowac-z-kursem.md) | Umiesz planowac nauke, debugowac i prowadzic dziennik postepow. |
| 01 | [Srodowisko, terminal i Git](moduly/01-srodowisko-terminal-git.md) | Masz gotowe narzedzia i potrafisz uruchamiac projekty. |
| 02 | [JavaScript dla backendu](moduly/02-javascript-dla-backendu.md) | Rozumiesz skladnie, funkcje, obiekty, tablice, bledy i moduly. |
| 03 | [Node.js runtime, npm i asynchronicznosc](moduly/03-node-runtime-npm-async.md) | Wiesz, czym Node rozni sie od przegladarki i jak dziala event loop. |
| 04 | [HTTP i pierwsze API bez frameworka](moduly/04-http-api-bez-frameworka.md) | Budujesz proste API na natywnym module `http`. |
| 05 | [Express i warstwy aplikacji](moduly/05-express-warstwy-aplikacji.md) | Tworzysz REST API z routingiem, middleware i prostym podzialem kodu. |
| 06 | [TypeScript w backendzie](moduly/06-typescript-w-backendzie.md) | Piszesz typowane modele, DTO i funkcje serwisowe. |
| 07 | [NestJS: fundamenty](moduly/07-nestjs-fundamenty.md) | Rozumiesz moduly, kontrolery, providery i dependency injection. |
| 08 | [DTO, walidacja, bledy i kontrakty API](moduly/08-dto-walidacja-bledy-kontrakty.md) | Chronisz API przed zlymi danymi i zwracasz przewidywalne bledy. |
| 09 | [Baza danych z Prisma i PostgreSQL](moduly/09-baza-danych-prisma-postgresql.md) | Modelujesz dane, robisz migracje i CRUD na prawdziwej bazie. |
| 10 | [Relacje, transakcje i logika domenowa](moduly/10-relacje-transakcje-logika-domenowa.md) | Projektujesz bardziej realistyczne procesy biznesowe. |
| 11 | [Autoryzacja, uwierzytelnianie i bezpieczenstwo](moduly/11-auth-bezpieczenstwo.md) | Dodajesz logowanie, JWT, role, hashowanie i podstawowe zabezpieczenia. |
| 12 | [Testy, konfiguracja i obserwowalnosc](moduly/12-testy-konfiguracja-obserwowalnosc.md) | Piszesz testy jednostkowe/e2e, konfigurujesz env i logi. |
| 13 | [Architektura wiekszej aplikacji](moduly/13-architektura-kolejki-cache-pliki.md) | Dodajesz kolejki, cache, upload plikow i modulowa architekture. |
| 14 | [Dokumentacja API, Docker i wdrozenie](moduly/14-dokumentacja-docker-wdrozenie.md) | Przygotowujesz projekt do uruchomienia poza swoim komputerem. |

Po modulach przejdz do [projektu koncowego](projekt-koncowy.md). Do monitorowania nauki uzywaj [checklisty postepow](checklista-postepow.md).

Dodatkowe pliki:

- [Plan nauki na 12 tygodni](plan-nauki-12-tygodni.md)
- [Rubryka oceny projektu koncowego](rubryka-oceny-projektu.md)
- [Materialy i zrodla](materialy-i-zrodla.md)

## Glowny projekt kursowy

W trakcie kursu budujesz coraz dojrzalsze API. Najpierw bedzie to prosta aplikacja notatek i zadan, potem API w Express, a finalnie pelny projekt NestJS:

**SkillForge API** - backend platformy kursow i zadan.

Projekt koncowy obejmuje:

- konta uzytkownikow, logowanie i role,
- kursy, lekcje, zadania i postep kursanta,
- komentarze, oceny i statusy zadan,
- panel admina w API,
- walidacje, paginacje, filtrowanie i sortowanie,
- PostgreSQL, Prisma, migracje i transakcje,
- testy jednostkowe i e2e,
- dokumentacje OpenAPI,
- Docker i gotowosc do wdrozenia.

## Minimalne narzedzia

- Node.js LTS.
- npm, pnpm albo yarn. W kursie domyslnie uzywamy npm, bo jest dostepny razem z Node.
- Git.
- Edytor kodu, np. WebStorm albo VS Code.
- PostgreSQL lokalnie albo przez Docker.
- Narzedzie do testowania HTTP, np. Postman, Insomnia albo rozszerzenie REST Client.

## Zasada najwazniejsza

Nie uczysz sie NestJS po to, zeby znac dekoratory. Uczysz sie go po to, zeby umiec projektowac backend, ktory ma jasne kontrakty, przewidywalne bledy, testowalna logike, bezpieczne dane i strukture, ktora nie rozpada sie po dodaniu dziesiatej funkcji.
