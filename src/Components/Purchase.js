import React from "react";
import "../App.css";

const Purchase = (props) => {
	return (
		<div className="card card-item">
			<span>{props.state}</span>
			<span>{props.store_name}</span>
			<span>{props.purchasing_date}</span>
			<span>{props.item_name}</span>
			<span>{props.total_amount}</span>
			<span>{props.bank}</span>
			<span>{props.card}</span>
			<button
				className="button delete-button"
				title="Delete purchase"
				onClick={props.onDeleteClick}
			>
				-
			</button>
		</div>
	);
};

export default Purchase;
