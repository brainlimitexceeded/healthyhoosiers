

import styles from "./styles.module.css";
import React, { useState } from 'react';

const Main = () => {
	const handleLogout = () => {
		localStorage.removeItem("token");
		window.location.reload();
	};
	const [filter, setFilter] = useState("content");
	const [searchTerm, setSearchTerm] = useState("");
	const [searchResult, setSearchResult] = useState(null);
	const [instructionMode, setInstructionMode] = useState(null);
	const [workoutType, setWorkoutType] = useState(null);

	function SearchResult(props) {
		const { data } = props;
		if(filter === "content") {
			return (
				<div>
					{data.map(item => (
						<div key={item.id}>
							<h3>{item.modeOfInstruction}</h3>
							<p>{item.typeOfWorkout}</p>
							<p>{item.ageOfContent}</p>
							<iframe width="560" height="315" src={item.content} title="Video" frameborder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture" allowfullscreen></iframe>
						</div>
					))}
				</div>
			);
		}
		else {
			return (
				<div>
					{data.map(item => (
						<div key={item.id}>
							<h3>{item.name}</h3>
							<p>{item.speciality}</p>
							<p>{item.location}</p>
						</div>
					))}
				</div>
			);
		}
	}

	function search() {
		let searchUrl = `http://3.19.53.25:8080/api/search/${filter}/${searchTerm}`;
		if(filter === 'content' & searchTerm !== '') {
			searchUrl += '/';
		}
		if (instructionMode !== null) {
			searchUrl += `${instructionMode}`;
		}
		else if (workoutType !== null) {
			searchUrl += `${workoutType}`;
		}
		
		fetch(searchUrl)
			.then(response => response.json())
			.then(data => setSearchResult(data))
			.catch(error => console.error(error));
	}

	return (
		<div className={styles.main_container}>
			<nav className={styles.navbar}>
				<h1>Customer Home Page</h1>
				<div>
					<label htmlFor="filter">Filter:</label>
					<select value={filter} onChange={(event) => {
						setFilter(event.target.value);
						setInstructionMode(null);
						setWorkoutType(null);
					}}>
						<option value="content">Content</option>
						<option value="professionals">Professionals</option>
					</select>
					{filter === "content" && (
						<>
							<select value={instructionMode || ""} onChange={(event) => {
								setInstructionMode(event.target.value === "" ? null : event.target.value);
								setWorkoutType(null);
							}}>
								<option value="">Instruction Mode</option>
								<option value="plans">Plans</option>
								<option value="videos">Videos</option>
							</select>
							<select value={workoutType || ""} onChange={(event) => {
								setWorkoutType(event.target.value === "" ? null : event.target.value);
								setInstructionMode(null);
							}}>
								<option value="">Workout Type</option>
								<option value="yoga">Yoga</option>
								<option value="zumba">Zumba</option>
							</select>
						</>
					)}
					<input type="text" value={searchTerm} onChange={(event) => setSearchTerm(event.target.value)} placeholder="" />
					<button onClick={search}>Search</button>
				</div>
				<button className={styles.white_btn} onClick={handleLogout}>
					Logout
				</button>
			</nav>
			{searchResult && <SearchResult data={searchResult} />}
		</div>
	);
};

export default Main;

