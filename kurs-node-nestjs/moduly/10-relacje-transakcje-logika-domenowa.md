# Modul 10: Relacje, transakcje i logika domenowa

## Cel modulu

CRUD to dopiero poczatek. Realny backend ma procesy: zapis na kurs, ukonczenie lekcji, sprawdzenie uprawnien, naliczenie postepu, zmiane statusu zadania. Ten modul uczy modelowania relacji i operacji, ktore musza byc spojne.

Po module umiesz:

- projektowac relacje jeden-do-wielu i wiele-do-wielu,
- rozumiec tabele laczace,
- stosowac transakcje,
- rozdzielac logike domenowa od kontrolerow,
- projektowac operacje biznesowe zamiast samego CRUD,
- myslec o niezmiennikach systemu.

## Teoria

### Relacje

Najczestsze relacje:

- jeden-do-wielu: kurs ma wiele lekcji,
- wiele-do-wielu: uzytkownik zapisuje sie na wiele kursow, kurs ma wielu uzytkownikow,
- jeden-do-jednego: profil nalezy do jednego uzytkownika.

W Prisma relacja wiele-do-wielu moze byc jawna przez model posredni, np. `Enrollment`.

```prisma
model Enrollment {
  id        String   @id @default(uuid())
  userId    String
  courseId  String
  createdAt DateTime @default(now())

  user   User   @relation(fields: [userId], references: [id])
  course Course @relation(fields: [courseId], references: [id])

  @@unique([userId, courseId])
}
```

Jawny model posredni jest lepszy, gdy relacja ma wlasne dane: status, date zapisu, postep.

### Niezmienniki domenowe

Niezmiennik to zasada, ktora zawsze musi byc prawdziwa.

Przyklady:

- uzytkownik nie moze zapisac sie dwa razy na ten sam kurs,
- lekcja nie moze byc ukonczona, jesli uzytkownik nie jest zapisany na kurs,
- kurs opublikowany musi miec co najmniej jedna lekcje,
- tylko autor albo admin moze edytowac kurs.

Logika domenowa pilnuje takich zasad.

### Transakcje

Transakcja pozwala wykonac kilka operacji jako jedna calosc. Albo wszystkie sie udadza, albo zadna nie zostanie zapisana.

Przyklad: zapis na kurs i utworzenie poczatkowego postepu.

```ts
await this.prisma.$transaction(async (tx) => {
  const enrollment = await tx.enrollment.create({ data });

  await tx.courseProgress.create({
    data: {
      enrollmentId: enrollment.id,
      completedLessons: 0,
    },
  });

  return enrollment;
});
```

Transakcja jest potrzebna, gdy czesciowy zapis zostawilby system w zlym stanie.

### Operacje biznesowe

Nie kazda operacja powinna byc `create`, `update`, `delete`. Czasem endpoint powinien nazwac intencje:

- `POST /courses/:id/enroll`,
- `POST /lessons/:id/complete`,
- `POST /assignments/:id/submit`,
- `POST /submissions/:id/review`.

To nadal moze byc REST, bo tworzysz albo zmieniasz zasob, ale nazwa akcji bywa praktyczniejsza dla procesu domenowego.

## Praktyka prowadzona

Dodaj modele:

```prisma
model User {
  id          String       @id @default(uuid())
  email       String       @unique
  name        String
  enrollments Enrollment[]
  createdAt   DateTime     @default(now())
}

model Enrollment {
  id        String   @id @default(uuid())
  userId    String
  courseId  String
  createdAt DateTime @default(now())

  user   User   @relation(fields: [userId], references: [id])
  course Course @relation(fields: [courseId], references: [id])

  @@unique([userId, courseId])
}
```

Dodaj endpoint:

```http
POST /courses/:courseId/enroll
```

Na razie `userId` moze przychodzic w body. W module auth zastapisz to uzytkownikiem z tokenu.

## Zadania samodzielne

1. Dodaj `LessonCompletion`.
2. Zaimplementuj `completeLesson(userId, lessonId)`.
3. Sprawdz, czy uzytkownik jest zapisany na kurs lekcji.
4. Zabezpiecz przed podwojnym ukonczeniem tej samej lekcji.
5. Policz procent postepu kursu.
6. Uzyj transakcji, jesli zapisujesz completion i aktualizujesz progress.
7. Dodaj test jednostkowy dla logiki liczenia postepu.

## Kryteria zaliczenia

Modul jest zaliczony, gdy:

- masz relacje User-Course przez Enrollment,
- nie da sie zapisac dwa razy na ten sam kurs,
- nie da sie ukonczyc lekcji bez zapisu na kurs,
- transakcja chroni operacje wielokrokowe,
- potrafisz wskazac niezmienniki domenowe w projekcie.

## Pytania kontrolne

- Kiedy relacja wiele-do-wielu powinna miec jawny model posredni?
- Co to jest niezmiennik?
- Dlaczego transakcja jest wazna przy operacjach wielokrokowych?
- Kiedy endpoint akcyjny jest czytelniejszy niz zwykly CRUD?

