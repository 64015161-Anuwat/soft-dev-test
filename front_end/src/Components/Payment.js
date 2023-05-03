import './../Style/EditProfile.css';
import { Link, useParams, useNavigate } from "react-router-dom";
import { useState, useEffect } from "react";
import {variables} from "../Variables";
import Swal from 'sweetalert2'
import withReactContent from 'sweetalert2-react-content'

function AppPayment(){
    const [price, setPrice] = useState(0);
    const [order, setOrder] = useState('');
    const { id } = useParams();
    const navigate = useNavigate();

    useEffect(() => {
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

    async function handleSubmit(e){
        const MySwal = withReactContent(Swal);
        e.preventDefault();
        if(price.toString() !== order.total_price.toString()){
            MySwal.fire({
                html: 
                    '<p style="text-align: left; margin: 0 auto;max-width: fit-content;">'+
                    'ยอดเงินไม่ตรงกัน'+
                    '</p>',
                icon: "error",
                confirmButtonColor: "#F07221"
            })
        }else{
            fetch(variables.API_URL+"pay_order", {
                method: "POST",
                headers: {
                    'Accept': 'application/json, text/plain',
                    'Content-Type': 'application/json;charset=UTF-8'
                },
                body: JSON.stringify({
                    id: id,
                    price: price
                }),
                })
                .then(response => response.json())
                .then(result => {
                    if(result.msg){
                        MySwal.fire({
                            html: <p>{result.msg}</p>,
                            icon: "success",
                            confirmButtonColor: "#F07221"
                        }).then(() => {
                            navigate("/confirm/"+id+"/1");
                        })
                    } 
                    else{
                        MySwal.fire({
                            html: 
                                '<p style="text-align: left; margin: 0 auto;max-width: fit-content;">'+
                                result.error+
                                '</p>',
                            icon: "error",
                            confirmButtonColor: "#F07221"
                        })
                    }
                }
            )
        }
    }

    async function handleCancel(e){
        const MySwal = withReactContent(Swal);
        e.preventDefault();
        
        fetch(variables.API_URL+"cancel_order", {
            method: "POST",
            headers: {
                'Accept': 'application/json, text/plain',
                'Content-Type': 'application/json;charset=UTF-8'
            },
            body: JSON.stringify({
                id: id
            }),
            })
            .then(response => response.json())
            .then(result => {
                if(result.msg){
                    MySwal.fire({
                        html: <p>{result.msg}</p>,
                        icon: "success",
                        confirmButtonColor: "#F07221"
                    }).then(() => {
                        navigate("/History");
                    })
                } 
                else{
                    MySwal.fire({
                        html: 
                            '<p style="text-align: left; margin: 0 auto;max-width: fit-content;">'+
                            result.error+
                            '</p>',
                        icon: "error",
                        confirmButtonColor: "#F07221"
                    })
                }
            }
        )
        
    }

    if(order.id){
        return(
            <div className='EditProfile'>
                <div className="contianer-ED">
                    <div className="ED-frame">
                        <form id="ED-form" onSubmit={(e)=>{handleSubmit(e)}}>
                            <span className="topic-ED">
                            Payment<br />
                            </span>
                            <span className="topic-ED">
                            total_price : {order.total_price} B<br />
                            </span>
                            <div className="input-frame">
                            <div className="input-frame">
                                <input className="input" id="register-FirstName" type="number"
                                placeholder="First Name" value={price} onChange={(e) => setPrice(e.target.value)} required/>
                                <span className="symbol">
                                    <i className="fa-solid fa-wallet"></i>
                                </span>
                            </div>
                            <div className="submit-frame">
                                <input id="submit" type="submit" value="submit" />
                                <div className='cancel' onClick={(e)=>{handleCancel(e)}}><center>Cancel</center></div>
                            </div>
                            </div>
                        </form>
                    </div>
                </div>
            </div>
            );
    }
}

export default AppPayment;