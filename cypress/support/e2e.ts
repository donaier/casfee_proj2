// ***********************************************************
// This example support/e2e.ts is processed and
// loaded automatically before your test files.
//
// This is a great place to put global configuration and
// behavior that modifies Cypress.
//
// You can change the location of this file or turn off
// automatically serving support files with the
// 'supportFile' configuration option.
//
// You can read more here:
// https://on.cypress.io/configuration
// ***********************************************************

// When a command from ./commands is ready to use, import with `import './commands'` syntax
// import './commands';


import firebase from 'firebase/compat/app';
import 'firebase/compat/auth';
import 'firebase/compat/database';
import 'firebase/compat/firestore';
import { attachCustomCommands } from 'cypress-firebase';

const fbConfig = {
  apiKey: "AIzaSyA1ieGAgrVtOsKx_gVp4nQ4gNGv3h1WTJc",
  authDomain: "finance-app-b2a26.firebaseapp.com",
  projectId: "finance-app-b2a26",
  storageBucket: "finance-app-b2a26.appspot.com",
  messagingSenderId: "241318413487",
  appId: "1:241318413487:web:236479c353fd16b730405a"
};

firebase.initializeApp(fbConfig);

attachCustomCommands({ Cypress, cy, firebase });
