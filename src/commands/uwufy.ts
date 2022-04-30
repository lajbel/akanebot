import { uwufy } from "../../deps.ts";
import { AkaneCommand } from "../types/command.ts";

const cmd: AkaneCommand = {
	name: "Uwufy",
	category: "Apps",
	type: "MESSAGE",
	run: (interaction) => {
		interaction.respond({
			content: uwufy(
				interaction.resolved.messages[
					Object.keys(interaction.resolved.messages)[0]
				].content
			),
		});
	},
};

export default cmd;
