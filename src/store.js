import { cibWindows } from '@coreui/icons'
import { createStore } from 'redux'

const initialState = {
  sidebarShow: true,
  token : window.localStorage.getItem("token"),
  whatsAppInfo : {},
  statusLogin : {},
  tokenSS : window.sessionStorage.getItem("token"),
  
}

const changeState = (state = initialState, { type, ...rest }) => {
  switch (type) {
    case 'set':
      return { ...state, ...rest }
    default:
      return state
  }
}

console.log("line 19 whatsApp info", initialState.tokenSS)
const store = createStore(changeState)
export default store
