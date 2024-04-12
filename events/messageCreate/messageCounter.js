const messageCountModel = require("../../schemas/message-count-schema")

module.exports = async (client, message)=>{
    if(message.author.id!=client.user.id){
		try{
			const docu = await messageCountModel.findOneAndUpdate(
				{ discordId: message.author.id },
				{ $inc: { messageCount: 1 } },
				{ upsert: true, new: true }
			  );
			console.log(message.author.username+" count : "+ docu.messageCount)
			if(!docu){ //FORMERLY "DOCU==NULL", BUT Mr.GPT SAID "!DOCU" ALSO TAKES UNDEFINED INTO ACCOUNT
				try {
					const result = await messageCountModel.create({
						discordId: message.author.id,
						messageCount:1})
					console.log("Document created successfully: ", result);
				  } catch (err) {
					console.error("Error creating document: ", err.message);
				  }
				}
			}catch (error){
			console.log("Error finding document: ", error)}
		}
}