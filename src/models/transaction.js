const uuid = require('uuid')
const { Schema } = require('mongoose')

const TransactionSchema = new Schema({
  _id: {
    type: String,
    default: uuid.v4
  },
  order_id: {
    type: String,
    required: true
  },
  customer:{
    type: String
  },
  status: {
    type: String
  }

}, {
  timestamps: {
    createdAt: 'created_at',
    updatedAt: 'updated_at'
  },
  toObject: { virtuals: true },
  toJSON: { virtuals: true }
})

TransactionSchema.pre('save', function (next) {
  this.updated_at = new Date()
  return next()
})

module.exports = TransactionSchema

