module.exports = function (mongoose) {
  mongoose.models = {}
  mongoose.models.users = mongoose.model('users', mongoose.collections.users)
}
