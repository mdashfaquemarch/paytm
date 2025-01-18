import { atom } from 'recoil'

const currentUserState = atom({
    key: "userState",
    default: []
});

const isUserLoggedIn = atom({
    key: "isUserAuthState",
    default: false
})



  export {
    currentUserState,
    isUserLoggedIn
  }