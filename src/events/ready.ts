import { client } from "../mod.ts";
import { botlog } from "../util/logger.ts";

export default () =>
	client.on("ready", (_shards: number) => {
		botlog(`Akane Bot online on Discord`);

		client.setPresence({
			status: "online",
			activity: [
				{
					name: "The Justice",
					type: 1,
				},
			],
		});
	});
