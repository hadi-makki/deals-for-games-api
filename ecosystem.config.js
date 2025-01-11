module.exports = {
  apps: [
    {
      name: 'deals-for-games-api',
      script: './dist/src/main.js',
      cwd: '/home/ubuntu/saleasy-api',
      watch: true,
      env: {
        NODE_ENV: 'production',
      },
    },
  ],
};
