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

client.once(Events.ClientReady, async (c) => {
	// Connection events.
	mongoose.connection.on('connected', () => {
		console.log('MongoDB connected');
	  });
	  
	mongoose.connection.on('error', (err) => {
		console.error(`MongoDB connection error: ${err}`);
	  });
	  
	mongoose.connection.on('disconnected', () => {
		console.log('MongoDB disconnected');
	  });
	  
	try {
	  await mongoose.connect(process.env.MONGO_URI);
	  console.log(`Connected to MongoDB`);
	  console.log(`Ready! Logged in as ${c.user.tag}`);
	} catch (error) {
	  console.error(`Error connecting to MongoDB: ${error.message}`);
	}
  });
  

// Log in to Discord with your client's token
client.login(process.env.CLIENT_TOKEN);

// #1 On message create, si el texto del mensaje es test message", hat_man responde a ese mensaje con "test reply test reply".
client.on(Events.MessageCreate, (message) =>{
	//console.log(message.content)
	//console.log(message.author.id)
	if (message.content=="test message"){
		message.reply("test reply test reply"
		)}
})

//#2
const mongoTestModel = require("./schemas/mongo-test-schema")

client.on(Events.MessageCreate, async (message) =>{
	if (message.content=="test mongo"){
		console.log("Starting mongoDB test...")
		console.log('Connection status:', mongoose.connection.readyState);
		try {
			const result = await mongoTestModel.create({
			  discordId: message.author.id,
			  autorazo: message.author.displayName,
			});
			console.log("Document created successfully: ", result);
		  } catch (err) {
			console.error("Error creating document: ", err.message);
		  }
	}
})