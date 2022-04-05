import { Interaction } from '../../deps.ts';
import { AkaneCommand } from '../types/command.ts';

const cmd: AkaneCommand = {
	name: 'lang',
	description: 'Set my messages language',
	run: (interaction, dialogue) => {
		interaction.reply(dialogue[0]);
	},
};

export default cmd;
