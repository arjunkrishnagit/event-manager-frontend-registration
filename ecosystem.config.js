module.exports = {
  apps: [
    {
      name: 'bctreg',
      script: 'ng',
      args: 'serve --port 8089 --disable-host-check',
      instances: 1,
      autorestart: true,
      watch: false,
      max_memory_restart: '1G',
      env: {
        NODE_ENV: 'development'
      },
      env_production: {
        NODE_ENV: 'production'
      }
    }
  ]
};
