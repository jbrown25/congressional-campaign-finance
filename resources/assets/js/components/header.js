import React from 'react';
import {Link} from 'react-router-dom';

const Header = () => {
	return (
		<div className='back-btn-container'>
			<Link className='btn btn-default' to='/'>Back to search</Link>
		</div>
	);
};

export default Header;