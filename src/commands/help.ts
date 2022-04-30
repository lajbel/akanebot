import { AkaneCommand } from "../types/command.ts";
import { commands } from "../mod.ts";

const cmd: AkaneCommand = {
	name: "help",
	category: "Core",
	description: "Get info and help about me and my features",
	run: (interaction, dialogue) => {
		const commandCategories = Array.from(
			new Set(
				Array.from(commands.values())
					.filter((c) => c.category !== "Apps")
					.map((c) => c.category)
			)
		);

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
						{
							type: "BUTTON",
							style: "LINK",
							label: dialogue[3],
							url: "https://github.com/lajbel/akanebot",
						},
						{
							type: "BUTTON",
							style: "LINK",
							label: dialogue[4],
							url: "https://github.com/lajbel/akanebot",
						},
					],
				},
				{
					type: "ACTION_ROW",
					components: [
						{
							type: "SELECT",
							placeholder: dialogue[5],
							customID: "categoryselector",
							options: [
								...commandCategories.map((c) => {
									return {
										label: c!,
										value: c!,
									};
								}),
							],
						},
					],
				},
			],
		});
	},
};

export default cmd;
