importScripts('https://www.gstatic.com/firebasejs/4.8.1/firebase-app.js')
importScripts('https://www.gstatic.com/firebasejs/4.8.1/firebase-messaging.js')

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
messaging.setBackgroundMessageHandler(function (payload) {
  console.log('모바일:', payload)
  const title = 'All Find'
  const options = {
    image: '.././icons/icon_512.5f6a36.png',
    badge: '.././icons/icon-72x72.png',
    body: payload.data.status,
  }

  return self.registration.showNotification(title, options)
})
