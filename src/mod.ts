export const VERSION = "0.0.5";
export const EMBED_COLOR = "#47f0ff";

import type { AkaneCommand } from "./types.ts";

import langs from "./langs.json" assert { type: "json" };

import { Client, dotenv, GatewayIntents, ReplDB } from "../deps.ts";
import { cmdlog, eventlog } from "./util/logger.ts";
import { clone } from "./util/clone.ts";

// Connect client
export const client = new Client({
    forceNewSession: true,
});

await client.connect(Deno.env.get("DISCORD_TOKEN") ?? dotenv().DISCORD_TOKEN, [GatewayIntents.GUILDS, GatewayIntents.GUILD_MESSAGES]);

export const commands: Map<string, AkaneCommand> = new Map();
export const components = new Map();

export const db = new ReplDB(Deno.env.get("REPLIT_DB_URL"));

// Read and run all events
for await (const file of Deno.readDir("src/events")) {
    import(`./events/${file.name}`).then((mod) => {
        mod.default();

        eventlog(`Event loaded -> ${file.name.slice(0, -3)}`);
    });
}

// Store command in commands map
for await (const file of Deno.readDir("src/commands/")) {
    import(`./commands/${file.name}`).then(async (mod) => {
        const command = mod.default;

        commands.set(command.name, command);

        cmdlog(`Command loaded -> ${command.name}`);

        for await (const guild of client.guilds) {
            const langDB: any = [] ?? await db.get("languages");
            const lang: string = langDB[guild.id] ?? "en";

            const temp = clone(command);

            for (let i = 0; i < command.options?.length; i++) {
                // @ts-ignore a
                temp.options[i].description = langs[lang][command.options[i].description];
            }

            client.interactions.commands.create(
                {
                    name: command.name,
                    // @ts-ignore a
                    description: langs[lang][command.description],
                    options: temp.options,
                },
                guild.id,
            );
        }
    });
}
