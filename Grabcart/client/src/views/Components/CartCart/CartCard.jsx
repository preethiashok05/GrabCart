import React from 'react'
import '../CartCart/CartCard.css'
import { useNavigate } from 'react-router-dom';


export default function CartCard({record , msg}) {

  const navigate = useNavigate();
  const handleClick = async (e) => {
    e.preventDefault();
    navigate({
      pathname:'/order/',
      search:`?cid=${record.cart_id}`
    });
  }
  return (
    <>
    <section className="cover">  
         <div className="pname">{record.product_name}</div>
         <img src={require('../../assets/images/products/'+record.img_path)} alt="" className="pimg" />
         <div className="sbox">
            <button className="b"  >₹{record.product_cost}.0</button>
            <button className="b"  >Size : {record.size}</button>
         </div>
         <button  className="pcost">Count : {record.count}</button>
         <div className="ptext">
          <p className="p"> *Free Delivery</p>
          <p className="p">*10 days return policy</p>
         </div>
         <button onClick={handleClick} className="porder">{msg}</button>
    </section>
    </>
  )
}
