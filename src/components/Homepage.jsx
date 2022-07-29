import React from "react";
import { Statistic, Row, Col, Typography } from "antd";
import millify from "millify";
import { useGetCryptosQuery } from "../services/CryptoApi";
import Cryptocurrencies from "./Cryptocurrencies";
import News from "./News";
import { Link } from "react-router-dom";
import Loader from "./Loader";

const Homepage = () => {

  const { data, isFetching } = useGetCryptosQuery(10);
  const stats = data?.data?.stats
  console.log(data);

  if(isFetching){
    return <Loader />;
  }

  return (
    <>
      <div className="stats">
        <h2>Global Crypto Stats</h2>
        <Row className="stats-row">
          <Col className="stats-column" xs={12}>
            <Statistic title="Total Cryptocurrencies" value={millify(stats?.totalCoins)} />
          </Col>
          <Col className="stats-column" xs={12}>
            <Statistic title="Total Exchanges" value={millify(stats?.totalExchanges)} />
          </Col>
          <Col className="stats-column" xs={12}>
            <Statistic title="Total Market Cap" value={millify(stats?.totalMarketCap)} />
          </Col>
          <Col className="stats-column" xs={12}>
            <Statistic title="Total 24h Volume" value={millify(stats?.total24hVolume)} />
          </Col>
          <Col className="stats-column" xs={12}>
            <Statistic title="Total Markets" value={millify(stats?.totalMarkets)} />
          </Col>
        </Row>
      </div>

      <div className="heading-container">
        <Typography.Title level={4} className="heading-title">Top 10 Crytocurrencies in the world</Typography.Title>
        <Typography.Title level={5} className="show-more"><Link to="/cryptocurrencies">Show more</Link></Typography.Title>
      </div>
      <Cryptocurrencies simplified />

      <div className="heading-container">
        <Typography.Title level={4} className="heading-title">Top Cryptocurrencies related news</Typography.Title>
        <Typography.Title level={5} className="show-more"><Link to="/news">Show more</Link></Typography.Title>
      </div>
      <News  simplified />
    </>
  );
};

export default Homepage;
