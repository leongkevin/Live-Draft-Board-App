import React, { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { NavLink, useParams } from 'react-router-dom';
import { useHistory } from 'react-router-dom';
import { updateLeagueAction } from '../../store/league';
import { useModal } from '../../context/Modal';


function LeagueUpdateModal(props) {
	const dispatch = useDispatch();
	const history = useHistory();
	const closeModal = useModal();

	const [name, setName] = useState('');
	const [adminId, setAdminId] = useState(0);
	const [draftDate, setDraftDate] = useState(new Date());
	const [errors, setErrors] = useState([]);

	const sessionUser = useSelector((state) => state.session?.user);

	const handleUpdateLeague = async (e) => {
		e.preventDefault();
		setErrors([]);

	// 	try {
	// 		const league = await dispatch(
	// 			createLeagueAction({
	// 				name,
	// 				admin_id: sessionUser.id,
	// 				draft_date: draftDate,
	// 			})
	// 		);
	// 		// await history.push(`/leagues/${league.id}`);
	// 		.then(closeModal)
	// 	} catch (errors) {
	// 		alert(errors);
	// 	}
	// };
		// console.log(props.league.id)
	try {
		const league = await dispatch(
			updateLeagueAction({
				id: props.league.id,
				name: name,
				// draft_date: draftDate,
			})

		)
		.then(history.push("/leagues"))
	} catch (errors) {
		alert(errors);
	}
};
	return (
		<>
			<div className="league">
				<h2>Update League Name</h2>

				<form className="league-form" onSubmit={handleUpdateLeague}>

						{errors.length ? <h3>Errors</h3> : ''}
						<div className="errors">
							{errors.map((error, idx) => (
								<li key={idx}>{errors}</li>
							))}
						</div>


					<label className="league-form">Name: </label>
					<input
						className="league-form-input"
						type="text"
						placeholder="Name"
						onChange={(e) => setName(e.target.value)}
						required
					/>

					{/* <label className="song-modal-label">Draft Date</label>
					<input
						className="league-form-input"
						type="date"
						placeholder="Draft Date"
						onChange={(e) => setDraftDate(e.target.value)}
						required
					/> */}

					<button
						className="league-form-button"
						type="submit"
						disabled={errors.length ? true : false}
					>
						Update
					</button>
				</form>
			</div>
		</>
	);
}
export default LeagueUpdateModal;
