import './../Style/Notification.css';import { useState, useEffect } from "react";
import {
    Link,
    useNavigate
} from "react-router-dom";
import {variables} from "../Variables";
import React from 'react';
import Swal from 'sweetalert2'
import withReactContent from 'sweetalert2-react-content'

function AppNotification() {
    const [order, setOrder] = useState([]);
    const [shop, setShop] = useState([]);
    const navigate = useNavigate();

    useEffect(() => {
        console.log(localStorage.getItem('id'))
        if(localStorage.getItem('id') === "undefined" || localStorage.getItem('id') === null){
            navigate("/SingIn");
        }else{
            fetch(variables.API_URL+"get_order_user_noti/"+localStorage.getItem("id"), {
                method: "GET",
                headers: {
                    'Accept': 'application/json, text/plain',
                    'Content-Type': 'application/json;charset=UTF-8'
                },
                })
                .then(response => response.json())
                .then(result => {
                    console.log(result)
                    setOrder(result)
                }
            )
            fetch(variables.API_URL+"get_order_shop_noti/"+localStorage.getItem("id"), {
                method: "GET",
                headers: {
                    'Accept': 'application/json, text/plain',
                    'Content-Type': 'application/json;charset=UTF-8'
                },
                })
                .then(response => response.json())
                .then(result => {
                    console.log(result)
                    setShop(result)
                }
            )
        }
    }, []);

    async function handleOrderDetail(e, arr, value){
        const MySwal = withReactContent(Swal);
        for (let index = 0; index < arr.length; index++) {
            const element = arr[index];
            if(element.order_id === value){
                MySwal.fire({
                    html: 
                    <>
                    <h2>Shop Name : {element.shop_name}</h2>
                    <h3>{element.firstname?"Customer : "+element.firstname+" "+element.lastname:''}</h3>
                    {element.order_detail.map((item_, index) => (
                        <div className="PS_menu_box">
                            <div className="PS_menu_img">
                                <img src="https://www.aloexhair.com/wp-content/uploads/2018/06/shutterstock_708886852.jpg" alt=""></img>
                            </div>
                            <div className="PS_menu_details">
                                <div className="PS_menu_name">{item_.menu_name}</div>
                                <div className="PS_menu_price">ราคา {item_.price} B</div>
                            </div>
                        </div>
                    ))}
                    <span>Total Price : {element.total_price}</span><br/>
                    <span>Order Time : {element.order_time.replace("T", " ").replace(".000Z", "")}</span>
                    </>,
                    confirmButtonColor: "#FF9898"
                }).then(() => {
                    // window.location.reload(false);
                })
            }
        }
    }

    async function handleGotoPayment(e, value){
        navigate('/Payment/'+value)
    }

    async function handleGotoConfirm(e, value){
        navigate('/Confirm/'+value+"/0")
    }

    if(order.length > 0 && shop.length > 0){
        const order_list = order.map((item, index) => (
            <tr key={index}>
              <td>{item.create_time.replace("T", " ").replace(".000Z", " ")}</td>
              <td><button onClick={(e)=>{handleOrderDetail(e, order, item.order_id)}}> Click to See Detail </button></td>
              <td>{item.status}</td>
              <td>
                <button className='pink' onClick={(e)=>{handleGotoPayment(e, item.order_id)}}> Go to Payment </button>
              </td>
            </tr>
        ));

        const shop_list = shop.map((item, index) => (
            <tr key={index}>
                <td>{item.shop_name}</td>
                <td>{item.create_time.replace("T", " ").replace(".000Z", " ")}</td>
                <td><button onClick={(e)=>{handleOrderDetail(e, shop, item.order_id)}}> Click to See Detail </button></td>
                <td>{item.status}</td>
                <td>
                    <button className='pink' onClick={(e)=>{handleGotoConfirm(e, item.order_id)}}> Go to Confirm </button>
                </td>
            </tr>
        ));

        return(
            <>
            <div className="history">
                <h1>User Notification</h1>
                <div className='history-table'>
                    <table>
                        <thead>
                            <tr>
                                <th>Date Time</th>
                                <th>Deatils</th>
                                <th>Status</th>
                                <th>Action</th>
                            </tr>
                        </thead>
                        <tbody>
                            {order.length !== 0?order_list:''}
                        </tbody>
                    </table>
                </div>
            </div>
            <div className="history">
                <h1>Shop Notification</h1>
                <div className='history-table'>
                    <table>
                        <thead>
                            <tr>
                                <th>Shop</th>
                                <th>Date Time</th>
                                <th>Deatils</th>
                                <th>Status</th>
                                <th>Action</th>
                            </tr>
                        </thead>
                        <tbody>
                            {shop.length !== 0?shop_list:''}
                        </tbody>
                    </table>
                </div>
            </div>
            </>
        );
    }
    else if(order.length <= 0 && shop.length > 0){
        const shop_list = shop.map((item, index) => (
            <tr key={index}>
                <td>{item.shop_name}</td>
                <td>{item.create_time.replace("T", " ").replace(".000Z", " ")}</td>
                <td><button onClick={(e)=>{handleOrderDetail(e, shop, item.order_id)}}> Click to See Detail </button></td>
                <td>{item.status}</td>
                <td>
                    <button className='pink' onClick={(e)=>{handleGotoConfirm(e, item.order_id)}}> Go to Confirm </button>
                </td>
            </tr>
        ));

        return(
            <>
            <div className="history">
                <h1>User Notification</h1>
                <div className='history-table'>
                    <table>
                        <thead>
                            <tr>
                                <th>Date Time</th>
                                <th>Deatils</th>
                                <th>Status</th>
                                <th>Action</th>
                            </tr>
                        </thead>
                        <tbody>
                        </tbody>
                    </table>
                </div>
            </div>
            <div className="history">
                <h1>Shop Notification</h1>
                <div className='history-table'>
                    <table>
                        <thead>
                            <tr>
                                <th>Shop</th>
                                <th>Date Time</th>
                                <th>Deatils</th>
                                <th>Status</th>
                                <th>Action</th>
                            </tr>
                        </thead>
                        <tbody>
                            {shop.length !== 0?shop_list:''}
                        </tbody>
                    </table>
                </div>
            </div>
            </>
        );
    }
    else if(order.length > 0 && shop.length <= 0){
        const order_list = order.map((item, index) => (
            <tr key={index}>
              <td>{item.create_time.replace("T", " ").replace(".000Z", " ")}</td>
              <td><button onClick={(e)=>{handleOrderDetail(e, order, item.order_id)}}> Click to See Detail </button></td>
              <td>{item.status}</td>
              <td>
                <button className='pink' onClick={(e)=>{handleGotoPayment(e, item.order_id)}}> Go to Payment </button>
              </td>
            </tr>
        ));

        return(
            <>
            <div className="history">
                <h1>User Notification</h1>
                <div className='history-table'>
                    <table>
                        <thead>
                            <tr>
                                <th>Date Time</th>
                                <th>Deatils</th>
                                <th>Status</th>
                                <th>Action</th>
                            </tr>
                        </thead>
                        <tbody>
                            {order.length !== 0?order_list:''}
                        </tbody>
                    </table>
                </div>
            </div>
            <div className="history">
                <h1>Shop Notification</h1>
                <div className='history-table'>
                    <table>
                        <thead>
                            <tr>
                                <th>Shop</th>
                                <th>Date Time</th>
                                <th>Deatils</th>
                                <th>Status</th>
                                <th>Action</th>
                            </tr>
                        </thead>
                        <tbody>
                        </tbody>
                    </table>
                </div>
            </div>
            </>
        );
    }
    else{
        return(
            <>
            <div className="history">
                <h1>User Notification</h1>
                <div className='history-table'>
                    <table>
                        <thead>
                            <tr>
                                <th>Date Time</th>
                                <th>Deatils</th>
                                <th>Status</th>
                                <th>Action</th>
                            </tr>
                        </thead>
                        <tbody>
                        </tbody>
                    </table>
                </div>
            </div>
            <div className="history">
                <h1>Shop Notification</h1>
                <div className='history-table'>
                    <table>
                        <thead>
                            <tr>
                                <th>Shop</th>
                                <th>Date Time</th>
                                <th>Deatils</th>
                                <th>Status</th>
                                <th>Action</th>
                            </tr>
                        </thead>
                        <tbody>
                        </tbody>
                    </table>
                </div>
            </div>
            </>
            );
    }
}

export default AppNotification;