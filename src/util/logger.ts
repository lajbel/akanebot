import { timber } from "https://deno.land/x/timber@v0.6.0/mod.ts";
import {
	brightBlue,
	brightCyan,
	brightMagenta,
	brightRed,
} from "https://deno.land/std@0.111.0/fmt/colors.ts";

export const log = timber({
	name: { text: () => "๐ง", style: brightCyan },
	log: console.log,
});

export const info = timber({
	name: { text: () => "๐น", style: brightBlue },
	log: console.info,
});

export const botlog = timber({
	name: { text: () => "๐ค", style: brightMagenta },
	log: console.info,
});

export const serverlog = timber({
	name: { text: () => "๐", style: brightRed },
	log: console.log,
});

export const cmdlog = timber({
	name: { text: () => "๐งจ", style: brightRed },
	log: console.log,
});

export const eventlog = timber({
	name: { text: () => "๐", style: brightRed },
	log: console.log,
});
