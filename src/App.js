import React, { useState, useEffect } from "react";
import "./App.css";
import Purchase from "./Components/Purchase";

function App() {
	const [purchases, setPurchases] = useState([]);

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
		var body = {
			id: "2",
			state: "Activo",
			store_name: "ArmyTech2",
			purchasing_date: "dic/20",
			item_name: "Placa2",
			total_amount: 60000,
			bank: "Santander",
			card: "Visa",
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
				// r.json().then((data) => {
				console.log(r);
				// });
			})
			.catch((e) => console.log(e));
	};

	const deleteItemHandler = () => {
		let id = "621ddd13809b57552fabfb7b";
		fetch("http://localhost:3001/purchases/" + id, {
			headers: {
				Accept: "application/json",
				"Content-Type": "application/json",
			},
			method: "DELETE",
		})
			.then(function (r) {
				console.log(r);
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
		/>
	));

	return (
		<div className="app">
			{purchasesMarkUp}
			<button
				className="button add-button"
				title="Add new purchase"
				onClick={() => addNewItemHandler()}
			>
				+
			</button>
			<button
				className="button delete-button"
				title="Delete purchase"
				onClick={() => deleteItemHandler()}
			>
				-
			</button>
		</div>
	);
}

export default App;
