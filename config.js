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
  leaderboard: {
    options: {
      collection: 'goals_achieved',
      page_size: 5,
      num_pages: 2,
      start_time: {
        'milliseconds': 0,
        'seconds': 30,
        'minutes': 0,
        'hours': 0
      },
      duration: 1000 * 60 * 60 * 24
    }
  },
  auth: {
    jwtSecret: process.env.JWT_SECRET || 'fitness_tracker_server'
  }
}
