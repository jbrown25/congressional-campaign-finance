import React, {Component} from 'react';
import Chart from 'chart.js';

export default class HorizontalBarChart extends Component {
	
	constructor(props){
		super(props);
	}

	componentDidMount(){
		this.renderChart();
	}

	componentDidUpdate(){
		this.renderChart();
	}

	renderChart(){
		const myChart = new Chart(this.refs.horizontal_bar_chart, {
		    type: 'horizontalBar',
		    data: {
		        labels: this.props.bar_labels,
		        datasets: [{
		            label: this.props.data_label,
		            data: this.props.bar_data,
		            backgroundColor: '#4286f4',
		            barThickness: 25
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
                    legend: {
                    	position: 'right'
                    },
                    scales: {
                    	yAxes: [{
                    		barThickness: 40
                    	}]
                    }
                }
		});	
	}

	render(){
		return (
			<div>
				<canvas ref="horizontal_bar_chart" width="400" height="247"></canvas>
			</div>
		);
	}
}