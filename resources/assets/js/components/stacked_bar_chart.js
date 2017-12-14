import React, {Component} from 'react';
import Chart from 'chart.js';

export default class StackedBarChart extends Component {
	
	componentDidMount(){
		this.renderChart();
	}

	componentDidUpdate(){
		this.renderChart();
	}

	renderChart(){
		const myChart = new Chart(this.refs.stacked_bar_chart, {
		    type: 'bar',
		    data: {
		        labels: this.props.bar_labels,
		        datasets: [{
		            label: this.props.first_data_label,
		            data: this.props.first_data,
		            backgroundColor: '#4286f4'
		        },{
		        	label: this.props.second_data_label,
		        	data: this.props.second_data,
		        	backgroundColor: '#058721'
		        }]
		    },
		    options: {
                    title:{
                        display:true,
                        text: this.props.chart_title
                    },
                    tooltips: {
                        mode: 'index',
                        intersect: false
                    },
                    responsive: true,
                    scales: {
                        xAxes: [{
                            stacked: true,
                            ticks: {
                            	autoSkip: false
                            }
                        }],
                        yAxes: [{
                            stacked: true,
                            ticks: {
                            	autoSkip: false
                            }
                        }]
                    }
                }
		});		
	}


	render(){

		return (
			<div>
				<canvas ref="stacked_bar_chart" width="400" height="400"></canvas>
			</div>
		);
	}
}