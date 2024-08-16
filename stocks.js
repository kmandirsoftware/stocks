export default class Stocks {
	// Do NOT modify the constructor
	constructor() {
		// we don't capture any parameters here
		// we're defining an array of todos with two example todos
		this.stocks = [
			{
				company: "Google",
				ticker: "GOOG",
				price: 100,
				purchaseprice: 90,
				catagory: "Tech",
				value: 0,
				quantity: 0,
			}
		];
	}

	// TODO: define remaining instance methods

    async getPort(){
		const url = `http://192.168.1.45:3003/portfolio/1`;
		const newValueResponse = await fetch(url);
		const data = await newValueResponse.json();
        
		data.forEach(item => {
					delete item.id;
					this.stocks.push(item);
					console.log(this.stocks);
		})	
    }
    getAll() {
		return this.stocks;
	}
	getCount() {
		const entries = Object.entries(this.stocks);
		return entries.length;
	}
	add(company, ticker, price, purchaseprice, catagory) {
		const addnew = {
			company: company,
			ticker: ticker,
			price: price,
			purchaseprice: purchaseprice,
			catagory: catagory,
		};
		this.stocks.push(addnew);
	}
	subgetcatagory(cat) {
		return this.stocks.filter((stock) => stock.category === cat);
	}
	getTech() {
		return this.subgetcatagory("tech");
	}
	getTechCount() {
		const workAr = this.getTech();
		const entries = Object.entries(workAr);
		return entries.length;
	}
	getEnergy() {
		return this.subgetcatagory("Energy");
	}
	getEnergyCount() {
		const persAr = this.getEnergy();
		const entries = Object.entries(persAr);
		return entries.length;
	}
	setValue(ticker, value) {
		this.stocks.forEach((stock) => {
			if (stock.ticker === ticker) stock.value = value;
		});
	}
	setPrice(ticker, price) {
		this.stocks.forEach((stock) => {
			if (stock.ticker === ticker) {
				stock.price = price;
				let val = stock.quantity * (stock.price - stock.purchaseprice);
				const strip = val.toFixed(2);
				val = parseFloat(strip, 2);
				stock.value = val;
			}
		});
	}
	getTotalValue() {
		const sum = this.stocks.reduce((total, current) => {
			return total + current.value;
		}, 0);
		return sum;
	}

	async fetchNewPrice(url) {
		const newValueResponse = await fetch(url);
		const newValue = await newValueResponse.json();
		return newValue;
	}

	async updateAllPrices() {
		this.stocks.forEach((stock) => {
			const myURL = `http://192.168.1.45:3003/quote/${stock.ticker}`;
			this.fetchNewPrice(myURL).then((data) => {
				stock.price = parseInt(data, 10);
			});
		});
	}
	calcValues() {
		const allstocks = this.getAll();
		allstocks.forEach((stock) => {
			stock.value = stock.quantity * (stock.price - stock.purchaseprice);
		});
	}
	calcTotalValues() {
		const sum = this.stocks.reduce((total, current) => {
			return total + current.quantity * current.price;
		}, 0);
		return sum;
	}

}
