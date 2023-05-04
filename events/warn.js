let client, scripts, config, query, util, guild, channelLogs, self;

exports.e = {
	name: `warn`,
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
	event: async (info) => {
		util.log(`[WARN]                              `, `${util.prettyDate()}\n${info}`, `yellow`, `yellow`);
	},
};