/*const { defineConfig } = require("cypress");

module.exports = defineConfig({
  allowCypressEnv: false,
  reporter: 'cypress-mochawesome-reporter',
  e2e: {
    setupNodeEvents(on, config) {
      // implement node event listeners here
    },
  },
});
*/

/*
const { defineConfig } = require("cypress");
const allureWriter = require('@shelex/cypress-allure-plugin/writer');

module.exports = defineConfig({
  e2e: {
    setupNodeEvents(on, config) {
      allureWriter(on, config);
      return config;
    },
    env: {
      //allureReuseAfterSpec: true
      allureResultsPath: "allure-results"
    }
  }
});*/

const { defineConfig } = require("cypress");
const fs = require("fs-extra");
const path = require("path");

// Importación del plugin de Allure
const allureWriter = require('@shelex/cypress-allure-plugin/writer');

function getConfigurationByFile(env) {
  const environment = env || 'dev';
  const pathToConfigFile = path.resolve("cypress", "config", `${environment}.json`);
  return fs.existsSync(pathToConfigFile) ? fs.readJsonSync(pathToConfigFile) : {};
}

module.exports = defineConfig({
  reporter: 'cypress-mochawesome-reporter',
  e2e: {
    setupNodeEvents(on, config) {
      // --- REGISTRO DE PLUGINS ---
      
      // 1. Mochawesome: Registra sus propias tareas internas
      require('cypress-mochawesome-reporter/plugin')(on);

      // 2. Allure: Registra la tarea 'writeAllureResults' y otras
      allureWriter(on, config);

      // 3. Configuración de Ambientes
      const envFile = config.env.configFile || 'dev';
      const envConfig = getConfigurationByFile(envFile);

      // --- IMPORTANTE: Retornar el config combinado ---
      return Object.assign(config, envConfig);
    },
    baseUrl: 'https://www.saucedemo.com',
    // Otras configuraciones...
  },
});
//const { defineConfig } = require("cypress");
//module.exports = defineConfig({
  //e2e: {
   // baseUrl: 'https://www.saucedemo.com',
    //setupNodeEvents(on, config) {},
 // },
//});

/*
const { defineConfig } = require("cypress");

module.exports = defineConfig({
  // Reemplaza esto con el ID que te dio Cypress Cloud en su panel
  projectId: "hzwu3p", 

  e2e: {
    setupNodeEvents(on, config) {
      // Aquí puedes integrar tus reportes (Allure, etc.)
      return config;
    },
    // Configuración básica para que reconozca los tests
    //
    /*specPattern: 'cypress/e2e/*.cy.{js,jsx,ts,tsx}',
    //supportFile: 'cypress/support/e2e.js',
    //baseUrl: 'https://www.saucedemo.com', 
  },
});

*/
/*
const { defineConfig } = require("cypress");
const { GoogleGenerativeAI } = require("@google/generative-ai");

module.exports = defineConfig({
  e2e: {
    setupNodeEvents(on, config) {
      on('task', {
        async askGemini(prompt) {
          const genAI = new GoogleGenerativeAI("TU_API_KEY_AQUI");
          const model = genAI.getGenerativeModel({ model: "gemini-1.5-flash" });
          
          const result = await model.generateContent(prompt);
          return result.response.text();
        },
      });
      return config;
    },
  },
});
*/
