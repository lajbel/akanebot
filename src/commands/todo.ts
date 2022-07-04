import { AkaneCommand } from "../types/command.ts";
import { db } from "../mod.ts";

const cmd: AkaneCommand = {
	name: "todo",
	category: "Utility",
	description: "TODO List commands",
    options: [
        {
            name: "create",
            description: "Create a TODO list",
            type: "SUB_COMMAND",
            options: [
                {
                    name: "name",
                    description: "The TODO's list name",
                    type: "STRING",
                    required: true,
                }
            ],
        },
        {
            name: "show",
            description: "Show a TODO list",
            type: "SUB_COMMAND",
            options: [
                {
                    name: "name",
                    description: "The TODO's list name",
                    type: "STRING",
                    required: true,
                }
            ],
        }
    ],
	run: async (interaction, dialogue, options) => {
        if(interaction.subCommand === "create") {
            const todoDB = await db.get("todo");

            if (!todoDB[interaction.user.id]) todoDB[interaction.user.id] = [];
            
            // push todo
            todoDB[interaction.user.id].push({
                name: options.name,
                sections: [
                    {
                        name: "TODO",
                        things: []
                    },
                    {
                        name: "Working",
                        things: []
                    },
                    {
                        name: "Finished",
                        things: []
                    }
                ]
            });

            // update database content
            await db.set("todo", todoDB);

            interaction.reply(dialogue.create_sucess)
        }

        if (interaction.subCommand === "show") {
            interaction.respond({
                embeds: [{
                    
                }]
            });
        }
	},
};

export default cmd;
