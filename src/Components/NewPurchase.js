import React from "react";
import { Form, Formik, Field } from "formik";
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
				store_name: "",
				purchasing_date: "",
				total_amount: "",
				bank: "",
				card: "",
			}}
			onSubmit={(values, actions) => {
				props.onSubmitPurchase(values);
			}}
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
								<Field
									id="item_name"
									name="item_name"
									type={"text"}
									className="card-prop it"
								/>
								<Field
									id="store_name"
									name="store_name"
									type={"text"}
									className="card-prop"
								/>
								<Field
									id="purchasing_date"
									name="purchasing_date"
									type={"text"}
									className="card-prop"
								/>
								<Field
									id="total_amount"
									name="total_amount"
									type={"number"}
									className="card-prop"
								/>
								<Field
									id="card"
									name="card"
									type={"text"}
									className="card-prop"
								/>
								<Field
									id="bank"
									name="bank"
									type={"text"}
									className="card-prop"
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
