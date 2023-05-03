import './../Style/EditProfile.css';
import "./../Style/ProfileShop.css";
import io from 'socket.io-client';
import { Link, useParams, useNavigate } from "react-router-dom";
import { useState, useEffect } from "react";
import {variables} from "../Variables";
import Swal from 'sweetalert2'
import withReactContent from 'sweetalert2-react-content'

const socket = io('http://localhost:5001');
const socket0 = io('http://localhost:5001');

function AppConfirm(){
    const {id, start} = useParams();
    const [input, setInput] = useState('');
    const [messages, setMessages] = useState('');
    const [time, setTime] = useState('');
    const [order, setOrder] = useState(null);
    const MySwal = withReactContent(Swal);
    const navigate = useNavigate();

    useEffect(()=>{
        console.log(id)
        console.log(start)
        socket.emit('join', id);

        if(start === '1'){
            socket0.emit('join', id);
            socket0.emit('start', id);
        }

        // Listen for event from the server
        socket.on('time', (message) => {
            setTime(message)
        });

        socket.on('cancel', (message) => {
            setMessages(message)
        });

        socket.on('confirm', (message) => {
            setMessages(message)
        });

        socket.on('msg', (message) => {
            setMessages(message)
            if(message === 'Cancel Order!'){
                MySwal.fire({
                    html: 
                        '<p style="text-align: left; margin: 0 auto;max-width: fit-content;">'+
                        message+
                        '</p>',
                    icon: "error",
                    confirmButtonColor: "#F07221"
                }).then(() => {
                    navigate("/history")
                });
            }else{
                MySwal.fire({
                    html: <p>{message}</p>,
                    icon: "success",
                    confirmButtonColor: "#F07221"
                }).then(() => {
                    navigate("/history")
                });
            }
        });

        socket0.on('cancel', (message) => {
            console.log(0)
            socket0.emit('cancel', id);
        });

        socket0.on('confirm', (message) => {
            console.log(0)
            socket0.emit('confirm', id);
        });

        fetch(variables.API_URL+"get_order/"+id, {
            method: "GET",
            headers: {
                'Accept': 'application/json, text/plain',
                'Content-Type': 'application/json;charset=UTF-8'
            },
            })
            .then(response => response.json())
            .then(result => {
                console.log(result)
                if(result.length > 0){
                    setOrder(result[0])
                }
            }
        )
    }, [])

    async function sendConfirm() {
        // Emit event to the server
        if(start === '1'){
        socket0.emit('confirm', id);
        } else
        socket.emit('confirm_', id);
        // window.location.replace(window.location.origin)
    }

    async function sendCancel() {
        // Emit event to the server
        if(start === '1'){
        socket0.emit('cancel', id);
        } else
        socket.emit('cancel_', id);
        // window.location.replace(window.location.origin)
    }

    if(order !== null){
        return (
            <div className='EditProfile'>
                <div className="contianer-ED">
                    <div className="ED-frame">
                        <div id="ED-form" >
                            {order.create_by.toString() === localStorage.getItem('id').toString()?<span className="topic-ED">Customer Wait for Confirm Order<br/></span>:<span className="topic-ED">Wait Shop for Confirm Order<br/></span>}
                            <span className="topic-ED">
                            {time}<br />
                            </span>
                            {order.order_detail.map((item_, index) => (
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
                            <span className='total'>
                                total Price : {order.total_price}
                            </span>
                            <span className='total'>
                                Order Time : {order.order_time.replace("T", " ").replace(".000Z", "")}
                            </span>
                            <div>
                                <button className='cancel_btn' onClick={(e)=>{sendCancel(e)}}>cancel</button>
                                {order.create_by.toString() === localStorage.getItem('id').toString()?<button className='confirm_btn' onClick={(e)=>{sendConfirm(e)}}>confirm</button>:''}
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        );
    }
    
}

export default AppConfirm;
