import * as firebase from 'firebase/app'

// TDB: Replace with env variables
const firebaseConfig = {
  apiKey: 'AIzaSyDYF0F_OsM3GsVAoKfNgLBMHrrmueERkL0',
  authDomain: 'fir-auth-52099.firebaseapp.com',
  databaseURL: 'https://fir-auth-52099.firebaseio.com',
  projectId: 'fir-auth-52099',
  storageBucket: 'fir-auth-52099.appspot.com',
  messagingSenderId: '642523355659',
  appId: '1:642523355659:web:5cbabd2f520bbe807e050e'
}

firebase.initializeApp(firebaseConfig)
