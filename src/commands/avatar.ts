import type { AkaneCommand } from "../types.ts";

const cmd: AkaneCommand = {
    name: "avatar",
    category: "util",
    description: "cmd_avatar_description",
    run(ctx, dialogue) {
        ctx.reply(dialogue.cmd_ping_salute);
    },
};

export default cmd;
