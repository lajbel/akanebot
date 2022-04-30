import { opine } from "../deps.ts";
import { serverlog } from "./util/logger.ts";

export function startServer() {
	const app = opine();

	app.get("/", function (req, res) {
		res.send("thanks");
		console.log("Web Requested");
	});

	app.listen(3000, () => serverlog("Akane Server now online"));
}
