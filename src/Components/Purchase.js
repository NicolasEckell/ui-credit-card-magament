import React from "react";

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
		</div>
	);
};

export default Purchase;
