import React, {Component} from 'react'
import {APIManager} from '../../utils'
import actions from '../../actions'
import {connect} from 'react-redux'

class Bookmarks extends Component{
  constructor(){
    super()
     this.state={

     }
  }

  componentDidUpdate(){
    //console.log('componentDidUpdate: '+JSON.stringify(this.props.isSelected))

    const list = this.props.bookmarks[this.props.isSelected.id]
    if(list != null){
      //already exists no need to query
      return
    }

    const params = {profile: this.props.isSelected.id}
    APIManager.get('/api/bookmark', params, (err, response)=>{
      if(err){
        console.log(err)
        return
      }
      const results = response.result
      this.props.bookmarksReceived(results, params)
    })
}

  render(){
    const list = (this.props.isSelected == null) ? null : this.props.bookmarks[this.props.isSelected.id]

    return(
      <div>
        <h4>Bookmarks</h4>
        <ul>
          {(list == null)? null: list.map((bookmark, i)=>{
            return (
              <li key={bookmark.id} style={{paddingBottom:10}}>

              <a href={bookmark.url}>
              <img src={bookmark.image} style={{height:150, width:300}} />
              </a>
              <h5>{bookmark.title}</h5>
              </li>
            )
          })}
        </ul>
      </div>
    )
  }
}

const stateToProps = (state)=>{
  return{
    bookmarks: state.bookmark,
    isSelected: state.profile.isSelected
  }
}

const dispatchToProps = (dispatch)=>{
  return{
  bookmarksReceived: (bookmarks, params) => dispatch(actions.bookmarksReceived(bookmarks, params))
  }
}

export default connect(stateToProps, dispatchToProps)(Bookmarks)
