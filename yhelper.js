
const yahooFinance = require("yahoo-finance2").default;
const insertData = require("./pg-insert");
const { retrieveData, retrieveDateData, retrievePortfolio } = require("./pg-retrieve");

async function getStock(stock,res){
	    const dt = Date.now();
		let myDate = new Date(dt);
        const results = await yahooFinance.quoteSummary(stock);
        console.log(results);	
        insertData(stock, results.price.regularMarketPrice,myDate);
        res.json({ date: myDate, price: results.price.regularMarketPrice });

}

const appRouter = (app, fs) => {

	app.get("/quote/:ticker", (req, res) => {
		const tickername = req.params["ticker"];
		console.log(tickername);
        getStock(tickername,res);
  	});

	app.get("/history/:ticker", (req, res) => {
		const tickername = req.params["ticker"];
		retrieveData(tickername, res);
	});
	app.get("/today/:ticker", (req, res) => {
		const tickername = req.params["ticker"];
		let myDate = new Date(Date.now());
		let fDate = `${myDate.getFullYear()}-${
			myDate.getMonth() + 1
		}-${myDate.getDate()}`;
		console.log(fDate);
		retrieveDateData(tickername, res, fDate);
	});
	app.get("/portfolio/:pf", (req, res) => {
		const name = req.params["pf"];
		retrievePortfolio(name, res);
	});

};
module.exports = appRouter;
