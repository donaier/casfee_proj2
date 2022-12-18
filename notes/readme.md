## Subscriptions

Habe gerade für die config seite + dashboard die accounts angezeigt und dafür den code vom store/subscriptions dupliziert. Das ist halt nicht so gut :P denke logisch wäre, wenn die app.component die subscriptions hält und die daten dann an dashboard/config weitergibt (und da werden sie gegebenenfalls an weitere components weitergegeben). Die subscriptions müssten nach meiner Meinung beim Login erstellt und beim logout destroyed werden.

meinung/inputs?

### Accounts

Attribut "short" habe ich als platzsparenden Identifikator verwendet (Emojis). Möchte ich beibehalten für Designfreiheiten (Mobile-Listen, 'eingeklappte' Menüs und so). Habe aber umbenannt in "name", "shortName".

Das "set" muss auf dem Account sein. Es beschreibt die Struktur des Imports (csv) um daraus normierte "Transactions" zu erstellen. (Hoffe, ich kann mich gut ausdrücken. Die Daten kommen als csv, die Werte können aber an versch. Positionen sein - Reihenfolge im csv ist bei den Banken unterschiedlich. Zusätzlich der Delimiter des csv - meist ';' oder ','.)

Taufen wir das "set" doch um in "csvMask" (jetzt 'csv')

currentValue macht Sinn! und sollte nach jeder transaktions-Action (add, update, delete) aktualisiert werden.

kay: Urspruenglich sind noch alle Transaktionen welche einem Account zugewiesen sind auch vorhanden hast du denn vergessen oder absichtlich geloescht ? Wie auch immer ich habe es mal mit implementiert. Also wenn ich das richtig verstehe habe wir ja die csvMask --> verschiedene Transaktionen. Ich denke am besten ist es wenn wir aus den csv's transaktionen generieren und alle in Transaktionen ablegen (inkl. manuelle Erfassungen).

donat: Genau! das csv wird nur als input verwendet und nirgends gespeichert. Aus jeder Zeile des csv wird eine Transaktion erstellt (dies unterscheidet sich nicht von manuell erstellten). Die csv_mask bestimmt dabei, wo welche Werte sind.

Als Beispiel hier ein "echtes" Beispiel:
```
29.08.2022;"KAUF/DIENSTLEISTUNG VOM 29.08.2022 KARTEN NR. XXXX9809 COOP-1243 SCHWANDEN SCHWANDEN SCHWEIZ ";;-34.65;29.08.2022;8403.93
```
die csv_mask dafür würde so aussehen:
```
date;description;;amount;;
```
so werden die Werte von den Positionen 1,2 und 4 in die Attribute 'date', 'description' und 'amount' der zu erstellenden Transaktion geschrieben. Die Zeile csv ist danach verarbeitet und kann verworfen werden.

```
getDocs(collection(db, "accounts"));
```

```
interface Account {
  name: string,
  shortName: string,
  description: string,
  initialValue: Number,
  color: string,
  set: string,
}
```

### csvMask
```
interface csvMask {
  name: string,
  delimiter: string,
  mask: string,
}
```

### Transaction

Wozu hier der "docName"?
 --> Bei einer neuen Transaction ist der DocumentName eine automatisch generierte ID, die ist dort abgelegt.

Das "method" für in/out transaction brauchen wir nicht. Der Wert kommt als positive oder negative Zahl.

Ich habe mal "forAccount" (für den Account wird die Transaktion gespeichert) und "fromAccount" genommen. Das zweite kann leer sein und kriegt nur einen Eintrag wenn es sich um eine Transaktion zwischen zwei erfassten `Account` handelt. (Dauerauftrag aufs Sparkonto vom Lohnkonto oder so.)

```
export interface Transaction {
  docName: string
  description: string
  forAccount: string,
  fromAccount: string | null
  amount: number
  category: category
  date: Date
}
```

### Categories

Genau, hier habe ich die parent/child flach in der db abgebildet, wobei die childs einen eintrag im attribut 'parent' hatten... brauchen wir so nicht.
Würde das mit zwei models lösen:

```
interface CategoryGroup {
  name: string,
  color: string,
  categories: [Category]
}

interface Category {
  group: string,
  name: string,
  color: string,
}
```

Absprechung fuer den Firestore Datenstruktur: Vorschlag

// Accounts
Collection: Accounts
Documents: Verschiedene Accountsname
einzelne Account : Vorschlag :

export interface BankAccount {
  dbid: string | null, -->  unused in firestore
  identification: string,
  short: string, --> i.M.O unused aber evtl; brauchst du das iwo
  description: string,
  initialValue: Number,
  color: string,
  set: string, --> unused set wird in transaction gespeichert
  actualValue: Number,
  firstTransaction: string,
  transactions : Transaction[]
}


// Categories
Collection : Categories
Documents : Verschiedene Kategorienname

einzelne Categorie : Vorschlag :

export interface Category {
  dbid: string | null, -->  unused in firestore
  parent: string, --> ?
  name: string,
  color: string,
  children: Array<SpendingCategoryChild> -> also die verschiedenen Subklassen ? z.B waschen, einkauf, strom etc...
  --> sah bei mir so aus:  items: Category_item[]
}


// Transactions
Collection : Transactions
Documents : Verschiedene Transactionsname oder TransactionID
einzelne Transaction : Vorschlag :

export interface Transaction {
  docName: string
  description: string
  linkedAccount: string,
  method: string  --> add or remove
  amount: number
  category: category
  date: Date | number
}

interface category {
  name: string
  color: string,
  item : string,
}


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
