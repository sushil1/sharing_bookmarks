var Bookmark = require('../models/Bookmark')
var Promise = require('bluebird')
var utils = require('../utils')
var superagent = require('superagent')

module.exports = {

  get: function(params, isRaw){
    return new Promise(function(resolve, reject){
      Bookmark.find(params, function(err, bookmarks){
        if(err){
          reject(err)
          return
        }
        if(isRaw){
          resolve(bookmarks)
          return
        }
        var list = []
        bookmarks.forEach(function(bookmark){
          list.unshift(bookmark.summary())
        })
        resolve(list)
      })
    })
  },

  getById: function(id, isRaw){
    return new Promise(function(resolve, reject){
      Bookmark.findById(id, function(err, bookmark){
        if(err){
          reject(err)
          return
        }
        if(isRaw){
          resolve(bookmark)
          return
        }
        resolve(bookmark.summary())
      })
    })
  },

  post: function(body, isRaw){
    return new Promise(function(resolve, reject){
      superagent
      .get(body.url)
      .query(null)
      .set('Accept', 'text/html')
      .end(function(err, response){
        if(err){
          reject(err)
          return
        }
        var html = response.text
        var metaData = utils.Scraper.scrape(html, ['og:title', 'og:description', 'og:image', 'og:url'])
        var keys = Object.keys(metaData)
        keys.forEach(function(key, i){
          body[key] = metaData[key]
        })

      Bookmark.create(body, function(err, bookmark){
        if(isRaw){
          resolve(bookmark)
          return
        }
        resolve(bookmark.summary())
      })
    })
    })
  }

}
