import { ApplicationCommandPartial, Interaction } from '../../deps.ts';

export interface AkaneCommand extends ApplicationCommandPartial {
	run: (interaction: Interaction, dialogue: string[]) => void;
	perms?: string[];
}
