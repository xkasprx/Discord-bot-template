let client, interaction, customID, scripts, config, query, util, member, guild, self;

exports.modals = {
	init: async function(x, i, c, s){
		client = x;
		interaction = i;
		customID = c;
		scripts = s;
		
		config = scripts.config;
		query = scripts.database.query;
		util = scripts.util;

		member = interaction.member;
		
		guild = client.guilds.cache.get(config.important.guildId);
				
		self = this;

		await self.e[customID]();

		return response;
	},
	e: {

	},
	f: {

	},
	v: {

	},
};