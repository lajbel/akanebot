import { MessageComponentInteraction } from "../../deps.ts";

export interface AkaneComponentResponse {
	(interaction: MessageComponentInteraction, dialogue: string[]): void;
}
