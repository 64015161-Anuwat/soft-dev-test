import { Link, useNavigate  } from 'react-router-dom';
import './../Style/ShopUser.css';
import AppShowShop from './ShowShop';
import { useState, useEffect } from 'react';
import AppSearch from './Search';
import AppNotfound from './Notfound';
import {variables} from "../Variables";

function AppShopUser(){
    const [shop, setShop] = useState([]);
    const navigate = useNavigate();

    useEffect(() => {
        console.log(localStorage.getItem('id'))
        if(localStorage.getItem('id') === "undefined" || localStorage.getItem('id') === null){
            navigate("/SingIn");
        }
        else{
            fetch(variables.API_URL+"get_shop_by_user/"+localStorage.getItem('id'), {
                method: "GET",
                headers: {
                    'Accept': 'application/json, text/plain',
                    'Content-Type': 'application/json;charset=UTF-8'
                },
                })
                .then(response => response.json())
                .then(result => {
                    console.log(result)
                    setShop(result);
                }
            )
        }
    }, [])

    return(
        <div className='ShopUser_menu_content'>
            <Link to='/CreateShop'>
                <div className="CS_menu_button">
                            CREATE SHOP
                </div>
            </Link>
            <div className='ShowShop'>
                <div className='shop_menu'>
                    <ul className='shop_menu_item'>
                        {shop.length !== 0 && !shop.error?shop.map((item, index) => 
                        <li>
                            <Link to={"/ProfileShop/"+item.shop_id} className='nav-links'>
                                <img src="https://cwdaust.com.au/wpress/wp-content/uploads/2015/04/placeholder-store.png" alt="" />
                                <div className='title'>{item.shop_name}</div></Link><Link to={"/EditShop/"+item.shop_id} className='nav-links'><i className="fa-solid fa-pen "></i>
                            </Link>
                        </li>
                        ):<li>Shop not found...</li>}
                    </ul>
                </div>
            </div>
        </div>
    );

}

export default AppShopUser;