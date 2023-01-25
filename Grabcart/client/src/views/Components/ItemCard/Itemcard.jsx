import React from 'react';
import '../ItemCard/ItemCard.css'
import { useNavigate } from 'react-router-dom';


const Itemcard = ({ids,records}) => {
    var path = records.img_path;
    const navigate = useNavigate();
    const handleRequest = async (e) => {
      e.preventDefault();
      localStorage.setItem("prdt_id" ,ids);
      navigate({
        pathname:'/item/',
        search:`?id=${ids}`
      });
    }
    return (
        <div onClick={handleRequest} className="car" >
            <img className="imgg" src={require('../../assets/images/products/'+path)} />
            <div className="price"> ₹ {records.product_cost}.0</div>
            <div className="itemname">{records.product_name}</div>
        </div>
    );
}

export default Itemcard;
