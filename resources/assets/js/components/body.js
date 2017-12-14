import React from 'react';
import {Route, Switch} from 'react-router-dom';
import SearchCandidates from './search_candidates';
import Candidates from './candidates';

const Body = () => {
	return (
		<div>
			<Switch>
				<Route exact path='/' component={SearchCandidates} />
				<Route path='/candidates' component={Candidates} />
			</Switch>
		</div>
	);
};

export default Body;