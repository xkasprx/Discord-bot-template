let client, message, option, scripts, config, query, util, guild, self;

exports.messages = {
	init: async function(x, m, o, s){
		client = x;
		message = m;
		option = o;
		scripts = s;
		
		config = scripts.config;
		query = scripts.database.query;
		util = scripts.util;
		
		guild = client.guilds.cache.get(config.important.guildId);
		
		self = this;

		await self.e[option]();

		return response;
	},
	e: {
		talkingToBot: async () => {
			return;
		},
		talkingAboutBot: async () => {
			return;
		},
		replyingToBot: async () => {
			return;
		},
	},
	f: {

	},
	v: {

	}
};