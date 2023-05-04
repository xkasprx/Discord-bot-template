let client, scripts, config, guild, query, util, self;

exports.p = {
	name: `unhandledRejection`,
	init: function(x, s){
		client = x;
		scripts = s;
		
		config = scripts.config;
		query = scripts.database.query;
		util = scripts.util;
		
		guild = client.guilds.cache.get(config.important.guildId);
		
		self = this;

		process.on(self.name, self.event);
	},
	event: async (e) => {
		client.emit(`error`, e);
	},
};