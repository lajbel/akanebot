import { AkaneComponentResponse } from "../types/component.ts";
import { commands } from "../mod.ts";

const cpm: AkaneComponentResponse = (interaction, dialogue) => {
	const cmd = commands.get(interaction.data.values?.[0]!)!;

	interaction.message.edit({
		embeds: [
			{
				color: 0x80e1ff,
				title: cmd.name,
				description: cmd.description,
			},
		],
		components: [],
	});
};

export default cpm;
