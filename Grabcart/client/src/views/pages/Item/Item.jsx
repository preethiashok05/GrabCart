import React , {useState , useEffect} from 'react'
import { useNavigate, useSearchParams } from 'react-router-dom';
import { host } from '../../../utils/APIRoutes';
import '../Item/Item.css'
import imgs from '../../assets/images/products/slim1.webp'
export default function Item() {
    const [user ,setuser]= useState('undefined');
    const [uid, setuid] = useState();
    const [prdt_id, setprdt_id] = useState();
    const [item, setitem] = useState({});
    const [img, setimg] = useState("");
    const [size, setsize] = useState("$");
    const navigate = useNavigate();

    const handleview = (e) => {
        e.preventDefault();
        navigate({
            pathname:'/cart/',
            search:`?id=${uid}`
          });
    }
    useEffect( () => {
        var mount = true;
        if(mount === true)
        {
            const params = new URLSearchParams(window.location.search);
            const id = params.get('id');
            setprdt_id(id);
            fetch(`${host}/item/`+id+'')
            .then(data => data.json())
            .then(data => {
                if(data.msg == 'success')
                {
                    setitem(data.record[0]);
                    setimg(data.record[0].img_path)
                    console.log(data.record[0]);
                }else{console.log(data.msg);}
            })
        }
        return () => {mount = false};
    }, [prdt_id , img]);

    useEffect(() => {
        var mount = true;
         if(mount === true)
         { const username = localStorage.getItem("username");
            const usrid = localStorage.getItem('uid');
           if (username !== "null") 
           { setuser(username); setuid(usrid);}
           else{ setuser('undefined')}}

           return () => {mount = false}  
       }, [user]);
    
    const handleCart = (e) =>{
        e.preventDefault();

        if(user === 'undefined')navigate('/login');
        if(size === "$"){
            alert('select the size');
            return;
        }
        const uid = localStorage.getItem('uid');
        const data = {
            'uid':uid,
            'pid':prdt_id,
            'size':size,
        }
        fetch(`${host}/addtocart` , { method:'post', headers:{'Accept':'application/json' , 'Content-Type':'application/json'} , body:JSON.stringify(data) })
        .then(data => data.json())
        .then(data => {
            console.log(data.msg)
            if(data.msg === 'success')
            {
                alert('cart updated');
                return;
            }else{
                alert('something went wrong ,try again');
                return;
            }
        } )
     
    }

  return (
     <>
        <section className="nav">
        <button className='back' onClick={() => navigate(-1)}>←</button>
        <button onClick={handleview} className="view">View Cart</button>
        {item?<h4  className="name">{item.product_name}</h4>:<h3>GRABCART</h3> } 
        {user === 'undefined'?  <button className="user" onClick={() => navigate('/login')}>Login</button> : <p className='user'>👤 {user}</p>}
        </section>
        <section className="pic">
        {/* <img  alt="*productimage" src={imgs} className="image" /> */}
        </section>
        <div className="size">
            <button onClick={(e) => {setsize("XS")}} className="small">XS</button>
            <button onClick={(e) => {setsize("S")}}  className="small">S</button>
            <button onClick={(e) => {setsize("M")}} className="small">M</button>
            <button onClick={(e) => {setsize("L")}}  className="small">L</button>
            <button onClick={(e) => {setsize("XL")}} className="small">XL</button>
            <button className="cost"> ₹ {item.product_cost}.0</button>
        </div>
        <div className="details">{item.product_details}</div>
        <button onClick={handleCart} className="cart">Add to Cart</button>
        <section className="review">Reviews</section>
        </>
  )
}
