import { initializeApp } from 'firebase/app'
import { getDatabase } from 'firebase/database'
import { getStorage } from 'firebase/storage'

const firebaseConfig = {
  apiKey: process.env.REACT_APP_API_KEY,
  authDomain: 'pics4urself.firebaseapp.com',
  databaseURL:
    'https://pics4urself-default-rtdb.asia-southeast1.firebasedatabase.app',
  projectId: 'pics4urself',
  storageBucket: 'pics4urself.appspot.com',
  messagingSenderId: '1055965552119',
  appId: '1:1055965552119:web:282858f90f00faf5a522f2',
}

const app = initializeApp(firebaseConfig)
export const storage = getStorage(app)
export const db = getDatabase(app)
