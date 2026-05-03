# Projekt koncowy: SkillForge API

## Cel projektu

Projekt koncowy ma pokazac, ze potrafisz samodzielnie zbudowac backend wiekszy niz CRUD. SkillForge API to backend platformy kursow, lekcji i zadan, gdzie instruktorzy tworza kursy, kursanci zapisują sie na nie, realizuja lekcje i oddaja zadania, a administrator pilnuje systemu.

To nie musi byc produkt komercyjny. Ma byc solidnym portfolio backendowym: czytelna architektura, prawdziwa baza danych, auth, role, walidacja, testy i dokumentacja.

## Glowne role

- **Student**: zapisuje sie na kursy, konczy lekcje, oddaje zadania, komentuje.
- **Instructor**: tworzy kursy, lekcje i zadania, ocenia prace studentow.
- **Admin**: zarzadza uzytkownikami, kursami i widzi statystyki.

## Zakres funkcjonalny

### Auth i uzytkownicy

Endpointy:

- `POST /auth/register`
- `POST /auth/login`
- `GET /auth/me`
- `PATCH /users/me`
- `GET /users` tylko admin
- `PATCH /users/:id/role` tylko admin

Wymagania:

- email unikalny,
- haslo hashowane,
- JWT access token,
- role `STUDENT`, `INSTRUCTOR`, `ADMIN`,
- endpointy prywatne zabezpieczone guardami,
- odpowiedz API nigdy nie zawiera `passwordHash`.

### Kursy

Endpointy:

- `GET /courses/public`
- `GET /courses/:slug`
- `POST /courses` instructor/admin
- `PATCH /courses/:id` autor kursu/admin
- `DELETE /courses/:id` admin
- `POST /courses/:id/publish` autor/admin

Wymagania:

- kurs ma tytul, slug, opis, status, autora,
- slug jest unikalny,
- tylko opublikowane kursy sa publiczne,
- kurs nie moze zostac opublikowany bez lekcji,
- lista ma paginacje, filtrowanie i sortowanie.

### Lekcje

Endpointy:

- `POST /courses/:courseId/lessons`
- `PATCH /lessons/:id`
- `DELETE /lessons/:id`
- `POST /lessons/:id/complete`

Wymagania:

- lekcja nalezy do kursu,
- lekcja ma kolejnosc,
- student moze ukonczyc lekcje tylko w kursie, na ktory jest zapisany,
- nie da sie ukonczyc tej samej lekcji dwa razy,
- postep kursu jest liczony na podstawie ukonczonych lekcji.

### Zapisy na kurs

Endpointy:

- `POST /courses/:id/enroll`
- `GET /me/enrollments`
- `GET /courses/:id/students` instructor/admin

Wymagania:

- student nie moze zapisac sie dwa razy na ten sam kurs,
- zapis na kurs tworzy poczatkowy postep,
- operacja zapisu jest transakcja,
- instruktor widzi liste studentow swoich kursow.

### Zadania i oddania

Endpointy:

- `POST /lessons/:lessonId/assignments`
- `PATCH /assignments/:id`
- `POST /assignments/:id/submit`
- `GET /assignments/:id/submissions` instructor/admin
- `POST /submissions/:id/review`

Wymagania:

- zadanie nalezy do lekcji,
- student moze oddac zadanie tylko, jesli jest zapisany na kurs,
- oddanie ma tresc, status i opcjonalny plik,
- instruktor moze zaakceptowac, odrzucic albo poprosic o poprawki,
- statusy sa jasno zdefiniowane enumem.

### Komentarze

Endpointy:

- `POST /lessons/:lessonId/comments`
- `GET /lessons/:lessonId/comments`
- `DELETE /comments/:id`

Wymagania:

- komentowac moze zapisany student, instruktor kursu albo admin,
- autor komentarza moze usunac swoj komentarz,
- admin moze usunac kazdy komentarz,
- lista komentarzy jest paginowana.

## Proponowany model danych

Modele:

- `User`
- `Course`
- `Lesson`
- `Enrollment`
- `LessonCompletion`
- `Assignment`
- `Submission`
- `Comment`
- `UploadedFile`

Minimalne enumy:

