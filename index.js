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
	//AGREGAR EL INTENT DE PRESENCES?
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
	if (message.content=="ping"){
		message.reply("pong"
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

//#3 auto-Pinner

client.on(Events.MessageReactionAdd, async (reaction, user) => {
	// Check if the reaction is added to a specific message
	if (user.id !== client.user.id && reaction.emoji.name== '📌' ) {
	  console.log(`${user.username} voted to pin message: `, reaction.message.content);
		if(reaction.count>0){reaction.message.pin()}
	  //console.log(`reaction.emoji.name is ${reaction.emoji.name}`)
	  //console.log(`reaction.count is ${reaction.count}`)
	}
});

client.on(Events.MessageReactionRemove, async (reaction, user) => {
	if (user.id !== client.user.id && reaction.emoji.name== '📌' ) {
	  const foo=`${user.username} voted to unpin message: ${reaction.message.content}`
		console.log(foo)
		reaction.message.reply(foo)
		if(reaction.count<1){reaction.message.unpin()}
	}
});