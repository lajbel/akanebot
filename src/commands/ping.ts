import type { AkaneCommand } from "../types.ts";

const cmd: AkaneCommand = {
    name: "ping",
    category: "core",
    description: "cmd_ping_description",
    run(ctx, dialogue) {
        ctx.reply(dialogue.cmd_ping_salute);
    },
};

export default cmd;
