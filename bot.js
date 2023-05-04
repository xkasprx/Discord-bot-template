// Configuration
const config = require(`./config/config.json`);

// Database
const con = require(`./database/database`).con;
const query = require(`./database/database`).query;

// Handlers
const operator = require(`./operator`).operator;

// Modules
const buttons = require(`./responses/buttons`).buttons;
const messages = require(`./responses/messages`).messages;
const modals = require(`./responses/modals`).modals;

// Packages
const discord = require(`discord.js`);

// Utilities
const util = require(`./util`).util;

// Build Bot
const client = new discord.Client({
	intents: 3276799,
	partials: [0, 1, 2, 3, 4, 5, 6],
});

// Scripts
const scripts = {
	buttons,
	config,
	database: {
		con,
		query,
	},
	format: {
		blockquote: discord.blockQuote,
		bold: discord.bold,
		channelMention: discord.channelMention,
		codeBlock: discord.codeBlock,
		hideLink: discord.hideLinkEmbed,
		hyperlink: discord.hyperlink,
		inlineCode: discord.inlineCode,
		italic: discord.italic,
		quote: discord.quote,
		roleMention: discord.roleMention,
		spoiler: discord.spoiler,
		strikethrough: discord.italic,
		time: discord.time,
		underscore: discord.underscore,
		userMention: discord.userMention,
	},
	messages,
	modals,
	util,
	versionInfo: {
		discord: `v${discord.version}`,
		node: process.version,
	},
};

// Processes
const processes = {
	botReady: async () => {
		await new Promise(async (resolve) => client.once(`ready`, () => resolve()));
		util.log(`Bot ready at                        `, util.prettyDate(), `green`, `blue`);
	},
	connectDatabase: async () => {
		await new Promise(async (resolve) => con.init(client, scripts).then((connection) => {
			scripts.database.con = connection;
			scripts.database.query = query.bind(connection) && query.execute;
			util.log(`Database '${config.database.database}' connected at   `, util.prettyDate(), `green`, `blue`);
			resolve();
		}));
	},
	login: async () => {
		await new Promise(async (resolve) => client.login(config.important.token).then(resolve()));
		util.log(`Bot logged in at                    `, util.prettyDate(), `green`, `blue`);
	},
};

// Initialization
(async () => {
	// Log Versions
	console.log(` `);
	util.log(`Node version                        `, scripts.versionInfo.node, `magenta2`, `yellow2`);
	util.log(`Discord.js version                  `, scripts.versionInfo.discord, `magenta2`, `yellow2`);

	// Run Processes
	// await processes.connectDatabase();
	await processes.login();
	await processes.botReady();

	// Initialize Handler
	operator.init(client, scripts);

})();