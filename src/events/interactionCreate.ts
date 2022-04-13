import { Interaction } from "../../deps.ts";
import { client, commands } from "../mod.ts";
import { AkaneCommand } from "../types/command.ts";
import { db } from "../mod.ts";

export default () =>
	client.on("interactionCreate", async (interaction: Interaction) => {
		if (interaction.isApplicationCommand()) {
			const cmd: AkaneCommand = commands.get(interaction.data.name);
			if (!cmd) return;

			const langDB = await db.get("languages");
			const lang = langDB[interaction.user.id] || "en";

			const dialogue = (
				await import(
					`../lang/${lang}/${interaction.data.name.toLowerCase()}.ts`
				)
			).default;

			cmd.run(interaction, dialogue);
		}
	});
