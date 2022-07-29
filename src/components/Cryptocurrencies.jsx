import { Row, Col, Card, Input } from 'antd'
import { useGetCryptosQuery } from '../services/CryptoApi'
import { useState, useEffect } from 'react'
import millify from 'millify'
import { Link } from 'react-router-dom'
import Loader from './Loader'
const Cryptocurrencies = ({ simplified }) => {

  const count = simplified ? 10 : 100;
  
  const {data, isFetching} = useGetCryptosQuery(count);

  const [cryptos, setCryptos] = useState([])

  const [searchTerm, setSearchTerm] = useState('')

  useEffect(() => {
    
    const filteredData = data?.data?.coins.filter((coin) => coin.name.toLowerCase().includes(searchTerm.toLocaleLowerCase()))
    setCryptos(filteredData)
  }, [data,searchTerm])
  
  

  if (isFetching) return <Loader/>;
  

  return (
    <>

      { !simplified && 
      <div className="input-ContainerFilled">
        <Input className='input-field' placeholder='Search Cryptocurrencies' onChange={(e)=> setSearchTerm(e.target.value)} />
      </div> 
      }
      <Row gutter={[32,32]} className="crypro-card-container">
        {cryptos.map((currency)=>(
          <Col xs={24} sm={12} lg={8} xl={6} key={currency?.uuid}>
            <Link to={`/crypto/${currency?.uuid}`}>
            <Card title={`${currency?.rank}: ${currency?.name}`}
                  extra={<img className="card-img" src={currency?.iconUrl} alt="crypto"/>}
                  hoverable
                  className='crypto-card'
            >
              <p>Price: {millify(currency?.price)}</p>
              <p>Market Cap: {millify(currency?.marketCap)}</p>
              <p>Change: {millify(currency?.change)}</p>
            </Card>
            </Link>
          </Col>
        ))}
      </Row>
    </>
  )
}

export default Cryptocurrencies