import React, {Component} from 'react';
import axios from 'axios';
import StackedBarChart from './stacked_bar_chart';

export default class TopIndustries extends Component {

	constructor(props){
		super(props);

		this.state = {
			industries_names: [],
			individuals_data: [],
			pacs_data: [],
			candidate_name: ''
		};
	}

	componentDidMount(){
		axios.get(`/api/v1/${this.props.match.params.crp_id}/candIndustry`)
		.then(response => {
			let industryArray = response.data.response.industries.industry;

			this.setState({
				industries_names: this.getIndustryNames(industryArray),
				individuals_data: this.getIndividualsData(industryArray),
				pacs_data: this.getPacsData(industryArray),
				candidate_name: response.data.response.industries['@attributes'].cand_name
			});
		})
		.catch(error => {
			console.log(error);
		});
	}
	
	getIndustryNames(industry_data){
		return industry_data.map((industry) => {
			return industry['@attributes'].industry_name;
		});
	}

	getIndividualsData(industry_data){
		return industry_data.map((industry) => {
			return parseInt(industry['@attributes'].indivs);
		});
	}

	getPacsData(industry_data){
		return industry_data.map((industry) => {
			return parseInt(industry['@attributes'].pacs);
		});
	}

	render(){
		return (
			<div className='container'>
				<div className='row'>
					<div className='col-md-4'>
						<div className='page-content-container'>
							<div className='text-center'>
								<h3>Top Industries for {this.state.candidate_name}</h3>
							</div>
							<p>Lorem ipsum dolor sit amet, consectetur adipiscing elit. Suspendisse fermentum imperdiet urna non bibendum. Suspendisse vel aliquet libero, nec egestas nibh. Phasellus blandit bibendum rhoncus. In hendrerit nisi felis, at ullamcorper nisi interdum sit amet. Interdum et malesuada fames ac ante ipsum primis in faucibus. Aenean vitae odio est. Mauris vitae lacinia nisi, a bibendum ligula. Suspendisse potenti. Integer lobortis magna molestie aliquam gravida.</p>
						</div>
					</div>
					<div className='col-md-8'>
						<div className='page-chart-container'>
							<StackedBarChart 
								bar_labels={this.state.industries_names} 
								first_data_label='Individuals' 
								first_data={this.state.individuals_data} 
								second_data_label='PACs'
								second_data={this.state.pacs_data}
								chart_title='Top Industries' />
						</div>
					</div>
				</div>
			</div>
		);
	}
}