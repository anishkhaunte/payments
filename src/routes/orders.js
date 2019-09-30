const modules = include('modules')
const express = require('express')
const router = express.Router()

router.param('orderId', (req, res, next, id) =>
  Q().then(() =>
    req.app.models.Order
    .findOne({_id: id}).exec()
  ).then(function (order) {
    if (!order) {
      return res.notFound()
    } else {
      req.order = order
      return next()
    }
  }).catch(function (err) {
    logError(err)
    return next(err)
  }).done()
)

/*
@api {POST} /management/requests/list fetch list of all pending requests
@apiName List
@apiGroup Management

@apiSuccess {Boolean} status true
@apiSuccess {Object} data
*/
router.get('/', function (req, res, next) {
  let queryOpts
  const where = {}

  if (req.query.page) {
    const { page } = req.query

    queryOpts = {
      skip: (page - 1) * CONST.DEFAULT_PAGINATION_LIMIT,
      limit: CONST.DEFAULT_PAGINATION_LIMIT
    }
  } else {
    queryOpts = {}
  }

  new Promise((reject, resolve)=>{
    return req.app.models.Order.find(where, {}, queryOpts).exec()
  }).then(function(orders) {
    res.success(orders);
  }).catch(function (err) {
    logError(err)
    console.log(err)
    //return res.serverError()
  }).done()
})


/*
@api {POST} /orders/request_access Provides a normal user to request for write access
@apiName Request
@apiGroup Management

@apiParam {String} [user_id]

@apiSuccess {Boolean} status true
@apiSuccess {Object} data
*/
router.post('/cancel',(req,res,next) =>
  new Promise((reject, resolve)=>{
    //TODO: DO the entire thing
    console.log('the sent user_id')
    console.log(req.body)
    return req.app.models.Order.update({user_id: req.body.user_id})
  }).then(function(order) {
    res.success(order)
  }).catch(function (err) {
    logError(err)
  }).done()
)


router.post('/confirm',(req,res,next) =>
  new Promise((reject, resolve)=>{
    //TODO: DO the entire thing
    console.log('the sent user_id')
    console.log(req.body)
    return req.app.models.Order.update({user_id: req.body.user_id})
  }).then(function(order) {
    res.success(order)
  }).catch(function (err) {
    logError(err)
  }).done()
)
/*
@api {POST} /orders/ Provides a normal user to request for write access
@apiName Approve
@apiGroup Management

@apiParam {String} [user_id]

@apiSuccess {Boolean} status true
@apiSuccess {Object} data
*/
router.post('/', (req,res,next) =>
  new Promise((reject,resolve)=>{
    //TODO: Check the customer name validation and the status value(creation)
    //TODO: better catch block handling by refrring to other examples
    //TODO : rejecting the promise
    const order = new req.app.models.Order({
      customer: req.body.first_name,
      discountCode: req.body.discountCode || null,
      description: req.body.description || null,
      status: req.body.status
    })
    return order.save()
  }).then(function(order){
      res.success({order}, HTTP_STATUS_CODES.CREATED);
  }).catch(function (err) {
      logError(err)
  }).done()
)

router.get('/:orderId', function (req, res, next) {
  let order = req.order
  return res.success({order},HTTP_STATUS_CODES.CREATED)
})

module.exports = router