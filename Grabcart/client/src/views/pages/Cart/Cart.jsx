import {React , useState , useEffect} from 'react';
import { host } from '../../../utils/APIRoutes';
import { Link ,useNavigate } from 'react-router-dom';
import '../Cart/Cart.css'
import CartCard from '../../Components/CartCart/CartCard';

const Cart = () => {
    const [user ,setuser]= useState('undefined');
    const [uid, setuid] = useState();
    const [items, setitems] = useState([]);
    const [cost, setcost] = useState();
    const navigate = useNavigate();

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

    useEffect( () => {
        var mount = true;
        if(mount === true)
        {
            var uid = localStorage.getItem('username');
            if(uid === "undefined")
            {
                alert('login to view the cart');
                navigate('/login');
                return;
            }
            const params = new URLSearchParams(window.location.search);
            const id = params.get('id');
            
            setuid(id);
            fetch(`${host}/cart/`+id)
            .then(data => data.json())
            .then(data => {
                if(data.msg == 'success')
                {
                    console.log(data);
                    setcost(data.cost[0].total)
                    setitems(data.record);
                }else{console.log(data.msg);}
            })
        }
        return () => {mount = false};
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
            <button className='back' onClick={() => navigate(-1)}>←</button>
            <div className="title">{user.toUpperCase()}'S CART 🛒</div>
            {user === 'undefined'?  <button><Link to="/login" className="user">Login</Link></button> : <><p className='user'>👤 {user}</p> <button onClick={handleLogout}>Logout</button> </>}
            </section>
            <button className="total">Total cost : ₹{cost}</button>
            <section className="cartitems">
                {items.map( (records ,id) => {
                return(<CartCard key={id} msg='ORDER NOW ✅' record={records}/>);
                } )}
            </section>
        </>
    );
}

export default Cart;
