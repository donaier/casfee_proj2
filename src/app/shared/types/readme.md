
Absprechung fuer den Firestore Datenstruktur: Vorschlag

// Accounts
Collection : Accounts
Documents : Verschiedene Accountsname
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