- `UserRole`: `STUDENT`, `INSTRUCTOR`, `ADMIN`
- `CourseStatus`: `DRAFT`, `PUBLISHED`, `ARCHIVED`
- `SubmissionStatus`: `SUBMITTED`, `ACCEPTED`, `REJECTED`, `NEEDS_CHANGES`

Niezmienniki:

- `User.email` jest unikalny.
- `Course.slug` jest unikalny.
- Para `Enrollment.userId + Enrollment.courseId` jest unikalna.
- Para `LessonCompletion.userId + LessonCompletion.lessonId` jest unikalna.
- Kurs opublikowany ma co najmniej jedna lekcje.
- Student nie oddaje zadania z kursu, na ktory nie jest zapisany.

## Wymagania techniczne

Projekt powinien miec:

- NestJS z TypeScriptem w trybie strict,
- PostgreSQL,
- Prisma,
- walidacje DTO,
- globalny `ValidationPipe`,
- centralna obsluge bledow albo spójne uzycie wyjatkow NestJS,
- auth JWT,
- role i guardy,
- testy jednostkowe dla logiki domenowej,
- testy e2e dla auth i wybranych endpointow,
- Swagger/OpenAPI,
- Docker Compose,
- seed danych,
- README z instrukcja uruchomienia.

## Kamienie milowe

### Milestone 1: Szkielet projektu

Efekt:

- projekt NestJS startuje,
- Prisma jest skonfigurowana,
- PostgreSQL dziala,
- `GET /health` zwraca status,
- README opisuje start development.

### Milestone 2: Auth

Efekt:

- rejestracja,
- logowanie,
- `/auth/me`,
- JWT guard,
- role w bazie,
- hasla hashowane.

### Milestone 3: Kursy i lekcje

Efekt:

- CRUD kursow,
- lekcje kursu,
- publikacja kursu,
- publiczna lista kursow,
- paginacja i filtrowanie.

### Milestone 4: Zapisy i postep

Efekt:

- zapis na kurs,
- ukonczenie lekcji,
- liczenie postepu,
- transakcje,
- testy logiki postepu.

### Milestone 5: Zadania i oddania

Efekt:

- instruktor tworzy zadania,
- student oddaje zadanie,
- instruktor recenzuje,
- statusy oddan dzialaja,
- uprawnienia sa testowane.

### Milestone 6: Komentarze, pliki i powiadomienia

Efekt:

- komentarze do lekcji,
- upload pliku do oddania albo avatara,
- symulowane powiadomienia,
- decyzja architektoniczna o kolejkach.

### Milestone 7: Jakosc i dokumentacja

Efekt:

- Swagger,
- testy e2e,
- logi requestow,
- walidacja env,
- Docker Compose,
- seed,
- finalne README.

## Definicja ukonczenia

Projekt jest ukonczony, gdy:

- nowa osoba moze uruchomic go wedlug README,
- migracje tworza baze od zera,
- seed daje dane do testow,
- glowne endpointy sa opisane w Swagger,
- auth i role dzialaja,
- krytyczne reguly domenowe maja testy,
- odpowiedzi bledow sa przewidywalne,
- kod jest podzielony na moduly bez mieszania odpowiedzialnosci,
- potrafisz przejsc przez projekt i wyjasnic decyzje.

## Rozszerzenia dla ambitnych

- Refresh tokens.
- Reset hasla przez token.
- Email verification.
- Redis i BullMQ dla powiadomien.
- Cache publicznej listy kursow.
- Soft delete kursow i komentarzy.
- Audit log dla operacji admina.
- WebSocket albo Server-Sent Events dla powiadomien.
- CI na GitHub Actions.
- Deployment na wybrana platforme.

## Jak prezentowac projekt

Przy prezentacji nie pokazuj tylko listy endpointow. Opowiedz historie:

1. Jaki problem rozwiazuje API?
2. Jakie sa role uzytkownikow?
3. Jak wyglada glowny przeplyw: rejestracja, zapis na kurs, lekcja, zadanie, recenzja?
4. Gdzie sa najwazniejsze reguly domenowe?
5. Jak zabezpieczyles dane?
6. Jak testy daja zaufanie?
7. Co zrobilbys inaczej w drugiej wersji?

