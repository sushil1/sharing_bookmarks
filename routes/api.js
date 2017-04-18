var express = require('express')
var router = express.Router()
var controllers = require('../controllers')


router.get('/:resource', function(req, res, next){

  var resource = req.params.resource
  var controller = controllers[resource]

  if(controller == null){
    res.json({
      confirmation: 'failed',
      result: 'resource not available'
    })
  return
  }

  controller.get(req.query, false)
  .then(function(results){
    res.json({
      confirmation: 'success',
      result: results
    })
  })
  .catch(function(err){
    res.json({
      confirmation: 'fail',
      result: err+''
    })
  })
})



router.get('/:resource/:id', function(req, res, next){

  var resource = req.params.resource
  var controller = controllers[resource]
  if(controller == null){
    res.json({
      confirmation:'fail',
      result: 'resource not available'
    })
    return
  }

  var id = req.params.id
  controller.getById(id)
  .then(function(result){
    res.json({
      confirmation:'success',
      result: result
    })
  })
  .catch(function(err){
    res.json({
      confirmation:'fail',
      result: 'invalid id'
    })
  })

})

router.post('/:resource', function(req, res, next){
  var resource = req.params.resource
  var controller = controllers[resource]
  if(controller == null){
    res.json({
      confirmation:'fail',
      result:'resource not available'
    })
    return
  }
  controller.post(req.body)
  .then(function(result){
    res.json({
      confirmation:'success',
      result: result
    })
  })
  .catch(function(err){
    res.json({
      confirmation:'fail',
      message:err+''
    })
  })
})


module.exports = router
