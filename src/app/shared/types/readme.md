Supi Vorschlag! Hier meine Adaption:

### Accounts

Attribut "short" habe ich als platzsparenden Identifikator verwendet (Emojis). Möchte ich beibehalten für Designfreiheiten (Mobile-Listen, 'eingeklappte' Menüs und so). Habe aber umbenannt in "name", "shortName".

Das "set" muss auf dem Account sein. Es beschreibt die Struktur des Imports (csv) um daraus normierte "Transactions" zu erstellen. (Hoffe, ich kann mich gut ausdrücken. Die Daten kommen als csv, die Werte können aber an versch. Positionen sein - Reihenfolge im csv ist bei den Banken unterschiedlich. Zusätzlich der Delimiter des csv - meist ';' oder ','.)

Taufen wir das "set" doch um in "csvMask"

Attribut "firstTransaction" habe ich mal weggelassen, kann aus den Transactions aggregiert werden. Ebenso der "current" value. Den rechnen wir doch live aus.

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
