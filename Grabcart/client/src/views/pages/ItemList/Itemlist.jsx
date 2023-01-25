import {React , useState , useEffect} from 'react';
import { host } from '../../../utils/APIRoutes';
import { useNavigate } from 'react-router-dom';
import Itemcard from '../../Components/ItemCard/Itemcard';
import '../ItemList/itemlist.css'


const Itemlist = () => {
    const [user ,setuser]= useState('undefined');
    const [items, setitems] = useState([]);
    const [catid, setcatid] = useState();
    const [catname, setcat_name] = useState('$');
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
            const params = new URLSearchParams(window.location.search);
            const id = params.get('id');
            setcatid(id);
            fetch(`${host}/itemlist/`+id+'')
            .then(data => data.json())
            .then(data => {
                if(data.msg == 'success')
                {
                    setitems(data.record);
                    console.log("inside ",data.record);
                    setcat_name(data.catname[0].name);
                }else{console.log(data.msg);}
            }).then(console.log( "items" , items))
        }
        return () => {mount = false};
    }, []);

    return (
        <>
            <section className="nav">
            <button className='back' onClick={() => navigate(-1)}>←</button>
            {catname === 'null' ?<h3>GRABCART</h3> : <h3 className="title">{catname}</h3> } 
            {user === 'undefined'?  <button className="user">Login</button> : <p className='user'>👤 {user}</p>}
            </section>
            <section className="gender">
                <button className="g">WOMEN</button>
                <button className="g">MEN</button>
            </section>
            <section className="items">

                {items.length > 0 ?items.map( (records) => {
                return(<Itemcard key={records.prdt_id}  ids={records.prdt_id} records={records}/>);
                } ) : <h3>No products found !! shop another category .. </h3>}
            </section>
            
        </>
    );
}

export default Itemlist;
