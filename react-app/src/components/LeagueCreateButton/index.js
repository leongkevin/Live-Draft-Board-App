import React, { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useHistory } from 'react-router-dom';
import { createLeagueAction } from '../../store/league';
import { useModal } from '../../context/Modal';

function LeagueCreateButton() {
	const dispatch = useDispatch();
	const history = useHistory();
	const closeModal = useModal();

	const [name, setName] = useState('');
	const [adminId, setAdminId] = useState(0);
	const [draftDate, setDraftDate] = useState(new Date());
	const [errors, setErrors] = useState([]);

	const sessionUser = useSelector((state) => state.session?.user);

	const handleCreateLeague = async (e) => {
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

		// try {
			const league = await dispatch(
				createLeagueAction({
					// draft_date: draftDate,
				})
			)
			.then(history.push('/leagues'));
		// } catch (errors) {
		// 	alert(errors);
		// }
	};
	return (
		<>
			{/* <div className="league"> */}
				<form className="league-form" onSubmit={handleCreateLeague}>
					{errors.length ? <h3>Errors</h3> : ''}
					<div className="errors">
						{errors.map((error, idx) => (
							<li key={idx}>{errors}</li>
						))}
					</div>

					<button
						className='nav-bar-button'
						type="submit"
						disabled={errors.length ? true : false}
					>
						Create League
					</button>
				</form>
			{/* </div> */}
		</>
	);
}
export default LeagueCreateButton;
