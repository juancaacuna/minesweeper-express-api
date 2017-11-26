const SendResponse = require('./sendResponse')

const Entities = function(dbEntity, model) {
  this.name = model && model.singular
  this.db = dbEntity
  this.pk = model && model.pk
  this.columns = model && model.columns
}

Entities.prototype.get = function(req, res, next) {
  if (!this.db) return SendResponse(res, 'Internal DB error.', 500, 'error')

  this.db.find()
  .then(data => {
    SendResponse(res, '', 200, 'success', data)
  })
  .catch(err => {
    SendResponse(res, err.message, 400, 'error')
  })
}

Entities.prototype.getById = function(req, res, next) {
  if (!this.db) return SendResponse(res, 'Internal DB error.', 500, 'error')
  const entityId = req.params.id

  const findObj = {}
  findObj[this.pk] = entityId

  this.db.find(findObj, {})
  .then(data => {
    SendResponse(res, '', 200, 'success', data.length > 0 ? data[0] : null)
  })
  .catch(err => {
    SendResponse(res, err.message, 400, 'error')
  })
}

Entities.prototype.getByProperty = function(req, res, next) {
  if (!this.db) return SendResponse(res, 'Internal DB error.', 500, 'error')
  const property = req.params.prop
  const value = req.params.value

  const findObj = {}
  findObj[property] = value

  this.db.find(findObj, {})
  .then(data => {
    SendResponse(res, '', 200, 'success', data.length > 0 ? data[0] : null)
  })
  .catch(err => {
    SendResponse(res, err.message, 400, 'error')
  })
}

Entities.prototype.insert = function(req, res, next) {
  if (!this.db) return SendResponse(res, 'Internal DB error.', 500, 'error')

  const entity = req.body
  const insertObj = this.columns.reduce((insertObj, column) => {
    if (column != this.pk && entity[column]) {
      insertObj[column] = entity[column]
    }
    return insertObj
  }, {})

  this.db.insert(insertObj).then(entity => {
    SendResponse(res, `New ${this.name} added successfully.`, 200, 'success', entity)
  })
  .catch(err => {
    SendResponse(res, err.message, 400, 'error')
  })
}

Entities.prototype.update = function(req, res, next) {
  if (!this.db) return SendResponse(res, 'Internal DB error.', 500, 'error')
  
  const entityId = req.params.id
  const entity = req.body

  const updateObj = this.columns.reduce((updateObj, column) => {
    if (entity[column]) {
      updateObj[column] = entity[column]
    }
    return updateObj
  }, {})

  if (!updateObj[this.pk]) {
    updateObj[this.pk] = entityId
  }

  this.db.update(updateObj)
  .then(entity => {
    SendResponse(res, `${this.name} ${entityId} updated successfully.`, 200, 'success', entity)
  })
  .catch(err => {
    SendResponse(res, err.message, 400, 'error')
  })
}

Entities.prototype.delete = function(req, res, next) {
  if (!this.db) return SendResponse(res, 'Internal DB error.', 500, 'error')
  
  const entityId = req.params.id
  if (!entityId)
    return SendResponse(res, 'Id was not specified.', 400, 'error')

  const deleteObj = {}
  deleteObj[this.pk] = entityId

  this.db.destroy(deleteObj, {})
  .then(entity => {
    SendResponse(res, `${this.name} ${entityId} deleted successfully.`, 200, 'success')
  })
  .catch(err => {
    SendResponse(res, err.message, 400, 'error')
  })
}

module.exports = Entities