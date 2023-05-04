let client, scripts, config, query, util, guild, self;

exports.e = {
	name: `error`,
	init: function(x, s){
		client = x;
		scripts = s;
		
		config = scripts.config;
		query = scripts.database.query;
		util = scripts.util;

		guild = client.guilds.cache.get(config.important.guildId);
				
		self = this;

		client.on(self.name, self.event);
	},
	event: async (e) => {
		util.log(`[ERROR]                             `, `${util.prettyDate()}`, `red`, `red`);
		console.log(e);
	},
};