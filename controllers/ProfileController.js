var Profile = require('../models/Profile')
var Promise = require('bluebird')
var bcrypt = require('bcryptjs')

module.exports = {

  get: function(params, isRaw){
    return new Promise(function(resolve, reject){
      Profile.find(params, function(err, profiles){
        if(err){
          reject(err)
          return
        }
        if(isRaw){
          resolve(profiles)
          return
        }
        var list = []
        profiles.forEach(function(profile){
          list.push(profile.summary())
        })
        resolve(list)
      })
    })
  },

  getById: function(id, isRaw){
    isRaw = (isRaw == null)? false: true
    return new Promise(function(resolve, reject){
      Profile.findById(id, function(err, profile){
        if(err){
          reject(err)
          return
        }
        if(isRaw){
          resolve(profile)
          return
        }
        resolve(profile.summary())
      })
    })
  },

  post:function(body, isRaw){
    return new Promise(function(resolve, reject){
      var password = body.password
      body['password'] =bcrypt.hashSync(password, 10)

      Profile.create(body, function(err, profile){
        if(err){
          reject(err)
          return
        }
        if(isRaw){
          resolve(profile)
          return
        }
        resolve(profile.summary())
      })
    })
  }

}
