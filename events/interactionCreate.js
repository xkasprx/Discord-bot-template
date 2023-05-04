let client, scripts, buttons, config, modals, query, util, guild, self;

exports.e = {
	name: `interactionCreate`,
	init: function(x, s){
		client = x;
		scripts = s;

		buttons = scripts.buttons;
		config = scripts.config;
		modals = scripts.modals;
		query = scripts.database.query;
		util = scripts.util;
		
		guild = client.guilds.cache.get(config.important.guildId);
				
		self = this;

		client.on(self.name, self.event);
	},
	event: async (interaction) => {
		let responseNeeded = false;
		let user = interaction.user;
		let command = interaction.type === 2;
		let messageComponent = interaction.type === 3;
		let autocomplete = interaction.type === 4;
		let modalSubmit = interaction.type === 5;

		if(autocomplete){
			let field = interaction.options.getFocused(true);
			let input = interaction.options.data[0].value;

		}

		if(command){
			let args = {};
			let command = client.commands.get(interaction.commandName);

			for(let i = 0; i < interaction.options.data.length; i++){
				let option = interaction.options.data[i];

				if(option.type === 1){
					option.name ? args[option.name] = true : 0;
					for(let o of option.options){
						args[o.name] = o.value;
					}
				}else if(option.value){
					args[option.name] = option.value;
				}
			}

			await command.init(client, args, interaction, scripts).catch(async error => {
				responseNeeded = true;
				content = `There was an error while executing this command! Please notify <@${guild.ownerId}> of this issue`;

				util.log(`[ERROR]                             `, `${util.prettyDate()}\n${error}`, `red`, `red`);

			})
		}

		if(messageComponent){
			let customID = interaction.customId;

			await buttons.init(client, interaction, customID, scripts);

		}

		if(modalSubmit){
			let customID = interaction.customId;

			await modals.init(client, interaction, customID, scripts);
		}
	},
	f: {

	},
	v: {

	},
};