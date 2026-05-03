# Modul 08: DTO, walidacja, bledy i kontrakty API

## Cel modulu

API bez walidacji ufa klientowi, a klient zawsze moze wyslac cos dziwnego. Ten modul uczy, jak projektowac wejscie do aplikacji: DTO, walidacje, transformacje, bledy i stabilny kontrakt API.

Po module umiesz:

- tworzyc DTO jako klasy,
- wlaczyc globalny `ValidationPipe`,
- uzywac `class-validator` i `class-transformer`,
- rozumiec roznice miedzy typami TS a walidacja runtime,
- zwracac czytelne bledy,
- dokumentowac kontrakt endpointu.

## Teoria

### DTO jako granica aplikacji

DTO opisuje dane, ktore przychodza z zewnatrz albo wychodza z API. W NestJS DTO czesto sa klasami, bo walidacja potrzebuje metadanych runtime.

```ts
export class CreateTaskDto {
  title: string;
  description?: string;
}
```

Samo to nie waliduje danych. Dopiero dekoratory i pipe uruchamiaja walidacje.

### ValidationPipe

NestJS ma wbudowany `ValidationPipe`, ktory moze sprawdzac dane przychodzace do kontrolerow. W praktyce wlaczasz go globalnie w `main.ts`.

```ts
app.useGlobalPipes(
  new ValidationPipe({
    whitelist: true,
    forbidNonWhitelisted: true,
    transform: true,
  }),
);
```

Znaczenie:

- `whitelist`: usuwa pola bez dekoratorow walidacji,
- `forbidNonWhitelisted`: zamiast usuwac, zglasza blad dla nieznanych pol,
- `transform`: pozwala transformowac proste typy, np. parametry liczbowe.

### Dekoratory walidacji

```ts
import { IsNotEmpty, IsOptional, IsString, MaxLength } from 'class-validator';

export class CreateTaskDto {
  @IsString()
  @IsNotEmpty()
  @MaxLength(120)
  title: string;

  @IsString()
  @IsOptional()
  @MaxLength(1000)
  description?: string;
}
```

Walidacja powinna byc konkretna. `@IsString()` bez `@IsNotEmpty()` pozwoli na pusty string.

### Bledy aplikacyjne

Nest ma gotowe wyjatki:

- `BadRequestException`,
- `UnauthorizedException`,
- `ForbiddenException`,
- `NotFoundException`,
- `ConflictException`,
- `InternalServerErrorException`.

Serwis moze rzucic:

```ts
throw new NotFoundException('Task not found');
```

Kontroler nie musi recznie ustawiac statusu.

### Kontrakt API

Kontrakt API to obietnica miedzy backendem a klientem:

- jakie endpointy istnieja,
- jakie dane przyjmuja,
- jakie zwracaja statusy,
- jaki jest format sukcesu i bledu.

Kontrakt musi byc stabilny. Zmiana nazwy pola moze zepsuc frontend albo integracje.

## Praktyka prowadzona

Zainstaluj walidatory:

```powershell
npm install class-validator class-transformer
```

W `main.ts`:

```ts
import { ValidationPipe } from '@nestjs/common';
import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  app.useGlobalPipes(
    new ValidationPipe({
      whitelist: true,
      forbidNonWhitelisted: true,
      transform: true,
    }),
  );

  await app.listen(process.env.PORT ?? 3000);
}

bootstrap();
```

DTO:

```ts
import { IsNotEmpty, IsOptional, IsString, MaxLength } from 'class-validator';

export class CreateTaskDto {
  @IsString()
  @IsNotEmpty()
  @MaxLength(120)
  title: string;

  @IsString()
  @IsOptional()
  @MaxLength(1000)
  description?: string;
}
```

## Zadania samodzielne

1. Dodaj `UpdateTaskDto` z `PartialType`.
2. Dodaj walidacje statusu przez `@IsEnum`.
3. Dodaj `ParseUUIDPipe` albo `ParseIntPipe` dla parametru `id`, zaleznie od typu identyfikatora.
4. Dodaj blad `ConflictException`, gdy probujesz stworzyc kurs o zduplikowanym slugu.
5. Ustal standard odpowiedzi bledu i opisz go w README projektu.
6. Dodaj walidacje query params dla paginacji.

## Kryteria zaliczenia

Modul jest zaliczony, gdy:

- niepoprawne body zwraca `400`,
- dodatkowe pola sa odrzucane,
- DTO sa klasami z dekoratorami,
- serwisy rzucaja wbudowane wyjatki NestJS,
- potrafisz powiedziec, dlaczego TypeScript i runtime validation to dwie rozne rzeczy.

## Pytania kontrolne

- Dlaczego DTO w NestJS czesto sa klasami, a nie interfejsami?
- Co daje `whitelist`?
- Kiedy uzyc `404`, a kiedy `409`?
- Dlaczego frontend potrzebuje stabilnego kontraktu bledow?

