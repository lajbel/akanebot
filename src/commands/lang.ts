import { AkaneCommand } from "../types.ts";
import { db } from "../mod.ts";
import langs from "../langs.json" assert { type: "json" };

const cmd: AkaneCommand = {
    name: "lang",
    category: "config",
    description: "cmd_lang_description",
    perms: ["administrator"],
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
    async run(ctx, dialogue, options) {
        const langDB = await db.get("languages");

        langDB[ctx.guild?.id!] = options.language;

        await db.set("languages", langDB);

        const newLangMessage: string = langs[options.language].cmd_lang_sucess;

        ctx.reply(newLangMessage);
    },
};

export default cmd;
