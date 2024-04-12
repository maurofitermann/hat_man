module.exports = {
    name: 'mongotest',
    description: 'Checks connection status to MongoDB database.',
    // devOnly: Boolean,
    //testOnly: true,
    // options: Object[],
    // deleted: Boolean,
  
    callback: async (client, interaction) => {
      const mongoose = require("mongoose")
      const mongoTestModel = require("../../schemas/mongo-test-schema")
      console.log("Starting mongoDB test...")
		  console.log('Connection status:', mongoose.connection.readyState);
		  try {
			  const result = await mongoTestModel.create({
			    discordId: interaction.user.id,
			    autorazo: interaction.user.displayName,
        });
        console.log("Document created successfully: ", result);
              interaction.reply("Document created succesfully. See Atlas or Console for details.")
          } catch (err) {
        console.error("Error creating document: ", err.message);
              interaction.reply("Error creating document. See Console for details.")
        }
      },
    };