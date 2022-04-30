import { Interaction } from "../../deps.ts";
import { client, commands, components } from "../mod.ts";
import { AkaneCommand } from "../types/command.ts";
import { db } from "../mod.ts";

export default () =>
	client.on("interactionCreate", async (interaction: Interaction) => {
		const langDB = await db.get("languages");
		const lang = langDB[interaction.user.id] || "en";

		if (interaction.isApplicationCommand()) {
			const cmd: AkaneCommand = commands.get(interaction.data.name)!;
			if (!cmd) return;

			const dialogue = (
				await import(
					`../lang/${lang}/${interaction.data.name.toLowerCase()}.ts`
				)
			).default;

			cmd.run(interaction, dialogue);
		}

		if (interaction.isMessageComponent()) {
			const cpm = components.get(interaction.data.custom_id);
			if (!cpm) return;

			const dialogue = (
				await import(
					`../lang/${lang}/${interaction.message.interaction?.name.toLowerCase()}.ts`
				)
			).default;

			cpm(interaction, dialogue);
		}
	});
