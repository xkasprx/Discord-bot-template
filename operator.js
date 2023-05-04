// Event Listeners
const error = require(`./events/error`).e;
const interactionCreate = require(`./events/interactionCreate`).e;
const messageCreate = require(`./events/messageCreate`).e;
const warn = require(`./events/warn`).e;

// Modules
const modules = require(`./modules/modules`).modules;

// Process Listeners
const uncaughtException = require(`./process/uncaughtException`).p;
const unhandledRejection = require(`./process/unhandledRejection`).p;

// Task Manager
const tasks = require(`./tasks`).tasks;

exports.operator = {
	init: (x, s) => {
		// Initialize Commands & Events
		modules.init(x, s);

		// Initialize Event Listeners
		error.init(x, s);
		interactionCreate.init(x, s);
		messageCreate.init(x, s);
		warn.init(x, s);

		// Initialize Process Listeners
		uncaughtException.init(x, s);
		unhandledRejection.init(x, s);

		// Initialize Task Manager
		tasks.init(x, s);
	}
}