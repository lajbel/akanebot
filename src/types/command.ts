import {
	ApplicationCommandPartial,
	ApplicationCommandInteraction,
} from "../../deps.ts";

export interface AkaneCommand extends ApplicationCommandPartial {
	category?: string;
	run: (
		interaction: ApplicationCommandInteraction,
		dialogue: string[]
	) => void;
	perms?: string[];
}
