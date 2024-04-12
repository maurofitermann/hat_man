module.exports = async (client, guildId) => {
  let applicationCommands;

  try {
    if (guildId) {
      const guild = await client.guilds.fetch(guildId);
      applicationCommands = guild.commands;
    } else {
      applicationCommands = await client.application?.commands?.fetch(); // Using optional chaining to avoid errors if client.application or client.application.commands is undefined
    }
    return applicationCommands;
  } catch (error) {
    console.error("Error fetching application commands:", error);
    return null; // Return null or handle the error as appropriate
  }
};
