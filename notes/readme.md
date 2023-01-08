## final Todos ;-)

donat:
- nav mobile
- manual/instructions
- Beispieldaten csv
- tests
- graph nach Kategories (oder willst du da mal einen machen?)
- ~~würde gerne doch noch das Erstellen von neuen subCategories erlauben, wenn der csv-Prozess schon im Gange ist. Falls da was vergessen wurde oder es was neues braucht müsste sonst das Kategorisieren abgebrochen werden, Kategorie erstellt und wieder gestartet werden.~~
- ~~Transaktionen als "Kontoübertrag" markieren (haben wir so in der Eingabe drin, anstelle der Kategorie wird da das "Zielkonto" (eines der erfassten) angegeben)~~

kay:
- tests :)



## TODOS 

* Navigation Responsonsive : Hamburger ist nicht zentriert, und das styling des Dropdowns ist noch unschoen. Kenne die klassen nicht du kennst bulma besser ? 



Maximum Accounts : 8
Maximum CategoryGroups : 10
Maximum Categories : 15

Maximum Amount per Account/Transaction.

Um eine CategoryGroup auszuwaehlen muss mindestens eine Category vorhanden sein. Habe ich      aktuell implementiert.
Alternativen : 
  1. CategoryGroups sind auch auswaehlbar : leider viel Code anpassungen / User kann verrwirrt werden wegen mehrfachauswahl der Box selbst oder Items.
  2. Fuer jede neue CategoryGroup ein Item mit demselben Namen miterstellen. / Sieht auch nicht so toll aus.


// Fuer die Abgabe: 
Leer / Csv Bsp. zum Upload. 

// loeschen von transactions
// erfassen v. Transaktionen ohne categories
// scrollen innerhalb transactions
// Frontend on Csv Upload




## dran denken + refactoring

- Maximale Anzahl Accounts / Categorien ?
- Keine Eintraege vorhanden ? was anzeigen
- Updates erfolgreich durchfuehren - keine Aenderungen an Subklassen
- Firestore ist nicht verfuegbar --> was nun ???
- formulare ein neuer eintrag mitselbem namen -> evtl. mit validator loesen
- Anzeige wenn maximale Eintraege gemacht wurden z.B max categorien -> zuerst eine loeschen bevor neue erstellt werden kann.

account:
- ~~Refactoring : Edit: Color & csv Mask wird nicht angezeigt. -> color habe ich gemacht, csv verhält sich komisch. wir könnten hier nur den "name" als identifier speichern und das csvMask objekt dann holen wenns benötigt wird (beim csv upload)~~
- Edit Account initial Value / current value sperren.
- Accounts Csv Masks noch undefined & Initial & CurrentValue anzeige unschoen.

// Layout : Feste Groesse der Account Container


donat:
- ~~form validation mit bulma klassen machen, dann können einige repetitive stylesheets gespart werden. was dann noch sein muss, auf einem übergeordneten, nicht pro komponente dasselbe~~
- ~~queryselektoren im csv-config-component ersetzen mit viewChild~~
- ~~csvMask mit datumsformatstring ergänzen (pf: dd.mm.yyyy)~~
