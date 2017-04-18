import React, {Component} from 'react'
import {Profiles, Bookmarks, Admin} from '../containers'

class Home extends Component{
  render(){
    return(
      <div className='container'>
        <h2>social-bookmarker</h2>
        <div className='row' style={{paddingTop:20}}>
          <div className='col-md-3' style={{background:"#f9f9f9"}}>
            <Profiles />
          </div>
          <div className='col-md-6'>
            <Bookmarks />
          </div>
          <div className='col-md-3' style={{background:"#f9f9f9"}}>
            <Admin />
          </div>
        </div>
      </div>
    )
  }
}


export default Home
