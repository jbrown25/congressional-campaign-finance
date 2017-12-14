import React, {Component} from 'react';
import {Switch, Route, Link} from 'react-router-dom';
import axios from 'axios';
import TopContributors from './top_contributors';
import TopIndustries from './top_industries';
import TopSectors from './top_sectors';
import HorizontalBarChart from './horizontal_bar_chart';
import CandidateBio from './candidate_bio';

export default class Candidate extends Component {

	constructor(props){
		super(props);
		this.state = {
			cand_name: '',
			cand_party: '',
			cand_state: '',
			total_receipts: 0,
			spent: 0,
			cash_on_hand: 0,
			debt: 0
		};
	}

	componentDidMount(){
		axios.get(`/api/v1/${this.props.match.params.crp_id}/candSummary`)
		.then(response => {
			let thisCandidate = response.data.response.summary['@attributes'];

			this.setState({
				cand_name: thisCandidate.cand_name,
				cand_party: thisCandidate.party,
				cand_state: thisCandidate.state,
				total_receipts: parseFloat(thisCandidate.total),
				spent: parseFloat(thisCandidate.spent),
				cash_on_hand: parseFloat(thisCandidate.cash_on_hand),
				debt: parseFloat(thisCandidate.debt)
			});
		})
		.catch(error => {
			console.log(error);
		});
	}

	render(){
		return (
			<div>
				<header className='site-header'>
					<div className='container'>
						<div className='row'>
							<div className='col-md-6'>
								<div className='header-content-container'>
									<h2>{this.state.cand_name} ({this.state.cand_party}), {this.state.cand_state}</h2>
									<CandidateBio crp_id={this.props.match.params.crp_id} />
								</div>
							</div>
							<div className='col-md-6'>
								<div className='header-chart-container'>
									<HorizontalBarChart 
										bar_labels = {['Total receipts', 'Spent', 'Cash on hand', 'Debt']}
										data_label = 'data label'
										bar_data = {[this.state.total_receipts, this.state.spent, this.state.cash_on_hand, this.state.debt]}
										chart_title = 'Campaign fundraising data' />
								</div>
							</div>
						</div>
					</div>
				</header>
				<nav className='navbar navbar-default'>
				  <div className='navbar-collapse collapse'>
				  	<div className='container'>
					    <ul className='nav navbar-nav'>
					      <li><Link to={`${this.props.match.url}/top_contributors`}>Top Contributors</Link></li>
					      <li><Link to={`${this.props.match.url}/top_industries`}>Top Industries</Link></li>
					      <li><Link to={`${this.props.match.url}/top_sectors`}>Top Sectors</Link></li>
					    </ul>
				  	</div>
				  </div>
				</nav>
				<Switch>
					<Route path='/candidates/:crp_id/top_contributors' component={TopContributors} />
					<Route path='/candidates/:crp_id/top_industries' component={TopIndustries} />
					<Route path='/candidates/:crp_id/top_sectors' component={TopSectors} />
				</Switch>
			</div>
		);
	}
}

