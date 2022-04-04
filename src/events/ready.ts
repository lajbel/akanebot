import { client } from '../mod.ts';

export default () =>
	client.on('ready', (_shards: number) => {
		console.log(`AKANE BOT ON`);

		client.setPresence({
			status: 'online',
			activity: [
				{
					name: 'The Justice',
					type: 1,
				},
			],
		});
	});
