import React, { useState,useEffect} from 'react'
import {Link, Navigate, useNavigate} from 'react-router-dom'
import './Home.css';
import { host } from '../../../utils/APIRoutes';
import ScrollCard from '../../Components/ScrollCard/ScrollCard'

export default function Home() {

  const [user ,setuser]= useState('undefined');
  const [categories, setcategories] = useState([]);

  useEffect(() => {
   var mount = true;
    if(mount)
    {
      const username = localStorage.getItem('username');
      console.log(username);
      if(username !== 'null')
      {setuser(username);}
      else
      {setuser('undefined');}
    }
    
  }, [user]);

  useEffect(() => {
    var mount = true;
    if(mount === true)
    {
      fetch(`${host}/categories`)
      .then(data => data.json())
      .then(data => {
        if(data['msg'] === 'success')
        {
           setcategories(data['record'])
           console.log(data['record'])
        }
        else
          console.log('error occured')
      })//console.log('cat' ,categories));
    }
    return () => {mount = false;};
  }, []);

  function handleLogout(e) {
      e.preventDefault();
      localStorage.setItem('username', null);
      setuser('undefined');
      //console.log(user);
  }

  return (
   <>
    <section className="nav">
      <Link to='/menu' className='menuicon'>Menu</Link>
      <div className="title">GRABCART</div>
      {user === 'undefined'?  <button><Link to="/login" className="user">Login</Link></button> : <><p className='user'>👤 {user}</p> <button onClick={handleLogout}>Logout</button> </>}
    </section>
    
    <section className="banner">
      <img width={'100%'} height={'100%'} src="https://img.ltwebstatic.com/images3_ach/2022/12/18/1671359713980a7326becde475bbf8131074a75042.gif" alt="" />
    </section>

    <section className="categories">
     
        {categories.map( (record) => {
          return(<ScrollCard key={record.cat_id} id={record.cat_id} imageurl={record.img_path} imagename={record.name}/>);
        } )}
      
    </section>
   </>
  )
}
