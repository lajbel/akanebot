import type { AkaneCommand } from "./types.ts";

import langs from "./langs.json" assert { type: "json" };

import { Client, dotenv, GatewayIntents, ReplDB } from "../deps.ts";
import { cmdlog, eventlog } from "./util/logger.ts";

export const client = new Client({
    forceNewSession: true,
});

// Connect client
client.connect(Deno.env.get("DISCORD_TOKEN") ?? dotenv().DISCORD_TOKEN, [GatewayIntents.GUILDS, GatewayIntents.GUILD_MESSAGES]);

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
    import(`./commands/${file.name}`).then((mod) => {
        const command = mod.default;

        commands.set(command.name, command);

        cmdlog(`Command loaded -> ${command.name}`);
    });
}

// Load all slash commands
for await (const guild of client.guilds) {
    for await (const command of commands.values()) {
        client.interactions.commands.create(
            {
                name: command.name,
                // @ts-ignore a
                description: langs.en[command.description],
            },
            guild.id,
        );
    }
}
