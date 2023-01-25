const express = require('express');
const mysql = require('mysql2');
const path = require('path');
const cors = require('cors');
const engine = require('express-engine-jsx');
const bodyParser = require('body-parser');
var fileupload = require('express-fileupload');
const app = express();
app.use(fileupload());
const port = 5000;

// ------------- db ---------------
const db = mysql.createConnection({
    host:'localhost',
    user:'root',
    password:'',
    database:'shopping'
});
db.connect( (err) => {
    if(err){
        throw err;
    }
    console.log('Database connected');
});
global.db = db;

//--------------- routes --------------
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json()); // parse form data client
app.use(cors())


//register
app.post('/register' , (req,res) => {
    const uname = req.body.uname;
    const email = req.body.email;
    const pswrd = req.body.password;
    const query1 = 'select * from `user` where email = "'+email+'"';
    const query2 = "INSERT into `user` (username , email , password) values('"+uname+"' , '"+email+"','"+pswrd+"')";
    db.query(query1 , (err,result)=>{
       if(err)
       {
         console.log(err);
        return res.json({msg:'server error'})
       }
       if(result.length != 0)
       {
        console.log('email exists');
        return res.json({msg:'email alredy registered'});
       }
       db.query(query2 , (err,result) => {
        if(err)
        {
            console.log(err);
            return res.json({msg:'server error'})
        }
        return res.json({msg:'success'});
       })
       
    })
})


//login 
app.post('/login' , (req,res) => {
    
    const email = req.body.email;
    const pswrd = req.body.password;
    const query = "select * from `user` where email = '"+email+"'";
    db.query(query , (err,result)=>{
       if(err)
       {
         console.log(err);
        return res.json({msg:'server error'})
       }
       else if(result.length == 0)
       {
        console.log('email not found');
        return res.json({msg:'email not found'})
       }else 
       {
            var crt_pswrd = result[0].password;
            if(pswrd !== crt_pswrd)
            {
                console.log('incorrect passord');
                return res.json({msg:'incorrect password'})
            }
            else{
                console.log('login successs!!');
                return res.json({msg:'success' , username:result[0].username , uid:result[0].user_id})
            }
       }
       
    })
})

//categories
app.get('/categories' , (req,res) => {
    const query = 'SELECT * from `categories`';
    db.query(query , (err , result) => {
        if(err)
        { return res.json({msg:'some error occured'})}
        //console.log(result);
        return res.json({msg:'success' , record:result});
    })
})

//itemList
app.get('/itemlist/:id',(req,res) => {
    const query1 = 'SELECT *  from `product` where `cat_id` = '+ req.params.id + '';
    const query2 = 'SELECT name from `categories` where `cat_id` = '+req.params.id + '';

    db.query(query1 , (err , result) => {
        if(err)
        {return res.json({msg:'server error'})}

        db.query(query2 , (err , cat_name) => {
            if(err) {return res.json({msg:'server error'})}

            //console.log(result , cat_name);
            return res.json({msg:'success' , record:result , catname :cat_name});
        })
    })
    
} )

//item
app.get('/item/:id' ,(req,res) => {
    const query1 = 'SELECT *  from `product` where `prdt_id` = '+ req.params.id + '';
    
    db.query(query1 , (err , result) => {
        if(err)
        {return res.json({msg:'server error'})}
            //console.log(result);
            return res.json({msg:'success' , record:result});
    })
    
} )

// add to cart
app.post('/addtocart' , (req,res) => {

    const query1 = 'SELECT * from `cart` where user_id = "'+req.body.uid+'" and prdt_id = "'+req.body.pid+'"';
    const query2 = 'INSERT INTO `cart` (`user_id` , `prdt_id` ,`size`) VALUES ('+req.body.uid+' , '+req.body.pid+' , "'+req.body.size+'")';
    
    db.query(query1 , (err , result) => {
        if(err)
        {   console.log(err);
            return res.json({msg:err})
        }
        if(result.length == 0)
        {
            db.query(query2 , (err , result) => {
                if(err){return res.json({msg:'something went wrong at q2'});}
                console.log('cart updated');
                return res.json({msg:'success'});
            })
        }else{
            var cnt = result[0].count;
            const cid = result[0].cart_id;
            cnt += 1;
            console.log(cnt)
            const query3 = 'UPDATE `cart` SET `count` = "'+ cnt +'" WHERE `cart_id` = "'+cid+'"';
            db.query(query3 , (err , result) => {
                if(err){return res.json({msg:'something went wrong at q3'});}
                console.log('cart updated');
                return res.json({msg:'success'});
            })
        }
    })
})

// cart items

app.get('/cart/:uid' , (req , res) => {
    const query1 = 'SELECT c.cart_id , c.size , c.count ,p.*  from `cart` c , `product` p  WHERE c.user_id = "'+req.params.uid+'" and c.prdt_id = p.prdt_id';
    const query2 = 'SELECT  sum(p.product_cost) as total from `cart` c , `product` p  WHERE c.user_id = "'+req.params.uid+'" and c.prdt_id = p.prdt_id';
    db.query(query1 , (err , result) => {
        if(err){ console.log(err);
            return res.json({msg:err});}

            db.query(query2 , (err , total) => {
                if(err){ console.log(err);
                    return res.json({msg:err});
                }
                console.log(result.length)
                return res.json({msg:'success' , record:result , cost:total });
                });
    })
})

//order 
app.get('/order/:cid' , (req,res) => {
    const query1 = 'SELECT *  from `cart` where `cart_id` = '+ req.params.cid + '';
    const query3 = 'DELETE from `cart` where `cart_id` = '+req.params.cid+'';
    db.query(query1 , (err , result) => {
        if(err){console.log(err); return res.json({msg:err});}
        const pid = result[0].prdt_id;
        const user_id = result[0].user_id;
        const count = result[0].count;
        const size = result[0].size;
        const query2 = 'INSERT INTO `orders` (`user_id` , `pid` ,`size` , `count`) VALUES ('+user_id+' , '+pid+' ,"'+size+'" , '+count+')';
        db.query(query2 ,(err , ress) => {
            if(err){console.log(err); return res.json({msg:err});}

            db.query(query3 ,(err , ress) => {
                if(err){console.log(err); return res.json({msg:err});}
                console.log('cart item deleted')
                return res.json({msg:'success'});
            })
        })
    })


})
// order item
app.get('/cartitem/:id' ,(req,res) => {
    const query1 = 'SELECT *  from `cart` where `cart_id` = '+ req.params.id + '';
    
    db.query(query1 , (err , result) => {
        if(err)
        {return res.json({msg:'server error'})}
        if(result.length == 0)
        {return res.json({msg:'this product is not added to cart'})}
        const pid = result[0].prdt_id;
    
        const query2 = 'SELECT *  from `product` where `prdt_id` = '+ pid + '';
    
        db.query(query2 , (err , reSS) => {
            if(err)
            {return res.json({msg:err})}
                return res.json({msg:'success' , item:reSS});
        })
    

    })
    
} )
// ----------- server -------------

app.set('port', process.env.port || port);
app.listen(port , () => {
    console.log(`server running on port: ${port}`);
});