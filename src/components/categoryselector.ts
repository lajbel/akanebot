import { AkaneComponentResponse } from "../types/component.ts";
import { commands } from "../mod.ts";

const cpm: AkaneComponentResponse = (interaction, dialogue) => {
	const cmds = Array.from(commands.values()).filter((c) => {
		return c.category === interaction.data.values?.[0];
	});

	interaction.message.edit({
		embeds: [
			{
				color: 0x80e1ff,
				title: dialogue[0],
				description: dialogue[1],
				thumbnail: {
					url: "https://c.tenor.com/g-jWHpjKSzUAAAAC/tsunemori-akane.gif",
				},
			},
		],
		components: [
			{
				type: "ACTION_ROW",
				components: [
					{
						type: "SELECT",
						placeholder: dialogue[6],
						customID: "commandselector",
						options: [
							...cmds.map((c) => {
								return {
									label: c.name,
									value: c.name,
								};
							}),
						],
					},
				],
			},
		],
	});
};

export default cpm;
