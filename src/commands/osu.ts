import { AkaneCommand } from "../types/command.ts";
import { Osu, config } from "../../deps.ts";

const osu = new Osu(config().OSU_TOKEN || Deno.env.get("OSU_TOKEN"));

const cmd: AkaneCommand = {
	name: "osu",
	category: "Games",
	description: "OSU! Commands",
	run: async (interaction, dialogue) => {
		const osuUser = (
			await osu.getUser({
				u: "Tere De Jugo",
				m: "0",
				event_days: 31,
			})
		)[0];

		interaction.respond({
			embeds: [
				{
					description: osuUser.username,
				},
			],
		});
	},
};

export default cmd;
