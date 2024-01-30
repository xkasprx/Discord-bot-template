module.exports = {
  apps : [{
    name: `Bot`,
    script: `./bot.js`,
    watch: true,
    max_memory_restart: `150M`,
    env: {
      NODE_ENV: `production`,
    },
  }],
};
