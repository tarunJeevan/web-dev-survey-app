const { defineConfig } = require("cypress");
const serviceAccount = require('./serviceAccount.json')
const admin = require('firebase-admin');
const cypressFirebasePlugin = require('cypress-firebase').plugin;

module.exports = defineConfig({
  e2e: {
    baseUrl: 'https://pfwsurvey.biskilog.com',
    setupNodeEvents(on, config) {
      // implement node event listeners here
      return cypressFirebasePlugin(on, config, admin, {
        projectId: 'survey-purdue',
        credential: admin.credential.cert(serviceAccount)
      });
    },
  },

  component: {
    devServer: {
      framework: "create-react-app",
      bundler: "webpack",
    },
  },
});
