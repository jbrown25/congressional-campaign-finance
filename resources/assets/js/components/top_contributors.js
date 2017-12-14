import React, {Component} from 'react';
import axios from 'axios';
import StackedBarChart from './stacked_bar_chart';

export default class TopContributors extends Component {

	constructor(props){
		super(props);

		this.state = {
			org_names: [],
			individuals_data: [],
			pacs_data: [],
			candidate_name: ''
		};
	}

	componentDidMount(){
		axios.get(`/api/v1/${this.props.match.params.crp_id}/candContrib`)
		.then(response => {
			let contribArray = response.data.response.contributors.contributor;

			this.setState({
				org_names: this.getOrgNames(contribArray),
				individuals_data: this.getIndividualsData(contribArray),
				pacs_data: this.getPacsData(contribArray),
				candidate_name: response.data.response.contributors['@attributes'].cand_name
			});
		})
		.catch(error => {
			console.log(error);
		});
	}

	getOrgNames(contrib_data){
		return contrib_data.map((contrib) => {
			return contrib['@attributes'].org_name;
		});
	}

	getIndividualsData(contrib_data){
		return contrib_data.map((contrib) => {
			return parseInt(contrib['@attributes'].indivs);
		});
	}

	getPacsData(contrib_data){
		return contrib_data.map((contrib) => {
			return parseInt(contrib['@attributes'].pacs);
		});
	}

	render(){
		return (
			<div className='container'>
				<div className='row'>
					<div className='col-md-4'>
						<div className='page-content-container'>
							<div className='text-center'>
								<h3>Top Contributors for {this.state.candidate_name}</h3>
							</div>
							<p>Lorem ipsum dolor sit amet, consectetur adipiscing elit. Suspendisse fermentum imperdiet urna non bibendum. Suspendisse vel aliquet libero, nec egestas nibh. Phasellus blandit bibendum rhoncus. In hendrerit nisi felis, at ullamcorper nisi interdum sit amet. Interdum et malesuada fames ac ante ipsum primis in faucibus. Aenean vitae odio est. Mauris vitae lacinia nisi, a bibendum ligula. Suspendisse potenti. Integer lobortis magna molestie aliquam gravida.</p>
						</div>
					</div>
					<div className='col-md-8'>
						<div className='page-chart-container'>
							<StackedBarChart 
								bar_labels={this.state.org_names} 
								first_data_label='Individuals' 
								first_data={this.state.individuals_data} 
								second_data_label='PACs'
								second_data={this.state.pacs_data}
								chart_title='Top Contributors' />
						</div>
					</div>
				</div>
			</div>
		);
	}
}

