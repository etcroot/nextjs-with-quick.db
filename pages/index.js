import Layout from "../components/Layout";
import { useState } from "react";
import { useRouter } from "next/router";
import axios from "axios";

export default function Home({ data }) {
	let [count, setCount] = useState(data.response || 0);
	const router = useRouter();
	async function Increase() {
		let config = {
			method: "POST",
			// change the url in .env.local
			url: `${process.env.NEXT_PUBLIC_API_URL}/api/count`,
			headers: {
				"Content-Type": "application/json",
			},
			data: count + 1,
		};

		try {
			setCount(count + 1);
			const response = await axios(config);
			console.log(response);
		} catch (err) {
			console.log(err);
		}
	}
	async function Decrease() {
		let config = {
			method: "POST",
			// change the url in .env.local
			url: `${process.env.NEXT_PUBLIC_API_URL}/api/count`,
			headers: {
				"Content-Type": "application/json",
			},
			data: count - 1,
		};
		try {
			// You will get an error if the count hits 0.
			if (count < 2) {
				return alert("You cannot go beneath 1.");
			} else {
				setCount(count - 1);
				const response = await axios(config);
				console.log(response);
			}
		} catch (err) {
			console.log(err);
		}
	}
	return (
		<Layout title="Home">
			<div className="flex flex-col gap-5 items-center">
				<div className="flex flex-col">
					<h4 className="text-2xl font-bold uppercase text-indigo-500">
						Simple Counter
					</h4>
					<h1 className="text-5xl font-bold uppercase">With Quick.DB</h1>
				</div>
				<p className="text-5xl font-semibold text-indigo-500" name="count">
					{count}
				</p>
				<div className="flex gap-5 items-center">
					<button
						className="w-max bg-green-400 text-white font-semibold rounded px-4 py-2"
						onClick={Increase}
					>
						+
					</button>
					<button
						className="w-max bg-red-400 text-white font-semibold rounded px-4 py-2"
						onClick={Decrease}
					>
						-
					</button>
				</div>
				<button
					className="w-max bg-indigo-400 text-white font-semibold rounded px-4 py-2"
					onClick={() => router.reload()}
				>
					Refresh Page
				</button>
				<div className="flex flex-col mt-5 gap-3 text-center max-w-2xl text-lg">
					<p>
						This counter saves the current value through the built in API in NextJS
						using{" "}
						<a href="https://www.npmjs.com/package/quick.db" target="_blank">
							quick.db
						</a>{" "}
						as an alternative to more complex databases so that beginners can learn
						more about data storing & fetching.
					</p>
					<p className="text-base">
						Built by{" "}
						<a href="https://github.com/etcroot" target="_blank">
							etcroot
						</a>
					</p>
				</div>
			</div>
		</Layout>
	);
}

export async function getServerSideProps(context) {
	const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/api/count`);
	const data = await res.json();

	return { props: { data } };
}
