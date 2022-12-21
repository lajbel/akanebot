import type { AkaneCommand } from "../types.ts";
import { Embed, Member, Message } from "../../deps.ts";

const cmd: AkaneCommand = {
    name: "avatar",
    category: "util",
    description: "cmd_avatar_description",
    options: [
        {
            name: "user",
            description: "cmd_avatar_opt_user",
            required: false,
            type: "USER",
        },
    ],
    async run(ctx, dialogue, options) {
        let member: Member;

        if (options.user) member = await ctx.guild?.members.fetch(options.user?.replace(/\D/g, ""))!;
        else member = await ctx.guild?.members.fetch(ctx.member?.id!)!;

        const avatarURL = member?.avatarURL();

        const embed = new Embed()
            .setColor("RANDOM")
            .setDescription(`${dialogue.cmd_avatar_emb_description} ${member!.user.username}`)
            .setImage(avatarURL!);

        if (ctx instanceof Message) ctx.reply({ embeds: [embed] });
        else ctx.reply({ embeds: [embed] });
    },
};

export default cmd;
