module.exports = {
  apps: [{
    name: 'backend',
    script: './index.js',
    instances: '-1',
    exec_mode: 'cluster',
    env: {
      NODE_ENV: 'production',
      PORT: 8080
    },
    instance_var: 'INSTANCE_ID'
  }, {
    name: 'cron',
    script: './cron.js',
    instance_var: 'INSTANCE_ID'
  }
  ]
}