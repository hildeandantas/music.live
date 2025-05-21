import { initializeApp } from 'firebase/app'
import { getFirestore } from 'firebase/firestore'

const firebaseConfig = {
    apiKey: 'SUA_API_KEY',
    authDomain: 'seu-projeto.firebaseapp.com',
    projectId: 'seu-projeto-id',
    storageBucket: 'seu-projeto.appspot.com',
    messagingSenderId: 'seu-sender-id',
    appId: 'seu-app-id',
}

const app = initializeApp(firebaseConfig)
const db = getFirestore(app)

export { db }
