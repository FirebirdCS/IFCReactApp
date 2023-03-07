import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App";
import { initializeApp } from "firebase/app";
const root = ReactDOM.createRoot(
  document.getElementById("root") as HTMLElement
);

// Import the functions you need from the SDKs you need

// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyDWFdP9aE8vAwyMG1jq6pc0_MHr6ItLk84",
  authDomain: "ifc-react-app.firebaseapp.com",
  projectId: "ifc-react-app",
  storageBucket: "ifc-react-app.appspot.com",
  messagingSenderId: "54427550535",
  appId: "1:54427550535:web:56f3c2daa707f1606e8262",
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

root.render(
  <React.StrictMode>
    <App />
  </React.StrictMode>
);
