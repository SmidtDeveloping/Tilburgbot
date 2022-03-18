module.exports = {
	name: 'ready',
	once: true,
	execute(client) {
		console.log(`Ready! Logged in as ${client.user.tag}`);
	},
};

module.exports.help = {
	name: "ready",  
	catogory: "event",
	description: "Geeft je informatie",
}