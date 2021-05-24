import React, { Fragment, useState, useEffect } from 'react'
// import products from '../products'
import { Row, Col } from 'react-bootstrap'
import Product from '../components/Product'
import Message from '../components/Message'
import Loader from '../components/Loader'
import { useDispatch, useSelector } from 'react-redux'
import { listProducts } from '../actions/productActions'
import Paginate from '../components/Paginate'
// import axios from 'axios'

const HomeScreen = ({ match }) => {
  //   const [products, setProducts] = useState([])

  //   useEffect(() => {
  //     const fetchProducts = async () => {
  //       const { data } = await axios.get('/api/products')

  //       setProducts(data)
  //     }

  //     fetchProducts()
  //   }, [])

  const keyword = match.params.keyword
  const pageNumber = match.params.pageNumber || 1
  const dispatch = useDispatch()
  const productList = useSelector((state) => state.productList)
  useEffect(() => {
    dispatch(listProducts(keyword, pageNumber))
  }, [dispatch, keyword, pageNumber])
  const { loading, error, products, page, pages } = productList

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
        <Fragment>
          <Row>
            {products.map((product) => (
              <Col key={product._id} sm={12} md={6} lg={4}>
                <Product product={product} />
              </Col>
            ))}
          </Row>
          <Paginate
            pages={pages}
            page={page}
            keyword={keyword ? keyword : ''}
          ></Paginate>
        </Fragment>
      )}
    </Fragment>
  )
}

export default HomeScreen
