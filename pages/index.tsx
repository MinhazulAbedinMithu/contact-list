import { Form, Formik } from "formik";
import type { NextPage } from "next";
import Head from "next/head";
import { useState } from "react";
import * as Yup from "yup";
import AddContact from "../components/AddContact";
import Contact from "../components/Contact";
import FieldItem from "../components/FieldItem";
import useStorage from "../hooks/useStorage";

interface IContact {
	name: string;
	email: string;
	phone: string;
	address?: string;
}

const Home: NextPage = () => {
	const [contact, setContact] = useState<IContact>({
		name: "",
		email: "",
		phone: "",
		address: "",
	});

	const [contactList, setContactList] = useState<IContact[]>([]);

	// const [contactList, setContactList] = useStorage<IContact[]>(
	// 	"contactList",
	// 	[]
	// );

	const validationSchema = Yup.object({
		name: Yup.string().required("Required !"),
		email: Yup.string().required("Required !"),
		phone: Yup.string().required("Required !"),
		address: Yup.string(),
	});

	const handleSubmit = (values: IContact) => {
		const newContactList = [...contactList, values];
		setContactList(newContactList);
		localStorage.setItem("contactList", JSON.stringify(newContactList));
	};

	return (
		<div>
			<Head>
				<title>Contact List</title>
				<meta name="description" content="Generated by create next app" />
				<link rel="icon" href="/favicon.ico" />
			</Head>

			<main className="container my-5 mx-auto">
				<h1 className="text-4xl font-bold text-center text-green-500 bg-black py-2 rounded-lg sticky top-0 z-50">
					Contact List
				</h1>

				<div className="flex gap-10">
					<div className="w-2/4">
						<Formik
							initialValues={contact}
							validationSchema={validationSchema}
							onSubmit={handleSubmit}
						>
							{(formik) => (
								<Form className="mx-auto my-10 bg-slate-600/50 p-10 flex flex-col gap-5 rounded-lg w-full">
									<FieldItem
										label="Name"
										type="text"
										name="name"
										placeholder="Minhaz Mithu"
										isRequired={true}
									/>
									<FieldItem
										label="Email"
										type="email"
										name="email"
										placeholder="minhaz@domain.com"
										isRequired={true}
									/>
									<FieldItem
										label="Phone"
										type="text"
										name="phone"
										placeholder="523465456"
										isRequired={true}
									/>
									<FieldItem
										label="Address"
										type="text"
										name="address"
										placeholder="Ullapara, Sirajganj"
									/>

									<div className="flex items-center justify-center mt-10">
										<input
											type="submit"
											value="Add Contact"
											disabled={!(formik.dirty && formik.isValid)}
											className="text-2xl font-bold bg-gradient-to-br from-lime-600 via-violet-800 to-fuchsia-600 px-5 py-2 rounded-md drop-shadow-lg text-yellow-400 cursor-pointer"
										/>
									</div>
								</Form>
							)}
						</Formik>
					</div>
					<div className="w-2/4 flex flex-col gap-5 my-10">
						{contactList.map((item: IContact, index: number) => (
							<Contact key={index} item={item} index={index} />
						))}
					</div>
				</div>
			</main>
		</div>
	);
};

export default Home;
