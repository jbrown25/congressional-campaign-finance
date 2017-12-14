import React, {Component} from 'react';
import axios from 'axios';
import StackedBarChart from './stacked_bar_chart';

export default class TopSectors extends Component {

	constructor(props){
		super(props);

		this.state = {
			sector_names: [],
			individuals_data: [],
			pacs_data: [],
			candidate_name: ''
		};
	}

	componentDidMount(){
		axios.get(`/api/v1/${this.props.match.params.crp_id}/candSector`)
		.then(response => {
			let sectorArray = response.data.response.sectors.sector;

			this.setState({
				sector_names: this.getSectorNames(sectorArray),
				individuals_data: this.getIndividualsData(sectorArray),
				pacs_data: this.getPacsData(sectorArray),
				candidate_name: response.data.response.sectors['@attributes'].cand_name
			});
		})
		.catch(error => {
			console.log(error);
		});
	}

	getSectorNames(sector_data){
		return sector_data.map((sector) => {
			return sector['@attributes'].sector_name;
		});
	}

	getIndividualsData(sector_data){
		return sector_data.map((sector) => {
			return parseInt(sector['@attributes'].indivs);
		});
	}

	getPacsData(sector_data){
		return sector_data.map((sector) => {
			return parseInt(sector['@attributes'].pacs);
		});
	}

	render(){
		return (
			<div className='container'>
				<div className='row'>
					<div className='col-md-4'>
						<div className='page-content-container'>
							<div className='text-center'>
								<h3>Top Sectors for {this.state.candidate_name}</h3>
							</div>
							<p>Lorem ipsum dolor sit amet, consectetur adipiscing elit. Donec lacus eros, venenatis eget volutpat ut, finibus quis libero. Maecenas mollis ante mauris, et tristique nulla luctus a. Praesent id leo vel quam faucibus rutrum. Nunc placerat leo ac fringilla pretium. Morbi hendrerit, turpis ut volutpat efficitur, massa lorem hendrerit mauris, et pretium ligula metus vitae est. Maecenas risus quam, commodo in facilisis eu, rhoncus rutrum justo. Integer imperdiet semper ullamcorper. Fusce molestie odio vel ex volutpat, eu malesuada tortor tincidunt. Donec pellentesque augue ac arcu congue, ut vulputate neque viverra. Phasellus tincidunt placerat facilisis. Aenean varius nulla risus, a aliquet eros iaculis eget. Lorem ipsum dolor sit amet, consectetur adipiscing elit. Aliquam orci leo, porta vel tincidunt id, convallis a nulla.</p>
						</div>
					</div>
					<div className='col-md-8'>
						<div className='page-chart-container'>
							<StackedBarChart 
								bar_labels={this.state.sector_names} 
								first_data_label='Individuals' 
								first_data={this.state.individuals_data} 
								second_data_label='PACs'
								second_data={this.state.pacs_data}
								chart_title='Top Sectors' />
						</div>
					</div>
				</div>
			</div>
		);
	}
}

