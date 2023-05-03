import { Link } from 'react-router-dom';

import './../App.css';
import './../Style/Model.css';
import AppSearch from './Search';
import { useState, useEffect } from 'react';
// import modelItemData from '../Data/ModelItemData';
import AppModelItem from './ModelItem';
import AppNotfound from './Notfound';
import {variables} from "../Variables";

function AppModel(){
    const [searchText,setSearchText] = useState('');
    const [user, setUser] = useState([]);

    useEffect(() => {
        fetch(variables.API_URL+"get_user", {
            method: "GET",
            headers: {
                'Accept': 'application/json, text/plain',
                'Content-Type': 'application/json;charset=UTF-8'
            },
            })
            .then(response => response.json())
            .then(result => {
                console.log(result)
                setUser(result);
            }
        )
    }, []);

    async function search(e){
        var value = e.target.value
        fetch(variables.API_URL+"search_user/"+value, {
            method: "GET",
            headers: {
                'Accept': 'application/json, text/plain',
                'Content-Type': 'application/json;charset=UTF-8'
            },
            })
            .then(response => response.json())
            .then(result => {
                console.log(result)
                setUser(result);
            }
        )
    }

    // const filtermodelItem = modelItemData.filter((modelItem) =>{
    //     return modelItem.model_name.includes(searchText)
    // });

    // const modelItemElements = filtermodelItem.map((modelItem, index) =>{
    //     return <AppModelItem key={index} modelItem={modelItem}/>
    // });

    const user_list = user.map((item, index) => 
    <Link to={"/ProfileModel/"+item.user_id}>
    <div className='item_model'>
        <div className='item_model_img'>
            <img src="https://st3.depositphotos.com/6672868/13701/v/450/depositphotos_137014128-stock-illustration-user-profile-icon.jpg" alt="" />
        </div>
        <div className='item_model_details'>
            <div className='details_name_model'>{item.firstname+" "+item.lastname}</div>
                <div className='details_rate_model'><img src='../img/rate.png' alt='' />-</div>
                <div className='details_address_model'><img src='../img/address.png' alt='' />{item.location_name}</div>
        </div>
    </div>
    </Link>
    );

    return(
        <div className='model'>
            <div className='menu_model_content'>
                <Link to='/Shop'>
                    <div className='menu_model'>
                        <i className="fa-solid fa-model"></i>
                        <p>Shop</p>
                    </div>
                </Link>
                <Link to='/Model'>
                    <div className='menu_model active_menu' >
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
            <div className='item_model_content'>
                {user.length === 0 ? <AppNotfound value="ไม่พบ Model"/>:user_list}
            </div>
           
        </div>
    );
}

export default AppModel;