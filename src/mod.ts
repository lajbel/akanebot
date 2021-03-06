import { Client, config, GatewayIntents, ReplDB } from "../deps.ts";
import { AkaneCommand } from "./types/command.ts";
import { cmdlog, eventlog } from "./util/logger.ts";
import { startServer } from "./server.ts";

export const client = new Client();

export const commands: Map<string, AkaneCommand> = new Map();
export const components = new Map();

export const db = new ReplDB(Deno.env.get("REPLIT_DB_URL"));

await client.connect(Deno.env.get("DISCORD_TOKEN"), [
	GatewayIntents.GUILDS,
	GatewayIntents.GUILD_MESSAGES,
]);

for await (const file of Deno.readDir("src/events")) {
	import(`./events/${file.name}`).then((mod) => {
		mod.default();

		eventlog(`Event loaded -> ${file.name.slice(0, -3)}`);
	});
}

for await (const file of Deno.readDir("src/commands/")) {
	import(`./commands/${file.name}`).then((mod) => {
		const command = mod.default;

		client.interactions.commands.create(
			{
				name: command.name,
				type: command.type,
				description: command.description,
				options: command.options,
			},
			"951299637782933515"
		);

		commands.set(command.name, command);

		cmdlog(`Command loaded -> ${command.name}`);
	});
}

for await (const file of Deno.readDir("src/components")) {
	import(`./components/${file.name}`).then((mod) => {
		const component = mod.default;

		components.set(file.name.slice(0, -3), component);
	});
}

startServer();

setInterval(() => {
	// fetch("http://akanebot.lajbel.repl.co");
}, 10000);
