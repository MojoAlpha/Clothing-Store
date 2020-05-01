import React from 'react';
import {BrowserRouter, Switch, Route} from 'react-router-dom';
import Home from './core/Home'
import Signup from './user/Signup';
import Signin from './user/Signin';
import AdminRoute from './auth/helper/AdminRoutes';
import PrivateRoute from './auth/helper/PrivateRoutes';
import UserDashboard from './user/UserDashboard';
import AdminDashboard from './user/AdminDashboard';
import AddCategory from './admin/AddCategory'
import ManageCategories from './admin/ManageCategory'
import AddProduct from './admin/AddProduct'
import ManageProducts from './admin/ManageProduct';
import UpdateProduct from './admin/UpdateProduct';
import UpdateCategory from './admin/UpdateCategories';
import Cart from './core/Cart';
import { signout } from './auth/helper';



function Routes(){
    return (
        <BrowserRouter>
          <Switch>
            <Route path='/' exact component={Home} />
            <Route path='/signup'  exact component={Signup}></Route>
            <Route path='/signin'  exact component={Signin}></Route>
            <PrivateRoute path='/cart'  exact component={Cart} />
            <PrivateRoute path='/signout' exact component={signout} />
            <PrivateRoute path='/user/dashboard'  exact component={UserDashboard} />
            <AdminRoute path='/admin/dashboard'  exact component={AdminDashboard} />
            <AdminRoute path='/admin/create/category'  exact component={AddCategory} />
            <AdminRoute path='/admin/categories'  exact component={ManageCategories} />
            <AdminRoute path='/admin/create/product'  exact component={AddProduct} />
            <AdminRoute path='/admin/products'  exact component={ManageProducts} />
            <AdminRoute path='/admin/product/update/:productId'  exact component={UpdateProduct} />
            <AdminRoute path='/admin/category/update/:categoryId'  exact component={UpdateCategory} />
          </Switch>
        </BrowserRouter>
    )
}

export default Routes;