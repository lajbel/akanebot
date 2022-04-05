import { Interaction } from '../../deps.ts';
import { AkaneCommand } from '../types/command.ts';

const cmd: AkaneCommand = {
	name: 'help',
	description: 'Get info and help about me and my features',
	run: (interaction, dialogue) => {
		interaction.respond({
			embeds: [{
				color: 0x80e1ff,
				title: dialogue[0],
				description: dialogue[1],
				thumbnail: {
					url: 'https://c.tenor.com/g-jWHpjKSzUAAAAC/tsunemori-akane.gif',
				},
			}],
		});
	},
};

export default cmd;
