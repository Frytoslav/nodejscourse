# Modul 14: Dokumentacja API, Docker i wdrozenie

## Cel modulu

Projekt backendowy powinien dac sie uruchomic przez inna osobe. Powinien miec dokumentacje API, instrukcje konfiguracji, kontenery dla zaleznosci i plan wdrozenia. Ten modul zamyka kurs praktyka przygotowania projektu do pokazania swiatu.

Po module umiesz:

- dodac dokumentacje OpenAPI/Swagger,
- opisac uruchomienie projektu,
- przygotowac Dockerfile,
- uzyc Docker Compose dla API i bazy,
- rozumiec roznice miedzy buildem a startem,
- przygotowac aplikacje do wdrozenia,
- stworzyc finalne README techniczne.

## Teoria

### Dokumentacja API

Dokumentacja API powinna odpowiadac na pytania:

- jakie endpointy istnieja,
- jakie dane przyjmuja,
- jakie statusy zwracaja,
- czy wymagaja auth,
- jak wyglada przykladowy request i response.

W NestJS czesto uzywa sie `@nestjs/swagger`, ktory generuje OpenAPI na podstawie dekoratorow.

### Docker

Docker pakuje aplikacje i jej runtime w powtarzalny obraz. Docker Compose pozwala uruchomic kilka uslug, np. API, PostgreSQL i Redis.

Wazne rozroznienie:

- obraz: przepis na srodowisko aplikacji,
- kontener: uruchomiona instancja obrazu,
- volume: trwaly zapis danych poza kontenerem,
- network: komunikacja miedzy kontenerami.

### Build vs runtime

W aplikacji TypeScript zwykle:

1. instalujesz zaleznosci,
2. generujesz Prisma Client,
3. budujesz kod do JavaScript,
4. uruchamiasz `node dist/main.js`.

Nie uruchamiasz `npm run start:dev` w produkcji.

### README projektu

Dobre README powinno zawierac:

- opis projektu,
- wymagania,
- konfiguracje env,
- instalacje,
- uruchomienie development,
- migracje i seed,
- testy,
- dokumentacje API,
- najwazniejsze decyzje architektoniczne,
- przykładowe konto testowe, jesli istnieje.

## Praktyka prowadzona

Instalacja Swagger:

```powershell
npm install @nestjs/swagger swagger-ui-express
```

W `main.ts`:

```ts
const config = new DocumentBuilder()
  .setTitle('SkillForge API')
  .setDescription('Backend API for course and assignment platform')
  .setVersion('1.0')
  .addBearerAuth()
  .build();

const document = SwaggerModule.createDocument(app, config);
SwaggerModule.setup('docs', app, document);
```

Przykladowy `Dockerfile`:

```dockerfile
FROM node:24-alpine AS deps
WORKDIR /app
COPY package*.json ./
RUN npm ci

FROM node:24-alpine AS build
WORKDIR /app
COPY --from=deps /app/node_modules ./node_modules
COPY . .
RUN npx prisma generate
RUN npm run build

FROM node:24-alpine AS runner
WORKDIR /app
ENV NODE_ENV=production
COPY --from=build /app/dist ./dist
COPY --from=build /app/node_modules ./node_modules
COPY --from=build /app/package*.json ./
COPY --from=build /app/prisma ./prisma
CMD ["node", "dist/main.js"]
```

## Zadania samodzielne

1. Dodaj Swagger dla glownego projektu.
2. Opisz DTO przez dekoratory Swaggera.
3. Oznacz endpointy chronione bearer auth.
4. Dodaj `Dockerfile`.
5. Dodaj `docker-compose.yml` z API, PostgreSQL i opcjonalnie Redis.
6. Dodaj skrypt migracji produkcyjnej.
7. Dodaj `README.md` finalnego projektu.
8. Uruchom projekt od zera wedlug README i popraw brakujace kroki.
9. Zrob finalny przeglad endpointow i testow.

## Kryteria zaliczenia

Modul jest zaliczony, gdy:

- dokumentacja API dziala pod `/docs`,
- projekt mozna uruchomic wedlug README,
- baza startuje przez Docker Compose,
- migracje sa opisane,
- testy przechodza,
- aplikacja nie uzywa trybu dev jako produkcyjnego startu,
- potrafisz opowiedziec, jak wdrozylbys API.

## Pytania kontrolne

- Dlaczego dokumentacja API powinna byc aktualna?
- Czym rozni sie kontener od obrazu?
- Dlaczego produkcja nie powinna uzywac `start:dev`?
- Jakie informacje musza znalezc sie w README backendu?

