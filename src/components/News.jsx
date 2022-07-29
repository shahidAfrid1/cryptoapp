import { Select, Typography, Row, Col, Card, Avatar } from "antd";
import { useGetCryptoNewsQuery } from "../services/CryptoNewsApi";
import { useGetCryptosQuery } from "../services/CryptoApi";
import moment from "moment";
import { useState } from "react";
import Loader from "./Loader";
const { Text, Title } = Typography;
const { Option } = Select;

const demoImage =
  "https://www.bing.com/th?id=OVFT.mpzuVZnv8dwIMRfQGPbOPC&pid=News";

const News = ({ simplified }) => {
  const [newsCategory, setNewsCategory] = useState("Cryptocurrency");
  const { data: cryptoNews } = useGetCryptoNewsQuery({
    newsCategory,
    count: simplified ? 6 : 8,
  });
  const { data } = useGetCryptosQuery(100);

  if (!cryptoNews?.value) return <Loader/>;

  return (
    <>
      {!simplified && (
        <Col span={24} className="select-crypto-container">
          <Select
            showSearch
            className="select-crypto"
            placeholder="Select a person"
            optionFilterProp="children"
            onChange={(value) => setNewsCategory(value)}
            filterOption={(input, option) =>
              option.children.toLowerCase().includes(input.toLowerCase())
            }
          >
            <Option value="Cryptocurrency">Cryptocurrency</Option>
            {data?.data?.coins?.map((coin)=> <Option value={coin.name}>{coin.name}</Option>)}
          </Select>
        </Col>
      )}
      <Row className="cryto-news-container" gutter={[32, 32]}>
        {cryptoNews?.value.map((news, i) => (
          <Col xs={24} sm={12} key={i}>
            <Card hoverable className="crypto-news-card">
              <a href={news.url} target="_blank" rel="noreferrer">
                <div className="card-image-conatiner">
                  <Title level={4} className="card-title">
                    {news.name.length > 65
                      ? `${news.name.substring(0, 65)}..`
                      : news.name}
                  </Title>
                  <img
                    src={news.image.thumbnail.contentUrl || demoImage}
                    alt="news"
                  />
                </div>
                <p className="card-description">
                  {news.description.length > 200
                    ? `${news.description.substr(0, 200)}..`
                    : news.description}
                </p>

                <div className="provider-container">
                  <Avatar
                    src={
                      news?.provider[0]?.image?.thumbnail?.contentUrl ||
                      demoImage
                    }
                  />
                  <Text className="provider-name">{news.provider[0].name}</Text>
                </div>
                <Text className="time">
                  {moment(news.datePublished).startOf("ss").fromNow()}
                </Text>
              </a>
            </Card>
          </Col>
        ))}
      </Row>
    </>
  );
};

export default News;
