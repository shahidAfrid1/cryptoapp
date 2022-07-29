import React from 'react'
import { Line } from 'react-chartjs-2'
import 'chart.js/auto';
import { Row, Col, Typography } from 'antd';
const { Title } = Typography
const LineChart = ({coinHistory, currentPrice, coinName}) => {

    const coinPrices = []
    const coinTimestamp = []

    for (let i = 0; i < coinHistory?.data?.history?.length; i += 1) {
        coinPrices.push(coinHistory?.data?.history[i].price);
      }
    
      for (let i = 0; i < coinHistory?.data?.history?.length; i += 1) {
        coinTimestamp.push(new Date(coinHistory?.data?.history[i].timestamp).toLocaleDateString());
      }
      console.log(coinHistory?.data?.history);
    console.log(coinPrices);
    console.log(coinTimestamp);

    const data = {
        labels: coinTimestamp,
        datasets: [
          {
            label: 'Price In USD',
            data: coinPrices,
            fill: false,
            backgroundColor: '#0071bd',
            borderColor: '#0071bd',
          },
        ],
      };
    
      const options = {
        scales: {
          yAxes: [
            {
                display: true,
              ticks: {
                beginAtZero: true,
              },
            },
          ],
        },
      };
  return (
    <div className='chart-container'>
        <Row className="chart-header">
        <Title level={2} className="chart-title">{coinName} Price Chart </Title>
        <Col className="price-container">
          <Title level={5} className="price-change">Change: {coinHistory?.data?.change}%</Title>
          <Title level={5} className="current-price">Current {coinName} Price: $ {currentPrice}</Title>
        </Col>
      </Row>
        <Line data={data} options={options}/>
    </div>
  )
}

export default LineChart