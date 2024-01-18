// Initialize dotenv
require('dotenv').config();
const mongoose = require('mongoose');
const fs = require('node:fs');
const path = require('node:path');

// Require the necessary discord.js classes
const { Client, Collection, Events, GatewayIntentBits} = require('discord.js');

// Create a new client instance
const client = new Client({ intents: [
	GatewayIntentBits.Guilds,
	GatewayIntentBits.GuildMessages,
	GatewayIntentBits.GuildMessageReactions,
	GatewayIntentBits.GuildMembers,
	GatewayIntentBits.MessageContent	
] 
});

// TO DO: MAKE SLASH COMMANDS WORK
/*
client.commands = new Collection();

const commandsPath = path.join(__dirname, 'commands');
const commandFiles = fs.readdirSync(commandsPath).filter(file => file.endsWith('.js'));

for (const file of commandFiles) {
	const filePath = path.join(commandsPath, file);
	const command = require(filePath);
	// Set a new item in the Collection with the key as the command name and the value as the exported module
	if ('data' in command && 'execute' in command) {
		client.commands.set(command.data.name, command);
	} else {
		console.log(`[WARNING] The command at ${filePath} is missing a required "data" or "execute" property.`);
	}
}
*/


// When the client is ready, run this code (only once)
// We use 'c' for the event parameter to keep it separate from the already defined 'client'
client.once(Events.ClientReady, c => {
	console.log(`Ready! Logged in as ${c.user.tag}`);
	mongoose.connect(process.env.MONGO_URI)
});

// Log in to Discord with your client's token
client.login(process.env.CLIENT_TOKEN);

/*
client.on(Events.InteractionCreate, async interaction => {
	if (!interaction.isChatInputCommand()) return;

	const command = interaction.client.commands.get(interaction.commandName);

	if (!command) {
		console.error(`No command matching ${interaction.commandName} was found.`);
		return;
	}

	try {
		await command.execute(interaction);
	} catch (error) {
		console.error(error);
		if (interaction.replied || interaction.deferred) {
			await interaction.followUp({ content: 'There was an error while executing this command!', ephemeral: true });
		} else {
			await interaction.reply({ content: 'There was an error while executing this command!', ephemeral: true });
		}
	}
	console.log(interaction);
});
*/

const messageCountSchema = require("./schemas/message-count-schema")
const messageCountModel = mongoose.model("messageCount", messageCountSchema)

const mongoTestSchema = require("./schemas/mongo-test-schema")
const mongoTestModel = mongoose.model("mongoTest", mongoTestSchema)

client.on(Events.MessageCreate, (message) =>{
	//console.log(message.content)
	//console.log(message.author.id)
	if (message.content=="test message"){
		message.reply("test reply test reply"
		)}
})

client.on(Events.MessageCreate, async (message) =>{
	console.log("about to try to find and update")
	console.log(`The data type of message.author.id is: ${typeof message.author.id}`)

	if (message.content=="test mongo"){
	try{
		await mongoTestModel.create({autorazo: message.author.displayName})}
		catch(err){console.log(err.message)}
	}
	try{
	await messageCountModel.findOneAndUpdate(
		{_id: message.author.id},
		{_id: message.author.id,
		$inc: {
			messageCount: 1
		}
	}, {
		upsert: true
	})}
	catch(err){console.log(err.message)}
})





