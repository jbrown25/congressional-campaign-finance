import React, {Component} from 'react';
import axios from 'axios';

export default class CandidateBio extends Component {

	constructor(props){
		super(props);

		this.state = {
			first_elected: '',
			phone: '',
			website: '',
			office: '',
			twitter_id: '',
			youtube_url: '',
			facebook_id: '',
			birthdate: ''
		};
	}

	componentDidMount(){
		axios.get(`/api/v1/${this.props.crp_id}/getLegislators`)
		.then(response => {
			let candidate = response.data.response.legislator['@attributes'];

			this.setState({
				first_elected: candidate.first_elected,
				phone: candidate.phone,
				website: candidate.website,
				office: candidate.office,
				twitter_id: candidate.twitter_id,
				youtube_url: candidate.youtube_url,
				facebook_id: candidate.facebook_id,
				birthdate: candidate.birthdate
			});
		})
		.catch(error => {
			console.log(error);
		});
	}

	render(){

		return (
			<div className='candidate-bio-info'>
				<p>First elected: {this.state.first_elected}</p>
				<p>Birthdate: {this.state.birthdate}</p>
				<p>Office: {this.state.office}</p>
				<p>Phone: {this.state.phone}</p>
				<p><a href={this.state.website}>Website</a></p>
				<div className='social'>
					<ul>
						<li><a href={`https://twitter.com/${this.state.twitter_id}`}><i className='fa fa-twitter'></i></a></li>
						<li><a href={`https://facebook.com/${this.state.facebook_id}`}><i className='fa fa-facebook'></i></a></li>
						<li><a href={this.state.youtube_url}><i className='fa fa-youtube'></i></a></li>
					</ul>
				</div>
			</div>
		);
	}
}