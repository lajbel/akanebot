import type { Interaction } from "../../deps.ts";

import langs from "../langs.json" assert { type: "json" };

import { client, commands, components } from "../mod.ts";
import { db } from "../mod.ts";

export default () =>
    client.on("interactionCreate", (interaction: Interaction) => {
        // const langDB = await db.get("languages");
        // const lang = langDB[interaction.user.id] || "en";
        // const options: any = {};

        if (interaction.isApplicationCommand()) {
            const options: any = {};
            const cmd = commands.get(interaction.data.name)!;
            if (!cmd) return;

            for (const commandOption of interaction.options) {
                options[commandOption.name] = commandOption.value;
            }

            cmd.run(interaction, langs.en, options);
        }
    });
