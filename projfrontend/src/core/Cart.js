import React, {useState, useEffect} from 'react';
import '../styles.css'
import {API} from '../backend';
import Base from './Base';
import Card from './card';
import { getProducts } from './helper/coreapicalls';
import { loadCart } from './helper/cartHelper';
import StripeCheckout from './stripeCheckout';


const Cart =()=> {

    const [products, setProducts] = useState([])
    const [reload, setReload] = useState(false)  //tricking the app to reload as sometimes due to many children mounting is not rendering

    useEffect(() => {
        setProducts(loadCart())
    },[reload])  //forcrfully uploading on updating

    const loadAllProducts= () => {
        return (
            <div>
              <h2>This section is to load products</h2>
              {products.map((product, index) => (
                  <Card 
                  key={index}
                  product={product}
                  removeFromCart={true}
                  addtoCart={false}
                  setReload = {setReload}
                  reload={reload}
                  />
              ))}
            </div>
        )
    }

    const loadCheckout = () => {
        return (
            <div>
              <h2>This section is for checkout</h2>
            </div>
        )
    }

    return (
        <Base title='Cart Page' description='Ready to Checkout'>
            <div className='row'>
               <div className='col-6'>{loadAllProducts()}</div>
               <div className='col-6'><StripeCheckout products={products} setReload={setReload} /></div>
            </div>
        </Base>
    );
}

export default Cart;