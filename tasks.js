const {
	REST
} = require(`@discordjs/rest`);
const {
	Routes
} = require(`discord-api-types/v10`);
const fs = require(`fs`);

let client, scripts, commandinfo, config, messages, query, settings, util, guild, self;

exports.tasks = {
	name: `tasks`,
	init: function(x, s){
		client = x;
		scripts = s;

		config = scripts.config;
		messages = scripts.messages;
		query = scripts.database.query;
		settings = scripts.settings;
		util = scripts.util;

		guild = client.guilds.cache.get(config.important.guildId);
		
		self = this;

		self.intervalCount = 0;

		setInterval(self.check, 1000);
	},
	check: async () => {
		let date = new Date();
		let isNewDay = date.getHours() === 0 && date.getMinutes() === 0;
		let isNoon = date.getHours() === 12 && date.getMinutes() === 0;

		if(self.intervalCount % 1 === 0){
			
		}
		if(self.intervalCount % 5 === 0){

		}
		if(self.intervalCount % 10 === 0){

		}
		if(self.intervalCount % 15 === 0){

		}
		if(self.intervalCount % 30 === 0){
			await self.tasks.setActivity();
		}
		if(self.intervalCount % 45 === 0){

		}
		if(self.intervalCount % 60 === 0){

		}
		if(self.intervalCount % (60 * 5) === 0){

		}
		if(self.intervalCount % (60 * 10) === 0){

		}
		if(self.intervalCount % (60 * 15) === 0){

		}
		if(self.intervalCount % (60 * 30) === 0){

		}
		if(self.intervalCount % (60 * 45) === 0){

		}
		if(self.intervalCount % (60 * 60) === 0){
			self.intervalCount = 0;
		}

		if(!self.bootup){
			self.bootup = true;
			await self.tasks.updateCommands();
		}

		if(isNewDay && !self.newDayChecked){
			self.newDayChecked = true;
		}

		if(isNoon && !self.noonChecked){
			self.noonChecked = true;
		}
		
		self.intervalCount++;
	},
	tasks: {
		setActivity: async () => {
			let number = [0, 2, 3][Math.floor(Math.random() * 3)];
			let statusText;

			if(number === 0){
				file = `playing.json`;
			}else if(number === 2){
				file = `listening.json`;
			}else if(number === 3){
				file = `watching.json`;
			}

			let status = require(`./config/${file}`);
				statusText = status[Math.floor(Math.random() * status.length)];

			let activity = {
				name: `${statusText}`,
				type: number,
			};

			await client.user.setActivity(activity);
		},
		updateCommands: async () => {
			let commands = [];
			let rest = new REST({
				version: `10`
			}).setToken(config.important.token);
			let commandFiles = fs.readdirSync(`${__dirname}/commands`).filter(f => f.endsWith(`.js`));
			for(let c = 0; c < commandFiles.length; c++){
				let command = require(`${__dirname}/commands/${commandFiles[c]}`).command;
				command.type !== 1 ? delete command.description : 0;
				commands.push(command);
			}

			(async () => {
				await rest.put(Routes.applicationCommands(config.important.clientId), {body: commands});
				
				util.log(`Command updates complete            `, util.prettyDate(), `green`, `blue`);
			})();
		},
	},
};