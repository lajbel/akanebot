// deno-lint-ignore-file
import { ApplicationCommandInteraction, ApplicationCommandPartial, Message } from "../deps.ts";

export interface AkaneCommand extends ApplicationCommandPartial {
    category: string;
    run: (
        ctx: Message | ApplicationCommandInteraction,
        dialogue: any,
    ) => void;
    perms?: string[];
}
