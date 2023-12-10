// ***********************************************************
// This example support/e2e.js is processed and
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

// Import commands.js using ES2015 syntax:
import './commands'

import { getAuth, signInWithRedirect, OAuthProvider, getRedirectResult, signInWithPopup } from 'firebase/auth'
import { initializeApp } from "firebase/app";

// Alternatively you can use CommonJS syntax:
// require('./commands')

//Configuration of firebase project
const firebaseConfig = {
    apiKey: "AIzaSyD2RnishT97gI8MCggY0_xhVwgY7NlyNkE",
    authDomain: "survey-purdue.firebaseapp.com",
    projectId: "survey-purdue",
    storageBucket: "survey-purdue.appspot.com",
    messagingSenderId: "332326994310",
    appId: "1:332326994310:web:98bce7564de23273906c07",
    measurementId: "G-HVB0ZJFMNB"
}

// Initialize Firebase
const app = initializeApp(firebaseConfig)

Cypress.Commands.add('login', () => {
    const auth = getAuth(app)
    const provider = new OAuthProvider('microsoft.com')
    provider.setCustomParameters({
        prompt: 'login',
        tenant: 'b7dc318e-8abb-4c84-9a6a-3ae9fff0999f'
    })

    signInWithRedirect(auth, provider)

    getRedirectResult(auth)
        .then((result) => {
            const accessToken = result.user.accessToken;
            const username = result.user.displayName;

            localStorage.setItem("token", accessToken);
            localStorage.setItem("username", username);
        })
})