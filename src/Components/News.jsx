import React, { useState } from 'react';
import { Select, Typography, Row, Col, Avatar, Card } from 'antd';
import moment from 'moment';

import { useGetCryptoNewsQuery } from '../services/cryptoNewsApi';
import { useGetCryptosQuery } from '../services/cryptoApi';
import Loader from './Loader';

const { Text, Title } = Typography;
const { Option } = Select;

const demoImage = 'https://www.bing.com/th?id=OVFT.mpzuVZnv8dwIMRfQGPbOPC&pid=News'

const News = ({ simplified }) => {

  const [newsCategory, setNewsCategory] = useState('Cryptocurrency')

  const {data: cryptoNews } = useGetCryptoNewsQuery({newsCategory, count: simplified ? 6 : 20});
  const { data } = useGetCryptosQuery(100);

  if (!cryptoNews?.data) return <Loader />;
  console.log(cryptoNews);

  return (
    <Row gutter={[24, 24]}>

      {!simplified && (
        <Col span={24} >
          <Select 
          showSearch 
          className='select-news' 
          placeholder='Select a Crypto' 
          optionFilterProp='children'
          onChange={(value) => setNewsCategory(value)} 
          filterOption={(input, option) => option.children.toLowerCase().indexOf(input.toLowerCase()) >= 0}
          >
              <Option value="Cryptocurrency">Cryptocurrency</Option>
              {data?.data?.coins.map((coin) => <Option value={coin.name}>{coin.name}</Option>)}
          </Select>
        </Col>
      )}
        {cryptoNews.data.map((news, index) => (
          <Col xs={24} sm={12} lg={8} key={index}>
            <Card hoverable className='news-card'>
              <a href={news.url} target='_blank' rel="noreferrer">
                <div className='news-image-container'>
                  <Title className='news-title' level={4}>{news.title}</Title>
                  <img className='img' src={news?.thumbnail || demoImage } alt='news'/>
                </div>
                <p>
                {news.description.length > 100 ? `${news.description.substring(0, 100)}...` : news.description}

                </p>
                <div className='provider-container'>
                    <div>
                      <Avatar src={news?.thumbnail?.contentUrl || demoImage} alt=''/>
                      <Text>{moment(news.createdAt).startOf('ss').fromNow()}</Text>
                    </div>
                </div>
              </a>
            </Card>
          </Col>
        ))}
    </Row>
  )
}

export default News