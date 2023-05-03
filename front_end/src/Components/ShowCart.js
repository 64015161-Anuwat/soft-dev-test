import { Link, useParams } from 'react-router-dom';
import './../Style/ShopUser.css';
import AppShowShop from './ShowShop';
import { useState, useEffect } from 'react';
import AppSearch from './Search';
import AppNotfound from './Notfound';
import {variables} from "../Variables";

function AppShopCart(){
    const [shop, setShop] = useState([])
    const {cart} = useParams();

    useEffect(() => {
        console.log(cart)
        // fetch(variables.API_URL+"get_shop_by_user/"+localStorage.getItem('id'), {
        //     method: "GET",
        //     headers: {
        //         'Accept': 'application/json, text/plain',
        //         'Content-Type': 'application/json;charset=UTF-8'
        //     },
        //     })
        //     .then(response => response.json())
        //     .then(result => {
        //         console.log(result)
        //         setShop(result);
        //     }
        // )
    }, [])

    return(
        <div className="history">
            <h1>Service History</h1>
            <div className='history-table'>
                <table>
                    <thead>
                        <tr>
                            <th>Deatils</th>
                            <th>Date/Time</th>
                            <th>Type</th>
                            <th>Status</th>
                            <th>To Review</th>
                        </tr>
                    </thead>
                    <tbody>
                        {
                        <tr>
                            <td>
                            testtesttesttesttesttesttest
                            testtesttesttest
                            </td>
                            <td>
                            testtesttesttesttest
                            </td>
                            <td>
                                test
                            </td>
                            <td>
                                test
                            </td>
                            <td>
                                -
                            </td>
                        </tr>
                        }
                    </tbody>
                </table>
            </div>
        </div>
    );

}

export default AppShopCart;