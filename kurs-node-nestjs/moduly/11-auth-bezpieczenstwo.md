# Modul 11: Auth, role i bezpieczenstwo

## Cel modulu

Wiekszosc realnych API musi wiedziec, kto wykonuje operacje i czy ma do niej prawo. Ten modul wprowadza uwierzytelnianie, autoryzacje, hashowanie hasel, JWT, role i podstawowe zabezpieczenia aplikacji HTTP.

Po module umiesz:

- odroznic authentication od authorization,
- bezpiecznie hashowac hasla,
- zaimplementowac rejestracje i logowanie,
- wystawiac i weryfikowac JWT,
- uzywac guardow w NestJS,
- sprawdzac role uzytkownika,
- unikac podstawowych bledow bezpieczenstwa.

## Teoria

### Authentication vs authorization

Authentication odpowiada na pytanie: kim jestes?

Authorization odpowiada na pytanie: co wolno Ci zrobic?

Uzytkownik moze byc poprawnie zalogowany, ale nadal nie miec prawa do usuniecia kursu.

### Hasla

Nigdy nie zapisujesz hasel jako plain text. Zapisujesz hash hasla wygenerowany algorytmem przeznaczonym do hasel, np. Argon2 albo bcrypt.

Zasady:

- nie zwracaj hasha hasla z API,
- nie loguj hasel,
- nie wysylaj hasla w query params,
- nie uzywaj szybkiego hasha typu SHA-256 do hasel uzytkownikow,
- dodaj unikalnosc emaila.

### JWT

JWT to token, ktory klient wysyla np. w headerze:

```http
Authorization: Bearer <token>
```

Token zwykle zawiera minimalne dane:

- `sub`: identyfikator uzytkownika,
- `email`,
- `role`,
- `iat`,
- `exp`.

Nie wkladaj do JWT danych wrazliwych. JWT jest podpisany, ale jego payload mozna odczytac po stronie klienta.

### Guardy

Guard w NestJS decyduje, czy request moze przejsc dalej.

Przyklady:

- `JwtAuthGuard`: sprawdza token,
- `RolesGuard`: sprawdza role,
- `CourseOwnerGuard`: sprawdza, czy uzytkownik jest wlascicielem zasobu.

### Podstawowe zabezpieczenia

Minimum dla API:

- CORS skonfigurowany swiadomie,
- Helmet dla headerow bezpieczenstwa,
- rate limiting dla wrazliwych endpointow,
- walidacja danych,
- hashowanie hasel,
- sekrety w env,
- brak stack trace w odpowiedziach produkcyjnych,
- ograniczenie danych zwracanych z API.

## Praktyka prowadzona

Zainstaluj paczki:

```powershell
npm install @nestjs/passport passport passport-jwt @nestjs/jwt argon2
npm install --save-dev @types/passport-jwt
```

Model `User`:

```prisma
enum UserRole {
  STUDENT
  INSTRUCTOR
  ADMIN
}

model User {
  id           String   @id @default(uuid())
  email        String   @unique
  passwordHash String
  name         String
  role         UserRole @default(STUDENT)
  createdAt    DateTime @default(now())
  updatedAt    DateTime @updatedAt
}
```

Kontrakt:

```http
POST /auth/register
POST /auth/login
GET /auth/me
```

`/auth/me` powinno wymagac tokenu.

## Zadania samodzielne

1. Dodaj `AuthModule`.
2. Dodaj `RegisterDto` i `LoginDto`.
3. Przy rejestracji haszuj haslo i zapisuj `passwordHash`.
4. Przy logowaniu sprawdz haslo i zwroc access token.
5. Dodaj `JwtStrategy`.
6. Dodaj `JwtAuthGuard`.
7. Dodaj dekorator `@CurrentUser()`.
8. Dodaj `RolesGuard` i dekorator `@Roles()`.
9. Zabezpiecz tworzenie kursu rola `INSTRUCTOR` albo `ADMIN`.
10. Zabezpiecz usuwanie kursu rola `ADMIN`.

## Kryteria zaliczenia

Modul jest zaliczony, gdy:

- rejestracja i logowanie dzialaja,
- hasla nie sa zwracane z API,
- endpoint `/auth/me` dziala tylko z tokenem,
- role ograniczaja wybrane endpointy,
- sekrety JWT sa w env,
- potrafisz wyjasnic roznice miedzy 401 i 403.

## Pytania kontrolne

- Dlaczego hasla sie hashuje, a nie szyfruje?
- Co powinno byc w JWT, a czego nie powinno tam byc?
- Kiedy zwrocic `401`, a kiedy `403`?
- Dlaczego guard jest lepszy niz reczne sprawdzanie tokenu w kazdym kontrolerze?

