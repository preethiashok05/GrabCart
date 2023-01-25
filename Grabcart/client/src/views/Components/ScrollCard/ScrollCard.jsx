import React from 'react'
import './scroll.css'
import { useNavigate , Link, Navigate, redirect} from 'react-router-dom'


export default function ScrollCard({ id , imageurl , imagename}) {
  const navigate = useNavigate();
  var cat_id = id;
  const handleRequest = async (e) => {
    e.preventDefault();
    localStorage.setItem("cat_id" ,cat_id);
    var id = localStorage.getItem("cat_id");
    console.log(id);
    navigate({
      pathname:'/itemlist/',
      search:`?id=${id}`
    });
  }
  
  return (
    <div className="card">
      <img className='card_img'  alt="" src={require('../../assets/images/category/'+imageurl)}/>
        <button onClick={handleRequest} className='cat_name'>{imagename}</button>
    </div>
  )
}
