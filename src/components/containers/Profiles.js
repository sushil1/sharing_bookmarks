import React, {Component} from 'react'
import {APIManager} from '../../utils'
import actions from '../../actions'
import {connect} from 'react-redux'

class Profiles extends Component{
  constructor(){
    super()
     this.state={
       profiles: []
     }
  }

  componentDidMount(){
    APIManager.get('/api/profile', null, (err, response)=>{
      if(err){
        console.log(err)
        return
      }
      this.props.profilesReceived(response.result)
    })
}

selectProfile(profile, event){
  event.preventDefault()
  //console.log('selectProfile: '+JSON.stringify(profile))
  this.props.profileSelected(profile)
}

  render(){
    const list = this.props.profiles.map((profile, i)=>{
      let name = null
      if(this.props.isSelected == null)
        name = <a onClick={this.selectProfile.bind(this, profile)} href='#'>{profile.name}</a>
      else if (this.props.isSelected.id == profile.id)
        name = <a onClick={this.selectProfile.bind(this, profile)} href='#'><strong style={{color:'red'}}>{profile.name}</strong></a>
      else
        name = <a onClick={this.selectProfile.bind(this, profile)} href='#'>{profile.name}</a>
      return(
        <li key={profile.id}>{name}</li>
      )
    })
    return(
      <div>
        <h4>Profiles</h4>
        <ul>
          {list}
        </ul>
      </div>
    )
  }
}

const stateToProps = (state)=>{
  return{
    profiles: state.profile.list,
    isSelected: state.profile.isSelected
  }
}

const dispatchToProps = (dispatch)=>{
  return{
  profilesReceived: (profiles) => dispatch(actions.profilesReceived(profiles)),
  profileSelected: (profile) => dispatch(actions.profileSelected(profile))
  }
}

export default connect(stateToProps, dispatchToProps)(Profiles)
