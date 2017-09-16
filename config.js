module.exports = {
    PORT: process.env.PORT || 8081,
    db: {
      database: process.env.DB_NAME || 'fitness_tracker_server',
      username: process.env.DB_USER || 'fitness_tracker_server',
      password: process.env.DB_PASS || 'fitness_tracker_server',
      options: {
        host: process.env.HOST || 'localhost',
      }
    },
    auth: {
      jwtSecret: process.env.JWT_SECRET || 'fitness_tracker_server'
    }
  }
  