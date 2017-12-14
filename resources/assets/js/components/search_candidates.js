import React, {Component} from 'react';
import {withRouter} from 'react-router-dom';
import axios from 'axios';
import SelectSearch from 'react-select-search';
import Loader from './loader';

const membersPath = '/api/v1/members';

export default class SearchCandidates extends Component {

	constructor(props){
		super(props);

		this.state = {
			candidates: [],
			cand: ''
		};
		this.handleChange = this.handleChange.bind(this);
	}
	
	componentDidMount(){
		let storedCandidates = window.localStorage.getItem('candidates');

		if(storedCandidates){
			console.log(JSON.parse(storedCandidates));
			this.setState({
				candidates: JSON.parse(storedCandidates)
			});

			return;
		}

		axios.get(membersPath)
		.then(response => {
			//get formatted array of candidate objects {name, value}
			let candArray = this.getCandidates(response.data.results[0].members);

			this.setState({
				candidates: candArray
			});

			//cache the result
			window.localStorage.setItem('candidates', JSON.stringify(candArray));
		})
		.catch(error => {
			console.log(error);
		});
	}



	getCandidates(members){
		//filter out candidates with null crp_id
		members = members.filter((member) => member.crp_id != null);

		//name: first name + last name (party), state + district, value: crp_id
		return members.map((member) => {
			return { name: `${member.first_name} ${member.last_name} (${member.party}), ${member.state} ${member.district}`, value: member.crp_id }
		});
	}

	handleChange(event){
		this.setState({
			cand: event.value
		});
	}


	render(){

		if(this.state.candidates.length < 1){
			return (
				<div className='search-page-container'>
					<div className='search-page'>
						<Loader />
					</div>
				</div>
			);
		}

		return (
			<div className='search-page-container'>
				<div className='search-page'>
					<div className='search-page-content'>
						<h1>Select a member of congress</h1>
						<div className='searchbar-container animated lightSpeedIn'>
							<SelectSearch 
								options={this.state.candidates}
								value={this.state.cand}
								onChange={this.handleChange}
								name="language"
								placeholder="Select candidate" />
							  <button
							    type='button'
							    className='btn btn-primary'
							    onClick={() => { if(this.state.cand) this.props.history.push(`/candidates/${this.state.cand}/top_contributors`) }}
							  >
								Go
							  </button>
						</div>
					</div>
				</div>
			</div>
		);
	}
}