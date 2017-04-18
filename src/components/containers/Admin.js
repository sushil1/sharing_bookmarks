import React, {Component} from 'react'
import {Signup} from '../presentation'
import {APIManager} from '../../utils'
import actions from '../../actions'
import {connect} from 'react-redux'

class Admin extends Component{
  constructor(){
    super()
    this.state = {
      url:''
    }
  }

  componentDidMount(){
    //check the current user
    APIManager.get('/account/currentuser', null, (err, response)=>{
      if(err){
        alert(err.message)
        return
      }
      if(response.result == null){
        return
      }
    this.props.currentUserReceived(response.result)
    })
  }

  register(visitor){
    APIManager.post('/account/register', visitor, (err, response)=>{
      if(err){
        console.log(err)
        return
      }
      this.props.profileCreated(response.result)
    })
  }
  loginUser(user){

    APIManager.post('/account/login', user, (err, response)=>{
      if(err){
        let msg = err.message || err
        alert(msg)
        return
      }
      this.props.currentUserReceived(response.profile)
    })
}

  submitLink(event){
    event.preventDefault()
    console.log('submitLink: '+this.state.url)

    const bookmark = {
      profile: this.props.currentUser.id,
      url: this.state.url
    }

    APIManager.post('/api/bookmark', bookmark, (err, response)=>{
      if(err){
        let msg = err.message || err
        alert(msg)
      }
      this.props.bookmarkCreated(response.result)
    })
}

  updateLink(event){
    event.preventDefault()
    this.setState({
      url: event.target.value
    })
  }


  render(){
    return(
      <div>
        {(this.props.currentUser != null)?
        <div>
          <h2>Welcome {this.props.currentUser.name}</h2>
          <input onChange={this.updateLink.bind(this)} className='form-control' placeholder='http://www.example.com' type='text' /><br />
          <button onClick={this.submitLink.bind(this)} className='form-control'>Submit Bookmark</button>
        </div>
       :
        <Signup register={this.register.bind(this)} login={this.loginUser.bind(this)}/>
      }
      </div>
    )
  }
}


const stateToProps = (state)=>{
  return{
    profiles: state.profile.list,
    currentUser: state.account.currentuser
  }
}

const dispatchToProps = (dispatch)=>{
  return{
    profileCreated: (profile) =>
      dispatch(actions.profileCreated(profile)),
    currentUserReceived: (profile)=> dispatch(actions.currentUserReceived(profile)),
    bookmarkCreated: (bookmark) => dispatch(actions.bookmarkCreated(bookmark))
  }
}

export default connect(stateToProps, dispatchToProps)(Admin)
