import React from "react";
import "./../../styles/styles.scss";
import "../../App.scss";
import "./Purchase.scss";

const Purchase = (props) => {
	return (
		<div className="card-container w-65">
			<div className="card">
				<span className="card-prop it">{props.item_name}</span>
				<span className="card-prop">{props.store_name}</span>
				<span className="card-prop">{props.purchasing_date}</span>
				<span className="card-prop">${props.total_amount}</span>
				{props.active_quota !== undefined &&
					props.total_quotas !== undefined && (
						<span className="card-prop">
							{props.active_quota}/{props.total_quotas}
						</span>
					)}
				{props.quota_amount !== undefined && (
					<span className="card-prop bold">
						${props.quota_amount}
					</span>
				)}
				<span className="card-prop">{props.bank}</span>
				<span className="card-prop">{props.card}</span>
			</div>
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
