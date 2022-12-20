import type { AkaneCommand } from "../types.ts";
import { Embed, Message } from "../../deps.ts";

const cmd: AkaneCommand = {
    name: "help",
    category: "core",
    description: "cmd_help_description",
    run(ctx, dialogue) {
        const embed = new Embed()
            .setTitle(dialogue.cmd_help_emb_title)
            .setDescription(dialogue.cmd_help_emb_description);

        if (ctx instanceof Message) {
            ctx.reply({
                embeds: [embed],
            });
        } else {
            ctx.reply({
                embeds: [embed],
            });
        }
    },
};

export default cmd;
