module.exports = {
    app: {
      api: 'api',
      vesion: '1.0.0'
    },
    PORT: process.env.PORT || 8081,
    db: {
      database: process.env.DB_NAME || 'fitness_tracker',
      username: process.env.DB_USER || 'admin',
      password: process.env.DB_PASS || 'admin',
      options: {
        host: process.env.HOST || 'localhost',
        collections: [
            'user',
            'goals_achieved'
        ],
        protocol: 'mongodb://',
        qualifier: '@ds139984.mlab.com:39984/fitness_tracker'

      }
    },
    auth: {
      jwtSecret: process.env.JWT_SECRET || 'fitness_tracker_server'
    }
  }
