import React, { Fragment, useState, useEffect } from 'react'
// import products from '../products'
import { Row, Col } from 'react-bootstrap'
import Product from '../components/Product'
import Message from '../components/Message'
import Loader from '../components/Loader'
import { useDispatch, useSelector } from 'react-redux'
import { listProducts } from '../actions/productActions'
// import axios from 'axios'

const HomeScreen = () => {
  //   const [products, setProducts] = useState([])

  //   useEffect(() => {
  //     const fetchProducts = async () => {
  //       const { data } = await axios.get('/api/products')

  //       setProducts(data)
  //     }

  //     fetchProducts()
  //   }, [])

  const dispatch = useDispatch()
  const productList = useSelector((state) => state.productList)
  useEffect(() => {
    dispatch(listProducts())
  }, [dispatch])
  const { loading, error, products } = productList

  return (
    <Fragment>
      <h1>Latest Products</h1>
      {loading ? (
        <h2>
          <Loader />
        </h2>
      ) : error ? (
        <Message variant='danger' children={error} />
      ) : (
        <Row>
          {products.map((product) => (
            <Col key={product._id} sm={12} md={6} lg={4}>
              <Product product={product} />
            </Col>
          ))}
        </Row>
      )}
    </Fragment>
  )
}

export default HomeScreen
