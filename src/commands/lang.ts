import { Interaction } from "../../deps.ts";
import { AkaneCommand } from "../types/command.ts";
import { db } from "../mod.ts";

const cmd: AkaneCommand = {
	name: "lang",
	description: "Set my messages language",
	options: [
		{
			name: "language",
			description: "Language for messages",
			required: true,
			type: "STRING",
			choices: [
				{
					name: "English",
					value: "en",
				},
				{
					name: "Spanish",
					value: "es",
				},
			],
		},
	],
	run: async (interaction, dialogue) => {
		const langDB = await db.get("languages");

		langDB[interaction.user.id] = interaction.options[0].value;

		await db.set("languages", langDB);

		const newDialogue = (
			await import(
				`../lang/${
					interaction.options[0].value
				}/${interaction.data.name.toLowerCase()}.ts`
			)
		).default;

		interaction.reply(newDialogue[0]);
	},
};

export default cmd;
