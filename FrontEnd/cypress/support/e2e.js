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

// import { getAuth, signInWithRedirect, OAuthProvider, getRedirectResult } from 'firebase/auth'
// import { initializeApp } from "firebase/app"
import firebase from 'firebase/compat/app'
import 'firebase/compat/auth'
import 'firebase/compat/database'
import 'firebase/compat/firestore'
import { attachCustomCommands } from 'cypress-firebase'

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
firebase.initializeApp(firebaseConfig)
attachCustomCommands({ Cypress, cy, firebase })
