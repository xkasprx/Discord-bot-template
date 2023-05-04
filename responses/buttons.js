let client, interaction, customID, scripts, config, query, util, member, message, guild, self;

exports.buttons = {
	init: async function(x, i, c, s){
		client = x;
		interaction = i;
		customID = c;
		scripts = s;
		
		config = scripts.config;
		query = scripts.database.query;
		util = scripts.util;
		
		member = interaction.member;
		message = interaction.message;
		
		guild = client.guilds.cache.get(config.important.guildId);
				
		self = this;

		if(self.e[customID]){
			return self.e[customID](interaction);
		}
	},
	e: {
		
	},
	f: {

	},
	v: {

	},
};