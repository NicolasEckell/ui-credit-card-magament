import React from "react";
import { Form, Formik } from "formik";
import "./../styles/styles.scss";
import "../App.scss";
import "./Purchase.scss";

const NewPurchase = (props) => {
	return (
		<Formik
			validateOnChange={true}
			validateOnBlur={true}
			initialValues={{
				item_name: "",
			}}
			onSubmit={props.onSubmitPurchase}
		>
			{({
				values,
				errors,
				touched,
				isValid,
				dirty,
				handleChange,
				handleBlur,
			}) => {
				return (
					<Form>
						<div className="card-container">
							<div className="card">
								<input
									type={"text"}
									className="card-prop it"
									name="item_name"
								/>
								<input
									type={"text"}
									className="card-prop"
									name="store_name"
								/>
								<input
									type={"text"}
									className="card-prop"
									name="purchasing_date"
								/>
								<input
									type={"text"}
									className="card-prop"
									name="purchasing_date"
								/>
								<input
									type={"number"}
									className="card-prop"
									name="total_amount"
								/>
								<input
									type={"text"}
									className="card-prop"
									name="card"
								/>
								<input
									type={"text"}
									className="card-prop"
									name="bank"
								/>
							</div>
							<button
								className="button add-enter-button"
								title="Add new purchase"
								type="submit"
							>
								Add
							</button>
						</div>
					</Form>
				);
			}}
		</Formik>
	);
};

export default NewPurchase;
