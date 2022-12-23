import { client, commands, components } from "../mod.ts";
import langs from "../langs.json" assert { type: "json" };

const DEF_PREFIX = "e!";

export default () =>
    client.on("messageCreate", (message) => {
        const prefix = DEF_PREFIX;

        // This save the clean version of a choice and a "true" verion of a choice
        // for example "Spanish" is a clean version, and "es" the true version.
        const cleanCmdChoices = {};
        const trueCmdChoices: any[] = [];

        const options: any = {};

        if (!message.content.startsWith(prefix)) return;

        const args = message.content.slice(prefix.length).trim().split(/ +/);
        const command = args?.shift()?.toLowerCase();

        if (!command) return;

        const cmd = commands.get(command.toLowerCase());
        if (!cmd) return;

        // We will use this data later
        if (cmd.options) {
            for (const option of cmd.options!) {
                if (option.choices) {
                    for (const choice of option.choices) {
                        cleanCmdChoices[choice.name.toLowerCase()] = choice.value;
                        trueCmdChoices.push(choice.value);
                    }
                }
            }
            for (let i = 0; i < cmd.options?.length!; i++) {
                // Check for choices
                if (cmd.options?.[i].choices) {
                    if (cleanCmdChoices[args[i]?.toLowerCase()]) {
                        options[cmd.options?.[i].name!] = cleanCmdChoices[args[i].toLowerCase()];
                    } else if (trueCmdChoices.includes(args[i].toLowerCase())) {
                        options[cmd.options?.[i].name!] = args[i];
                    } else {
                        return message.reply("Argumentos invalidos (placeholder)");
                    }
                } else {
                    options[cmd.options?.[i].name!] = args[i];
                }
            }
        }

        cmd.run(message, langs.en, options);
    });
