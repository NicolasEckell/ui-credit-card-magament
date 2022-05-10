import React, { useState, useEffect } from "react";
import "./App.scss";
import Purchase from "./Components/Purchase/Purchase";
import NewPurchase from "./Components/Purchase/NewPurchase";
import { Toast, useToast } from "./Components/Toast/Toast";

function App() {
	const [purchases, setPurchases] = useState([]);
	const [total, setTotal] = useState(null);
	const [enableNewPurchase, setEnableNewPurchases] = useState(false);

	useEffect(() => {
		loadData();
	}, []);

	const loadData = () => {
		fetch("http://localhost:3001/purchases", {
			method: "GET",
		})
			.then(function (r) {
				r.json().then((res) => {
					setPurchases(res.data);
					setTotal(res.total);
				});
			})
			.catch((e) => console.log(e));
	};

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
					if (r.status === 201) {
						useToast.success("Purchase created", "toast-gen");
						setEnableNewPurchases(false);
						loadData();
					} else if (r.status === 404) {
						useToast.error(JSON.parse(data)[0], "toast-gen");
					}
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
					if (r.status === 204) {
						useToast.warning("Purchase deleted", "toast-gen");
						loadData();
					} else if (r.status === 404) {
						useToast.error(JSON.parse(data)[0], "toast-gen");
					}
				});
			})
			.catch((e) => console.log(e));
	};

	const generateResume = () => {
		let out = [];
		purchases.forEach((val) => {
			out.push(
				val.purchasing_date +
					"\t\t" +
					val.item_name +
					"\t\t" +
					val.store_name +
					"\t\t" +
					val.total_amount +
					"\t\t" +
					val.card +
					"\t\t" +
					val.bank
			);
			out.push("\n");
		});
		return out;
	};

	const downloadResume = () => {
		const element = document.createElement("a");
		const resume = generateResume();
		const file = new Blob(resume, {
			type: "text/plain",
		});
		element.href = URL.createObjectURL(file);
		element.download = "resumen.txt";
		document.body.appendChild(element);
		element.click();
	};

	const toastGen = <Toast autoClose={3000} id="toast-gen" />;

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

	const totalMarkUp = total !== null && (
		<div className="mb-2">
			<div className="total">
				<label></label>Total a liquidar en este mes: ${total}
			</div>
			<button className="button download" onClick={downloadResume}>
				Descargar resumen
			</button>
		</div>
	);

	return (
		<div className="app">
			{toastGen}
			{purchasesMarkUp}
			{newPurchaseMarkUp}
			{addButtonMarkUp}
			{totalMarkUp}
		</div>
	);
}

export default App;
