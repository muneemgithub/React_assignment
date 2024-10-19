import { Box, Card, Divider, Snackbar, SnackbarContent, Typography } from '@mui/material'
import React, { useState } from 'react'
import Product1 from "../../Assests/card-grain.jpg"
import Product2 from "../../Assests/card-fresh.jpg"
import Product3 from "../../Assests/banner-2.jpg"
import "./product.css";
import ShareIcon from '@mui/icons-material/Share';
import FavoriteIcon from '@mui/icons-material/Favorite';
import ShoppingCartIcon from '@mui/icons-material/ShoppingCart';
import CloseIcon from '@mui/icons-material/Close';

const dummyProducts = [
    {
    id: 1,
    img: Product1,
    name: "Product 1",
    price: "10",
},
{
    id: 2,
    img: Product2,
    name: "Product 2",
    price: "12",
},
{
    id: 3,
    img: Product3,
    name: "Product 3",
    price: "8",   
}
]
export const Products = () => {
    const [CardList, setCardList] = useState([]);
    const [openAlert, setOpenAlert] = useState(false)
    
    const cartHandler = (product) => {
        const isExist = CardList.find((cart)=> cart.id === product.id
        );
        if(!isExist){

            setCardList((prev)=>[ ...prev, product]);
            
                let strCardList = JSON.stringify(CardList)
                localStorage.setItem("CardList", strCardList);
            
        } else {
            setOpenAlert(true)
        }   
    };
    const handleClose = (event, reason) => {
        if (reason === 'clickaway') {
          return;
        }
    
        setOpenAlert(false);
      };

   
  return (
    <>
          <Snackbar
         anchorOrigin={{ vertical:"top", horizontal:"right" }}
        open={openAlert}
        autoHideDuration={6000}
        onClose={handleClose}
        message=""
      >
        <SnackbarContent 
        style={{
            backgroundColor:"#bb2124",
        }}
        message={
            <Box  className="d-flex justify-content-between">
        <span id="client-snackbar">Product already in cart list</span>
        <CloseIcon sx={{float:"right"}} onClick={handleClose}/>
        </Box>
    }
        />
      </Snackbar>

        <Box sx={{display:"flex", gap:"30px",}} className="container mt-3">

    {
        dummyProducts?.map((product, index)=> {
            // console.log(product);
            
            return(
              <Card  key={index} sx={{padding:"20px", cursor:"pointer", minHeight:"180px", width:"250px"}}>
        <Box>
            <Box className="text-center" >
            <img className="product-image"  width={200}  src={product.img} alt={`${product.name}`} />
            </Box>
            <Typography variant='h5' className='mt-3'>{product.name}</Typography>
            <Divider sx={{borderColor:"#333"}} variant='fullWidth'/>
            <Box className="d-flex justify-content-between mt-2" >
            <ShareIcon/>
            <FavoriteIcon/>
            <ShoppingCartIcon onClick={() => {
                cartHandler(product);
            }}/>
            </Box>
        </Box>
    </Card>
            );
        })
    }
    </Box>
  
    </>
  )
}
