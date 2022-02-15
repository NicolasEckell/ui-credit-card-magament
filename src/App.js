import React, { useState, useEffect } from "react";
import axios from "axios";
import "./App.css";
import Purchase from "./Components/Purchase";

function App() {
	const [purchases, setPurchases] = useState([]);

	useEffect(() => {
		axios
			.get("localhost:3001/purchases", {
				mode: "no-cors",
				headers: {
					"Access-Control-Allow-Origin": "*",
					"Content-Type": "application/json",
				},
			})
			.then((res) => {
				console.log(res.data);
				setPurchases(res.data);
			});
	}, []);

	const purchasesMarkUp = purchases.map((item, index) => (
		<Purchase
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
			<a
				className="add-button"
				href="https://reactjs.org"
				target="_blank"
				rel="noopener noreferrer"
				title="Add new purchase"
			>
				+
			</a>
		</div>
	);
}

export default App;
