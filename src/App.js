import React, { useState, useEffect } from "react";
import "./App.scss";
import Purchase from "./Components/Purchase/Purchase";
import NewPurchase from "./Components/Purchase/NewPurchase";

function App() {
	const [purchases, setPurchases] = useState([]);
	const [enableNewPurchase, setEnableNewPurchases] = useState(false);

	useEffect(() => {
		fetch("http://localhost:3001/purchases", {
			method: "GET",
		})
			.then(function (r) {
				r.json().then((data) => {
					setPurchases(data);
				});
			})
			.catch((e) => console.log(e));
	}, []);

	const addNewItemHandler = () => {
		setEnableNewPurchases(true);
	};

	const pushNewItem = ({
		item_name,
		store_name,
		purchasing_date,
		total_amount,
		card,
		bank,
	}) => {
		var body = {
			item_name: item_name,
			store_name: store_name,
			purchasing_date: purchasing_date,
			total_amount: total_amount,
			bank: card,
			card: bank,
		};
		fetch("http://localhost:3001/purchases", {
			headers: {
				Accept: "application/json",
				"Content-Type": "application/json",
			},
			method: "POST",
			body: JSON.stringify(body),
		})
			.then(function (r) {
				r.text().then((data) => {
					if (r.status === 200) setEnableNewPurchases(false);
					else if (r.status === 404) setEnableNewPurchases(false);
				});
			})
			.catch((e) => console.log(e));
	};

	const deleteItemHandler = (id) => {
		fetch("http://localhost:3001/purchases/" + id, {
			headers: {
				Accept: "application/json",
				"Content-Type": "application/json",
			},
			method: "DELETE",
		})
			.then(function (r) {
				r.text().then((data) => {
					// console.log(data);
				});
			})
			.catch((e) => console.log(e));
	};

	const purchasesMarkUp = purchases.map((item, index) => (
		<Purchase
			key={item._id}
			state={item.state}
			store_name={item.store_name}
			purchasing_date={item.purchasing_date}
			item_name={item.item_name}
			total_amount={item.total_amount}
			bank={item.bank}
			card={item.card}
			onDeleteClick={() => deleteItemHandler(item._id)}
		/>
	));

	const newPurchaseMarkUp = enableNewPurchase && (
		<NewPurchase onSubmitPurchase={pushNewItem} />
	);

	const addButtonMarkUp = !enableNewPurchase && (
		<button
			className="button add-button"
			title="Add new purchase"
			onClick={() => addNewItemHandler()}
		>
			+
		</button>
	);

	return (
		<div className="app">
			{purchasesMarkUp}
			{newPurchaseMarkUp}
			{addButtonMarkUp}
		</div>
	);
}

export default App;
