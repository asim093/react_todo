
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";


const firebaseConfig = {
  apiKey: "AIzaSyDvbyHzEkf_ewoL_Y_moZkB75wQth-Jkmw",
  authDomain: "react-todo-c5e60.firebaseapp.com",
  projectId: "react-todo-c5e60",
  storageBucket: "react-todo-c5e60.appspot.com",
  messagingSenderId: "378330668807",
  appId: "1:378330668807:web:3026dd16f3cfa539cd6fa2",
  measurementId: "G-BXR7PJ0ZQN"
};

const app = initializeApp(firebaseConfig);
  const analytics = getAnalytics(app);


  export default {app , analytics}