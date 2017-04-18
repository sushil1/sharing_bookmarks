var mongoose = require('mongoose')

var BookmarkSchema = new mongoose.Schema({
  title: {type:String, default:''},
  profile: {type:String, default:''},
  url: {type:String, default:''},
  image: {type:String, default:''},
  description: {type:String, default:''}

})

BookmarkSchema.methods.summary = function(){
  var summary = {
    id: this._id.toString(),
    title: this.title,
    profile: this.profile,
    url: this.url,
    image: this.image,
    description: this.description
  }
  return summary
}

module.exports = mongoose.model('BookmarkSchema', BookmarkSchema)
