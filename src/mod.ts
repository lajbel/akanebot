import { Client, config, GatewayIntents, Message } from "../deps.ts";

export const client = new Client();
export const commands = new Map();

client.connect(Deno.env.get("DISCORD_TOKEN") || config().DISCORD_TOKEN, [
	GatewayIntents.GUILDS,
	GatewayIntents.GUILD_MESSAGES,
]);

for await (const file of Deno.readDir("src/events")) {
	import(`./events/${file.name}`).then((mod) => {
		mod.default();

		console.log(`Event loaded -> ${file.name.slice(0, -3)}`);
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

		console.log(`Command loaded -> ${command.name}`);
	});
}

setInterval(() => {
	fetch("http://akanebot.lajbel.repl.co");
}, 5);
