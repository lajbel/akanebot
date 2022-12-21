import type { AkaneCommand } from "../types.ts";
import { Embed, Message } from "../../deps.ts";
import { commands, EMBED_COLOR, VERSION } from "../mod.ts";
import { capitalize } from "../util/extras.ts";

const cmd: AkaneCommand = {
    name: "help",
    category: "core",
    description: "cmd_help_description",
    run(ctx, dialogue) {
        const coll: any = {};

        const cmds = [...commands.values()];

        cmds.forEach((c) => {
            if (coll[c.category!]) return;

            coll[c.category] = cmds.filter((c2) => c2.category === c.category);
        });

        const embed = new Embed()
            .setColor(EMBED_COLOR)
            .setTitle(dialogue.cmd_help_emb_title)
            .setDescription(dialogue.cmd_help_emb_description)
            .setFooter(`Akane Tsunemori | ${VERSION}`)
            .setImage("https://pa1.narvii.com/6158/5db62d69ceadfc8cd9aa7740c3a09a1cf2cff2ea_hq.gif");

        for (const category of Object.keys(coll)) {
            const title = category;
            let desc = "";

            for (const cmd of coll[category]) {
                desc += `\`${cmd.name}\` `;
            }

            embed.addField({ name: capitalize(title), value: desc });
        }

        if (ctx instanceof Message) ctx.reply({ embeds: [embed] });
        else ctx.reply({ embeds: [embed] });
    },
};

export default cmd;
