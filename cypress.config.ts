import { defineConfig } from 'cypress';
import admin from 'firebase-admin';
import { plugin as cypressFirebasePlugin } from 'cypress-firebase';

export default defineConfig({

  e2e: {
    'baseUrl': 'http://localhost:4200',
    supportFile: false,
    experimentalSessionAndOrigin: true,
    setupNodeEvents(on, config) {
      // e2e testing node events setup code
      return cypressFirebasePlugin(on, config, admin);
    },
  },


  component: {
    devServer: {
      framework: 'angular',
      bundler: 'webpack',
    },
    specPattern: '**/*.cy.ts'
  }

})

