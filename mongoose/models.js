module.exports = function (mongoose) {
  mongoose.models = {}
  mongoose.models.users = mongoose.model('users', mongoose.collections.users)
  mongoose.models.messages = mongoose.model('messages', mongoose.collections.messages)
}
