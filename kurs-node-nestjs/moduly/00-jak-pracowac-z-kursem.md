# Modul 00: Jak pracowac z kursem

## Cel modulu

Zanim zaczniesz pisac backend, ustaw sobie sposob pracy. Poczatkujacy czesto probuja "przerobic material", ale backendu nie da sie nauczyc jak listy definicji. Trzeba regularnie budowac male rzeczy, psuc je, debugowac, poprawiac i dopiero wtedy przechodzic dalej.

Po tym module masz wiedziec:

- jak przechodzic przez lekcje,
- jak robic notatki techniczne,
- jak zadawac sobie pytania kontrolne,
- jak nie utknac na bladzie przez trzy godziny,
- kiedy isc dalej, a kiedy zatrzymac sie i powtorzyc temat.

## Teoria

### Backend jako zestaw odpowiedzialnosci

Backend to nie tylko "serwer". Backend przyjmuje zadania od klienta, sprawdza dane, wykonuje logike, komunikuje sie z baza, pilnuje uprawnien, zwraca odpowiedzi i zapisuje zdarzenia. Dobra aplikacja backendowa jest przewidywalna: wiadomo, gdzie znajduje sie logika, gdzie walidacja, gdzie dostep do danych i jak API reaguje na bledy.

W tym kursie bedziesz wracal do tych samych pytan:

- Kto moze wykonac ta operacje?
- Jakie dane sa potrzebne?
- Co jest poprawnym wynikiem?
- Co moze pojsc zle?
- Czy blad jest bledem klienta, serwera, czy stanu danych?
- Czy te logike da sie przetestowac bez uruchamiania calej aplikacji?

### Nauka spiralna

Nie zaczynamy od NestJS, bo wtedy dekoratory wygladaja jak magia. Najpierw zobaczysz HTTP bez frameworka, potem Express, potem TypeScript, a dopiero pozniej NestJS. Dzieki temu zrozumiesz, co framework robi za Ciebie.

Ta sama idea bedzie wracac kilka razy:

1. Najpierw prosta wersja w pamieci.
2. Potem wersja z plikami albo prosta struktura danych.
3. Potem prawdziwa baza danych.
4. Potem walidacja, auth i testy.
5. Na koncu architektura wiekszej aplikacji.

### Dziennik backendowy

Po kazdym module dopisz krotka notatke w pliku `notes.md` w swoim projekcie cwiczeniowym:

```md
## Modul 03

Co zrozumialem:
- ...

Co bylo trudne:
- ...

Blad, ktory naprawilem:
- ...

Jedno pytanie na pozniej:
- ...
```

Nie chodzi o ladna dokumentacje. Chodzi o to, zebys widzial, jak rosnie Twoje rozumienie.

### Debugowanie bez paniki

Gdy cos nie dziala, idz wedlug prostego schematu:

1. Przeczytaj pierwszy realny blad, nie ostatnia linijke stack trace.
2. Sprawdz plik i linie z bledu.
3. Wypisz wartosci, ktorych jestes pewien.
4. Zmniejsz problem do najmniejszego fragmentu.
5. Zadaj pytanie: "czy to blad danych, typu, importu, konfiguracji, czy kolejki wykonania?"

Najczestszy blad poczatkujacych to zmienianie kilku rzeczy naraz. Zmieniaj jedna rzecz, uruchom, sprawdz wynik.

## Praktyka prowadzona

1. Utworz katalog `sandbox`.
2. W nim utworz `notes.md`.
3. Dopisz sekcje dla modulu 00.
4. Utworz plik `debug-checklist.md` z wlasna wersja procesu debugowania.
5. Zrob pierwszy commit, np. `init course notes`.

## Zadania samodzielne

1. Napisz wlasnymi slowami, czym backend rozni sie od frontendu.
2. Wypisz 5 rzeczy, ktore backend musi sprawdzic przed zapisaniem danych uzytkownika.
3. Opisz sytuacje, w ktorej blad powinien miec status 400, 401, 403, 404 i 500.
4. Ustal swoje tempo: ile modulow tygodniowo realnie zrobisz, jezeli kazdy ma kod i zadania?

## Kryteria zaliczenia

Modul jest zaliczony, gdy:

- masz plik notatek,
- masz wlasna checkliste debugowania,
- potrafisz powiedziec, po co kurs zaczyna sie od Node i HTTP, a nie od NestJS,
- rozumiesz, ze zadania praktyczne sa obowiazkowa czescia nauki.

## Pytania kontrolne

- Dlaczego framework nie powinien byc pierwsza rzecza, ktorej uczysz sie w backendzie?
- Co oznacza "kontrakt API"?
- Dlaczego warto robic male commity?
- Jak poznasz, ze mozesz przejsc do kolejnego modulu?

