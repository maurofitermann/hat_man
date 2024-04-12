const configJSON  = require('../../config.json'); // formerly just const testServer. Also it's unused now.
const areCommandsDifferent = require('../../utils/areCommandsDifferent');
//const getApplicationCommands = require('../../utils/getApplicationCommands'); // also unused now. Will find out why later.
const getLocalCommands = require('../../utils/getLocalCommands');

module.exports = async (client) => {
  try {
    const localCommands = getLocalCommands();
    const applicationCommands = await client.application?.commands?.fetch()

    for (const localCommand of localCommands) {

      const { name, description, options } = localCommand;

      const existingCommand = await applicationCommands.find(
        (cmd) => cmd.name === name
      );
      if (existingCommand) {
        if (localCommand.deleted) {
          await existingCommand.delete() 
          console.log(`🗑 Deleted command "${name}".`);
          continue;
        }
        if (areCommandsDifferent(existingCommand, localCommand)) {
          await existingCommand.edit({
            description,
            options,
          })
          console.log(`🔁 Edited command "${name}".`);
        }
      } else {
        if (localCommand.deleted) {
          console.log(
            `⏩ Skipping registering command "${name}" as it's set to delete.`
          );
          continue;
        }
        await client.application.commands.create({
          name,
          description,
          options,
        });
        console.log(`👍 Registered command "${name}."`);
      }
    }
  } catch (error) {
    console.log(`TThere was an error: ${error}`);
  }
};