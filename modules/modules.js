const fs = require(`fs`);

let client, scripts, config, util, guild, self;

exports.modules = {
	init: async function(x, s){
		client = x;
		scripts = s;

		config = scripts.config;
		util = scripts.util;

		guild = client.guilds.cache.get(config.important.guildId);
		
		self = this;

		await self.commands();
		await self.events();
		await self.process();
	},
	commands: async () => {
		let commandFiles = fs.readdirSync(`${__dirname}/../commands`).filter(f => f.endsWith(`.js`));
		client.commands = new Map();
		client.cmdNames = ``;
		client.cmdPerms = {};
		
		for(let c = 0; c < commandFiles.length; c++){
			let command = require(`${__dirname}/../commands/${commandFiles[c]}`).command;
			client.commands.set(command.name, command);
			client.cmdNames += `${command.name}\n`;
			client.cmdPerms[command.name] = command.roleNeeded;
		}
	},
	events: async () => {
		let eventFiles = fs.readdirSync(`${__dirname}/../events`).filter(f => f.endsWith(`.js`));
		client.events = new Map();
		client.eventNames = ``;

		for(let e = 0; e < eventFiles.length; e++){
			let event = require(`${__dirname}/../events/${eventFiles[e]}`).e;
			client.events.set(event.name, event);
			client.eventNames += `${event.name}\n`;
		}
	},
	process: async () => {
		let processFiles = fs.readdirSync(`${__dirname}/../process`).filter(f => f.endsWith(`.js`));
		client.processes = new Map();

		for(let p = 0; p < processFiles.length; p++){
			let process = require(`${__dirname}/../process/${processFiles[p]}`).p;
			client.processes.set(process.name, process);
		}
	},
};