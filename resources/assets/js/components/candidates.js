import React from 'react';
import {Switch, Route} from 'react-router-dom';
import Candidate from './candidate';

const Candidates = () => {
	return (
		<div>
			<Route path='/candidates/:crp_id' component={Candidate} />
		</div>
	);
};

export default Candidates;