// Initialize dotenv
require('dotenv').config();

const mongoose = require('mongoose');

// Require the necessary discord.js classes
const fs = require('node:fs');
const path = require('node:path');

const { Client, Collection, Events, GatewayIntentBits} = require('discord.js');

const eventHandler = require('./handlers/eventHandler');

// Create a new client instance
const client = new Client({
	intents: [
		GatewayIntentBits.Guilds,
		GatewayIntentBits.GuildMessages,
		GatewayIntentBits.GuildMessageReactions,
		GatewayIntentBits.GuildMembers,
		GatewayIntentBits.MessageContent
		//AGREGAR EL INTENT DE PRESENCES?
	],
	partials: [
		'MESSAGE',
		'REACTION'
	],
});

client.once('ready', async () => {
    try {
        const commands = await client.application.commands.fetch();
        console.log('Fetched Commands.'/*:', commands*/);
    } catch (error) {
        console.error('Error fetching commands:', error);
    }
});

eventHandler(client);

// Log in to Discord with your client's token
client.login(process.env.CLIENT_TOKEN);