import React , {useState , useEffect} from 'react'
import { useNavigate, useSearchParams } from 'react-router-dom';
import { host } from '../../../utils/APIRoutes';
import '../Order/Order.css'
import imgs from '../../assets/images/products/slim1.webp'

export default function Item() {
    const [user ,setuser]= useState('undefined');
    const [uid, setuid] = useState();
    const [img, setimg] = useState('');
    const [cart_id , setcart_id] = useState();
    const [adress, setadress] = useState('');
    const [item, setitem] = useState([]);
    const navigate = useNavigate();

    const handleview = (e) => {
        e.preventDefault();
        navigate({
            pathname:'/cart/',
            search:`?id=${uid}`
          });
    }
    
    const handleUser =(e) => {
            e.preventDefault();
            setadress(' ')
            const params = new URLSearchParams(window.location.search);
            const cid = params.get('cid');

            fetch(`${host}/order/`+cid+'')
            .then(data => data.json())
            .then(data => {
                if(data.msg == 'success')
                {
                    alert('order placed  🎉 !! order will be delivered to your address once payment completed ');
                    return;
                }else{alert('error');return;}
            })
        }
     
    useEffect( () => {
        var mount = true;
        if(mount === true)
        {
            const params = new URLSearchParams(window.location.search);
            const id = params.get('cid');
            setcart_id(id);
            fetch(`${host}/cartitem/`+id+'')
            .then(data => data.json())
            .then(data => {
                if(data.msg == 'success')
                {
                    setitem(data.item[0]);
                    setimg(data.item[0].img_path)
                    console.log("p" ,data.item[0]);
                }else{console.log(data.msg);}
            })
        }
        return () => {mount = false};
    }, [cart_id ]);
    
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

  return (
     <>
        <section className="nav">
        <button className='back' onClick={() => navigate(-1)}>←</button>
        <button onClick={handleview} className="view">View Cart</button>
        {item?<h4  className="name">{item.product_name}</h4>:<h3>GRABCART</h3> } 
        {user === 'undefined'?  <button className="user" onClick={() => navigate('/login')}>Login</button> : <p className='user'>👤 {user}</p>}
        </section>

        <section className="image">  
                <div className="pname">{item.product_name}</div>
                {/* <img src={imgs} alt="" className="pimg" /> */}
                <div className="sbox">
                    <button className="b"  >₹{item.product_cost}.0</button>
                </div>
                <div className="ptext">
                <p className="p"> *Free Delivery</p>
                <p className="p">*10 days return policy</p>
                </div>
                <button className="porder"> GREAT CHOICE 🎉</button>
            </section>

        <form className ="wrap" onSubmit={(e) => handleUser(e)} >
            <button className="tag">USER ADDRESS</button>
            <div className="address">
                <input type="text" className='adrs' name="address" value={adress} onChange={(e) => setadress(e.target.value)}  placeholder='Enter your address to place order'/>
                <button className='btn' type="submit" id="submit"  >SUBMIT</button>
            </div>
        </form>
        </>
  )
}
 