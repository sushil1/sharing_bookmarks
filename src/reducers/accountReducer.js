import constants from '../constants'

var initialState = {
  currentuser: null
}

export default (state = initialState, action)=>{
  let updated = Object.assign({}, state)

  switch(action.type){
    case constants.PROFILE_CREATED:
    updated['currentuser'] = action.profile
    return updated

    case constants.CURRENT_USER_RECEIVED:
    updated['currentuser'] = action.profile
    return updated

    default:
      return state
  }

}
