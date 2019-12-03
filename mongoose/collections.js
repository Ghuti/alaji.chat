module.exports = function (mongoose) {
  mongoose.collections = {}
  mongoose.collections.users = new mongoose.Schema({
    pseudo: {
      type: String,
      unique: true
    },
    email: {
      type: String,
      unique: true
    },
    avatar: String,
    right: String,
  })

  mongoose.collections.messages = new mongoose.Schema({
    pseudo: {
      type: String,
    },
    date: String,
    avatar: String,
    right: String,
  })
}
