import './../Style/Shop.css';
import AppShopItem from './ShopItem';
// import shopItemData from '../Data/ShopItemData';
import { useState, useEffect } from 'react';
import AppSearch from './Search';
import AppNotfound from './Notfound';
import {
    Link
} from "react-router-dom";
import {variables} from "../Variables";




function AppShop(){
    // const [searchText, setSearchText] = useState('');
    const [shop, setShop] = useState([]);
    const [category, setCategory] = useState(0);

    useEffect(() => {
        get_all_shop();
    }, []);

    async function get_all_shop(){
        setCategory(0);
        fetch(variables.API_URL+"get_shop", {
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

    async function search(e){
        var value = e.target.value
        fetch(variables.API_URL+"search_shop/"+value, {
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

    async function search_by_category(e, value){
        setCategory(value)
        fetch(variables.API_URL+"get_shop_by_category/"+value, {
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

    // const filterShopItem = shopItemData.filter((shopItem) =>{
    //     return shopItem.shop_name.includes(searchText)
    // });

    // const ShopItemElements = filterShopItem.map((shopItem, index) =>{
    //     return <AppShopItem key={index} shopItem={shopItem}/>
    // });

    const shop_list = shop.map((item, index) => 
    <Link to={"/ProfileShop/"+item.shop_id}>
    <div className='item_shop'>
        <div className='item_shop_img'>
            <img src="https://cwdaust.com.au/wpress/wp-content/uploads/2015/04/placeholder-store.png" alt="" />
        </div>
        <div className='item_shop_details'>
            <div className='details_name_shop'>{item.shop_name}</div>
                <div className='details_rate_shop'><img src='../img/rate.png' alt='' />-</div>
                <div className='details_address_shop'><img src='../img/address.png' alt='' />{item.location_name}</div>
        </div>
    </div>
    </Link>
    );
    
    return(
        <div className='Shop'>
            <div className='menu_shop_content'>
                <Link to='/Shop'>
                    <div className='menu_shop active_menu'>
                        <i className="fa-solid fa-shop"></i>
                        <p>Shop</p>
                    </div>
                </Link>
                <Link to='/Model'>
                    <div className='menu_shop' >
                        <i className="fa-sharp fa-solid fa-user-tie"></i>
                        <p>Model</p>
                    </div>
                </Link>
            </div>

            <div className='menu_search'>
                <input
                className="app-search-input"
                type="text"
                placeholder="Search" 
                onChange={(event) => search(event)}
                />
            </div> 
            <div className='Category-list'>
                <div className='Category-menu'><div className='Category-img'><img className={category === 1?"Category-active":""} src='../img/Eyelash extensions.png' alt='' onClick={(e) => {if(category === 1)get_all_shop(); else search_by_category(e, 1)}}></img></div><div>Eyelash extensions</div></div>
                <div className='Category-menu'><div className='Category-img'><img className={category === 2?"Category-active":""} src='../img/Hair salon.png' alt='' onClick={(e) => {if(category === 2)get_all_shop(); else search_by_category(e, 2)}}></img></div><div>Hair salon</div></div>
                <div className='Category-menu'><div className='Category-img'><img className={category === 3?"Category-active":""} src='../img/Spa salons.png' alt='' onClick={(e) => {if(category === 3)get_all_shop(); else search_by_category(e, 3)}}></img></div><div>Spa salons</div></div>
                <div className='Category-menu'><div className='Category-img'><img className={category === 4?"Category-active":""} src='../img/Nail salons.png' alt='' onClick={(e) => {if(category === 4)get_all_shop(); else search_by_category(e, 4)}}></img></div><div>Nail salons</div></div>
                <div className='Category-menu'><div className='Category-img'><img className={category === 5?"Category-active":""} src='../img/Beauty salons.png' alt='' onClick={(e) => {if(category === 5)get_all_shop(); else search_by_category(e, 5)}}></img></div><div>Beauty salons</div></div>
            </div>
            <div className='item_shop_content'>
                {shop.length === 0 || shop === null ? <AppNotfound value="ไม่พบร้านเสริมสวย"/> : shop_list}
            </div>
           
        </div>

    );
}

export default AppShop;