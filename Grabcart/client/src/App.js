import Home from "./views/pages/Home/Home";
import Menu from "./views/pages/Menu/Menu";
import Login from "./views/pages/Login/Login";
import Register from './views/pages/Register/Register'
import {Route ,BrowserRouter , Routes} from 'react-router-dom'
import Itemlist from "./views/pages/ItemList/Itemlist";
import {useState , useEffect} from 'react';
import Item from "./views/pages/Item/Item";
import Cart from "./views/pages/Cart/Cart";
import Order from '../src/views/pages/Order/Order';

function App() {



  return (
   <BrowserRouter>
      <Routes>
        <Route element={<Home/>} path="/"/>
        <Route element={<Login/>} path="/login"/>
        <Route element={<Register/>} path="/register"/>
        <Route element={<Menu/>} path="/menu"/>
        <Route  element={<Itemlist/>} path="/itemlist/"/>
        <Route element ={<Item/>} path="/item"/>
        <Route element ={<Cart/>} path="/cart" />
        <Route element ={<Order/>} path="/order" />
      </Routes>
   </BrowserRouter>
  )
}

export default App;
