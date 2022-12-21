import { AkaneCommand } from "../types.ts";
import { db } from "../mod.ts";

const cmd: AkaneCommand = {
    name: "lang",
    category: "config",
    description: "cmd_lang_description",
    options: [
        {
            name: "language",
            description: "cmd_lang_opt_language",
            required: true,
            type: "STRING",
            choices: [
                {
                    name: "English",
                    value: "en",
                },
                {
                    name: "Spanish",
                    value: "es",
                },
            ],
        },
    ],
    run(ctx, dialogue, options) {
        console.log(options);

        //     const langDB = await db.get("languages");

        //     langDB[ctx.member?.guild.id!] = options.value;

        //     await db.set("languages", langDB);

        //     ctx.reply("d");
        //
    },
};

export default cmd;
