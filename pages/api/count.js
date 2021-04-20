const db = require("quick.db");

export default async (req, res) => {
	const { method } = req;
	const count = req.body;
	try {
		if (method === "POST") {
			db.set("count", count);
			res.status(200).json(req.body);
		} else if (method === "GET") {
			const currentCount = db.get("count");
			res.status(200).json({ response: currentCount });
		} else {
			res.status(500).json({ response: "Internal Server Error" });
		}
	} catch (err) {
		res.status(500).json({ response: "Internal Server Error" });
	}
};
