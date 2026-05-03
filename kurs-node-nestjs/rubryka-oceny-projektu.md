# Rubryka oceny projektu koncowego

Uzyj tej rubryki do samodzielnego przegladu SkillForge API. Maksymalnie 100 punktow.

## Funkcjonalnosc: 25 punktow

- 5 pkt: rejestracja, logowanie i `/auth/me` dzialaja poprawnie.
- 5 pkt: kursy, lekcje i publikacja kursow dzialaja zgodnie z rolami.
- 5 pkt: zapisy na kurs i postep lekcji dzialaja z regułami domenowymi.
- 5 pkt: zadania, oddania i recenzje maja poprawny przeplyw.
- 5 pkt: komentarze, paginacja, filtrowanie i sortowanie sa uzyteczne.

## Bezpieczenstwo: 15 punktow

- 3 pkt: hasla sa hashowane i nigdy nie zwracane.
- 3 pkt: JWT ma sensowny payload i wygasanie.
- 3 pkt: role i guardy chronia endpointy.
- 3 pkt: walidacja odrzuca zle dane i dodatkowe pola.
- 3 pkt: sekrety sa w env, a nie w repo.

## Dane i domena: 15 punktow

- 3 pkt: modele Prisma sa spojne i maja relacje.
- 3 pkt: unikalnosci i constrainty pilnuja danych.
- 3 pkt: transakcje chronia operacje wielokrokowe.
- 3 pkt: serwisy pilnuja niezmiennikow domenowych.
- 3 pkt: seed pozwala latwo przetestowac aplikacje.

## Architektura: 15 punktow

- 3 pkt: moduly maja jasne odpowiedzialnosci.
- 3 pkt: kontrolery nie zawieraja logiki biznesowej.
- 3 pkt: dostep do bazy jest odseparowany od HTTP.
- 3 pkt: kod jest czytelny, nazwany i latwy do rozszerzenia.
- 3 pkt: decyzje architektoniczne sa krotko opisane.

## Testy i jakosc: 15 punktow

- 4 pkt: testy jednostkowe obejmuja kluczowa logike domenowa.
- 4 pkt: testy e2e obejmuja auth i najwazniejsze endpointy.
- 3 pkt: przypadki bledow sa testowane.
- 2 pkt: konfiguracja env jest walidowana.
- 2 pkt: logi i health check pomagaja diagnozowac problemy.

## Dokumentacja i uruchomienie: 15 punktow

- 4 pkt: README pozwala uruchomic projekt od zera.
- 3 pkt: Swagger opisuje glowne endpointy.
- 3 pkt: Docker Compose uruchamia zaleznosci.
- 2 pkt: migracje i seed sa opisane.
- 3 pkt: projekt da sie zaprezentowac jako portfolio.

## Interpretacja wyniku

- 90-100: projekt jest bardzo mocny portfolio-wise.
- 75-89: projekt jest solidny, ale warto domknac testy, dokumentacje albo bezpieczenstwo.
- 60-74: projekt dziala, ale potrzebuje porzadkow architektonicznych.
- ponizej 60: wroc do modulow i domknij podstawowe wymagania.

