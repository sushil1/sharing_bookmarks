var express = require('express')
var router = express.Router()
var controllers = require('../controllers')
var bcrypt = require('bcryptjs')
var utils = require('../utils')


router.get('/logout', function(req, res, next){
    req.session.reset()
    res.json({
      confirmation:'success',
      message:'logged out'
    })
    return
  })

  router.get('/currentuser', function(req, res, next){
    if(req.session == null){
      res.json({
        confirmation:'fail',
        message:'no session'
      })
      return
    }
    if(req.session.token == null){
      res.json({
        confirmation:'fail',
        message:'no token found'
      })
      return
    }
    utils.JWT.verify(req.session.token, process.env.JWT_TOKEN_SECRET)
    .then(function(decode){
      return controllers.profile.getById(decode.id)
      .then(function(profile){
        res.json({
          confirmation:'success',
          result: profile
        })
      })
    })
    .catch(function(err){
      res.json({
        confirmation:'fail',
        message:'invalid token'
      })
    })
  })




router.post('/register', function(req, res, next){
    controllers.profile.post(req.body)
    .then(function(profile){
      var token = utils.JWT.sign({id:profile.id}, process.env.JWT_TOKEN_SECRET, {expiresIn: 4000})
      req.session.token = token
      res.json({
        confirmation:'success',
        result: profile,
        token: token
      })
    })
    .catch(function(err){
      res.json({
        confirmation:'fail',
        message:err+''
      })
    })
  })

  router.post('/login', function(req, res, next){
    var credentials = req.body
    controllers.profile.get({email: credentials.email}, true)
    .then(function(profiles){
      if(profiles.length == 0){
        res.json({
          confirmation:'fail',
          message:'no registered email'
        })
        return
      }
        var profile = profiles[0]
        var comparePassword = bcrypt.compareSync(credentials.password, profile.password)
        if(comparePassword == false){
          req.session.reset()
          res.json({
            confirmation:'fail',
            message:'wrong password'
          })
          return
        }
          var token = utils.JWT.sign({id:profile._id}, process.env.JWT_TOKEN_SECRET, {expiresIn: 4000})
          req.session.token = token
          res.json({
            confirmation:'success',
            profile:profile.summary(),
            token:token
          })
    })
    .catch(function(err){
      res.json({
        confirmation:'fail',
        message:err
      })
    })
  })

module.exports = router
