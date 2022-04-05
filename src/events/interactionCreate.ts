import { Interaction } from "../../deps.ts";
import { client, commands } from "../mod.ts";
import { AkaneCommand } from "../types/command.ts";

export default () =>
	client.on("interactionCreate", async (interaction: Interaction) => {
		if (interaction.isApplicationCommand()) {
			const cmd: AkaneCommand = commands.get(interaction.data.name);

			if (!cmd) return;

			const dialogue = (
				await import(
					`../lang/es/${interaction.data.name.toLowerCase()}.json`,
					{
						assert: { type: "json" },
					}
				)
			).default;

			cmd.run(interaction, dialogue);
		}
	});
