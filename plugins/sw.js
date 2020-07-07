import firebase from 'firebase'
import Vue from 'vue'
// import axios from 'axios'
// import * as store from '../store/index'

if (process.client) {
  if (!firebase.apps.length) {
    firebase.initializeApp({
      apiKey: 'AIzaSyAwyrLH3BhmvmkuTvIyYGY26F_52HxW1ck',
      authDomain: 'duatpwnd-a6100.firebaseapp.com',
      databaseURL: 'https://duatpwnd-a6100.firebaseio.com',
      projectId: 'duatpwnd-a6100',
      storageBucket: 'duatpwnd-a6100.appspot.com',
      messagingSenderId: '86991572039',
      appId: '1:86991572039:web:2271a2e23cd5d29fe8f562',
      measurementId: 'G-9PEKNX84RM',
    })
    const messaging = firebase.messaging()

    messaging
      .requestPermission()
      .then(function () {
        console.log('Notification permission granted.')
        return messaging.getToken()
      })
      .then(function (result) {
        console.log('The token is: ', result)

        Vue.prototype.$messageToken = result
      })
      .catch(function (err) {
        console.log('Unable to get permission to notify.', err)
      })

    messaging.onMessage(function (payload) {
      console.log('Message received. ', payload)
    })
  }
}

export default firebase
