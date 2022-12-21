import { client, commands, components } from "../mod.ts";
import langs from "../langs.json" assert { type: "json" };

const DEF_PREFIX = "e!";

export default () =>
    client.on("messageCreate", (message) => {
        const prefix = DEF_PREFIX;

        const options: any = {};

        if (!message.content.startsWith(prefix)) return;

        const args = message.content.slice(prefix.length).trim().split(/ +/);
        const command = args?.shift()?.toLowerCase();

        if (!command) return;

        const cmd = commands.get(command.toLowerCase());
        if (!cmd) return;

        for (let i = 0; i < cmd.options?.length!; i++) {
            options[cmd.options?.[i].name!] = args[i];
        }

        cmd.run(message, langs.en, options);
    });
