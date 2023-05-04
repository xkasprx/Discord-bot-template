let client, scripts, config, messages, query, util, guild, self;

exports.e = {
	name: `messageCreate`,
	init: function(x, s){
		client = x;
		scripts = s;
		
		config = scripts.config;
		messages = scripts.messages;
		query = scripts.database.query;
		util = scripts.util;

		guild = client.guilds.cache.get(config.important.guildId);
				
		self = this;

		client.on(self.name, self.event);
	},
	event: async (message) => {
		let botID = client.user.id;
		let bot = `<@${botID}>`;
		
		let option;
		let response;

		let channel = message.channel;
		let user = message.author;
		let member = message.member || guild.members.cache.get(user.id);
		let mentions = message.mentions;
		let botIsAuthor = message.author.bot;

		if(botIsAuthor) return;

		let talkingToBot = message.content.startsWith(bot);
		let talkingAboutBot = !talkingToBot && message.content.includes(bot);
		let replyingToBot = message.type === 19 && mentions.repliedUser.id === botID;

		if(talkingToBot){
			option = `talkingToBot`;
			response = await messages.init(client, message, option, scripts);

			await message.reply(response);
		}

		if(talkingAboutBot){
			option = `talkingAboutBot`;
			response = await messages.init(client, message, option, scripts);

			await message.reply(response);
		}

		if(replyingToBot){
			option = `talkingAboutBot`;
			response = await messages.init(client, message, option, scripts);

			await message.reply(response);
		}
	},
	f: {

	}
};