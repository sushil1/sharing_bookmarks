import React, {Component} from 'react'

class Signup extends Component{
  constructor(){
    super()
    this.state = {
      visitor: {
        name: '',
        email: '',
        password: ''
      }
    }
  }

  updateVisitor(event){
    let updated = Object.assign({}, this.state.visitor)
    updated[event.target.id] = event.target.value
    this.setState({
      visitor: updated
    })
  }

  registerVisitor(event){
    this.props.register(this.state.visitor)

  }

  login(event){
    event.preventDefault()
    this.props.login(this.state.visitor)
  }


  render(){
    return(
      <div>
        <h3>SignUp</h3>
          <input type='text' onChange={this.updateVisitor.bind(this)} className='form-control' name='name' id='name' placeholder='Name'/><br />
          <input id='email' type='text' onChange={this.updateVisitor.bind(this)} className='form-control' name='email' placeholder='Email'/><br />
          <input id='password' type='password' onChange={this.updateVisitor.bind(this)} className='form-control' name='password' placeholder='Password'/><br />
          <button onClick={this.registerVisitor.bind(this)}>Join</button>


          <h3>LogIn</h3>
            <input id='email' type='text' onChange={this.updateVisitor.bind(this)} className='form-control' name='email' placeholder='Email'/><br />
            <input id='password' type='password' onChange={this.updateVisitor.bind(this)} className='form-control' name='password' placeholder='Password'/><br />
            <button onClick={this.login.bind(this)}>LogIn</button>

      </div>
    )
  }
}


export default Signup
