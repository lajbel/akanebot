import { Interaction } from "../../deps.ts";
import { AkaneCommand } from "../types/command.ts";

const cmd: AkaneCommand = {
	name: "help",
	description: "Get info and help about me and my features",
	run: (interaction, dialogue) => {
		interaction.respond({
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
							type: "BUTTON",
							style: "LINK",
							label: dialogue[2],
							url: "https://discord.com/api/oauth2/authorize?client_id=960304445592309800&permissions=8&scope=applications.commands%20bot",
						},
					],
				},
				{
					type: "ACTION_ROW",
					components: [
						{
							type: "SELECT",
							placeholder: "Check some command",
							customID: "commandselector",
							options: [
								{
									label: "help",
									value: "zzz",
								},
							],
						},
					],
				},
			],
		});
	},
};

export default cmd;
