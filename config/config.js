var path = require('path')
, rootPath = path.normalize(__dirname + '/..')

module.exports={
	development: {
    db: 'mongodb://localhost/pictchat',
    root: rootPath
  },  
  production: {
    db: '',
    root: rootPath
  }
}
