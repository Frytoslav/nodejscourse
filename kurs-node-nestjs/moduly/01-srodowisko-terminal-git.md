# Modul 01: Srodowisko, terminal i Git

## Cel modulu

Backend developer codziennie uzywa terminala, uruchamia skrypty, czyta logi, instaluje paczki i zapisuje zmiany w Git. Ten modul nie jest dodatkiem. To warsztat pracy.

Po module umiesz:

- sprawdzic wersje Node.js i npm,
- stworzyc minimalny projekt Node,
- uruchomic skrypt z `package.json`,
- korzystac z podstawowych komend terminala,
- zapisac zmiany w Git,
- czytac podstawowe logi aplikacji.

## Teoria

### Node.js i npm

Node.js pozwala uruchamiac JavaScript poza przegladarka. npm jest menedzerem paczek i skryptow. W praktyce `package.json` jest centrum projektu: opisuje zaleznosci, komendy, punkt startowy i metadane.

Minimalne pola, ktore warto rozumiec:

- `name`: nazwa projektu,
- `version`: wersja,
- `type`: tryb modulow, np. `module` dla ES Modules,
- `scripts`: komendy uruchamiane przez `npm run`,
- `dependencies`: paczki potrzebne w runtime,
- `devDependencies`: paczki potrzebne do developmentu, testow i builda.

### Terminal

Terminal to rozmowa z systemem. Nie musisz znac setek komend, ale musisz czuc sie swobodnie z podstawami:

- sprawdzanie katalogu,
- listowanie plikow,
- przechodzenie po folderach,
- uruchamianie programu,
- czytanie bledu,
- zatrzymywanie procesu.

Na Windows pracujesz w PowerShell. W dokumentacji backendowej czesto zobaczysz komendy Unixowe. Warto umiec rozpoznac sens komendy nawet wtedy, gdy skladnia jest inna.

### Git

Git zapisuje historie zmian. Na poczatku uzywaj go prosto:

- `git status`: co sie zmienilo,
- `git add`: przygotuj zmiany,
- `git commit`: zapisz punkt historii,
- `git diff`: zobacz roznice,
- `git log`: zobacz historie.

Dobre commity sa male i maja sensowny opis. Commit "fix" niewiele mowi. Commit "add notes api validation" juz tak.

## Praktyka prowadzona

W katalogu cwiczeniowym wykonaj:

```powershell
node -v
npm -v
npm init -y
```

Dodaj plik `src/index.js`:

```js
const appName = 'Backend Sandbox';

console.log(`${appName} is running`);
```

W `package.json` dodaj:

```json
{
  "scripts": {
    "start": "node src/index.js"
  }
}
```

Uruchom:

```powershell
npm run start
```

## Zadania samodzielne

1. Dodaj skrypt `dev`, ktory uruchamia ten sam plik.
2. Dodaj do programu zmienna `PORT` i wypisz tekst `Server will use port 3000`.
3. Stworz plik `README.md` opisujacy, jak uruchomic projekt.
4. Zrob commit z opisem `create node sandbox`.
5. Uruchom `git diff` przed commitem i sprawdz, co zapisujesz.

## Kryteria zaliczenia

Modul jest zaliczony, gdy:

- potrafisz uruchomic `npm run start`,
- rozumiesz, gdzie sa skrypty npm,
- masz pierwszy commit,
- potrafisz odroznic `dependencies` od `devDependencies`,
- umiesz przeczytac podstawowy blad z terminala.

## Pytania kontrolne

- Po co istnieje `package.json`?
- Czym rozni sie `npm start` od `npm run dev`?
- Dlaczego `node_modules` zwykle nie trafia do Gita?
- Co robi `git status`?

