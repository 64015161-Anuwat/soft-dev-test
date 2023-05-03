import { Link, useParams, useNavigate } from "react-router-dom";
import "./../Style/ProfileShop.css";
import { useState, useEffect } from "react";
import {variables} from "../Variables";
import Swal from 'sweetalert2'
import withReactContent from 'sweetalert2-react-content'

function AppProfileShop(){
    const [PS_add_click,PS_add_setClick] = useState(false);
    const PS_add_handleClick = () => PS_add_setClick(!PS_add_click);
    const { id } = useParams();
    const [shop, setShop] = useState([]);
    const [cart, setCart] = useState([]);
    const [state, setState] = useState(0);
    const [total_price, setTotal_price] = useState(0);
    const [order_time, setOrder_time] = useState(null);
    const navigate = useNavigate();
    // const [PS_edit_click,PS_edit_setClick] = useState(false);
    // const PS_edit_handleClick = () => PS_edit_setClick(!PS_edit_click);

    useEffect(() => {
        console.log(localStorage.getItem('id'))
        if(localStorage.getItem('id') === "undefined" || localStorage.getItem('id') === null){
            navigate("/SingIn");
        }else{
            console.log(id)
            fetch(variables.API_URL+"get_shop/"+id, {
                method: "GET",
                headers: {
                    'Accept': 'application/json, text/plain',
                    'Content-Type': 'application/json;charset=UTF-8'
                },
                })
                .then(response => response.json())
                .then(result => {
                    console.log(result)
                    setShop(result[0])
                }
            )
        }
    }, []);

    async function handleCart(e, value, state){
        console.log(cart)
        console.log(total_price)
        var t_price = total_price
        if(state === 0){
            let array = shop.menu.filter(item => item.menu_id === value)
            setCart([...cart, array[0]].sort())
            setTotal_price(t_price += array[0].price)
            
        }else{
            let array = [...cart];
            setTotal_price(t_price -= array[value].price)
            array.pop(value);
            setCart(array);
        }
    }

    async function handleOrderNow(e){
        const MySwal = withReactContent(Swal);
        e.preventDefault();
        console.log(order_time)
        fetch(variables.API_URL+"create_order", {
            method: "POST",
            headers: {
                'Accept': 'application/json, text/plain',
                'Content-Type': 'application/json;charset=UTF-8'
            },
            body: JSON.stringify({
                user_id: localStorage.getItem('id'),
                shop_id: shop.shop_id,
                total_price: total_price,
                order_time: order_time,
                menu: cart
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
                        navigate("/payment/"+result.order_id);
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

    if(shop.id){
        const category_list = shop.category.map((item, index) => 
        <span>
            {item.category_name}{index === shop.category.length-1?'':','}
        </span>
        );

        const menu_list = shop.menu.map((item, index) => 
        <span>
            <div className="PS_menu_box">
                <div className="PS_menu_img"><img src="https://www.aloexhair.com/wp-content/uploads/2018/06/shutterstock_708886852.jpg" alt=""></img></div>
                <div className="PS_menu_details">
                    <div className="PS_menu_name">{item.menu_name}</div>
                    <div className="PS_menu_price">ราคา {item.price} B</div>
                </div>
                <div className="PS_menu_icon">
                    {shop.create_by.toString() === localStorage.getItem('id').toString()?
                        <Link to={"/EditMenuShop/"+item.menu_id}><i className="fa-solid fa-pen"></i></Link>:''}
                    <i className="fa-solid fa-circle-plus" onClick={(e)=>{handleCart(e, item.menu_id, 0)}}></i>
                </div>
            </div>
        </span>
        );
        
        if(state === 0){
            return(
                <div className='ProfileShop'>
                    <div className="PS_shop">
                        <div className="PS_shop_box">
                            <div className="PS_IMG"><img src="https://cwdaust.com.au/wpress/wp-content/uploads/2015/04/placeholder-store.png" alt=""></img></div>
                            <div className="PS_Box">
                                <div className="PS_Box_details">
                                    {/* <div className="PS_Box_bg"></div> */}
                                    {shop.create_by.toString() === localStorage.getItem('id').toString()?
                                    <div className="PS_EditProfile"><Link to={"/EditShop/"+shop.shop_id}><i className="fa-solid fa-pen"></i></Link></div>:''}
                                    
                                    <div className="PS_name">{shop.shop_name}</div>
                                    <div className="PS_frame">
                                        <div><div className="PS_details"><span>Category :</span> {category_list}</div></div>
                                        <div><div className="PS_details"><img src='../img/rate.png' alt='' />-</div></div>
                                        <div><div className="PS_details"><i className="fa-solid fa-phone"></i>{shop.shop_phonenumber}</div></div>
                                        <div className=""><div className="PS_details "><img src='../img/address.png' alt='' />{shop.location_name}</div></div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                    <div className="PS_menu">
                        <div className="PS_menu_Box_button">
                            <div className="PS_name">Menu</div>
                            {shop.create_by.toString() === localStorage.getItem('id').toString()?
                            <Link to={"/CreateMenuShop/"+shop.shop_id}>
                                <div className="PS_menu_button" onClick={PS_add_handleClick}>
                                    Create Menu
                                </div>
                            </Link>:''}
    
                            {menu_list}
    
                            {cart.length === 0?'':
                                <div className="PS_menu_button" onClick={(e)=>{setState(1)}}>
                                    My Cart ( {cart.length} )
                                </div>
                            }
                        </div>
                    </div>
                </div>
            );
        } else{
            const cart_list = cart.map((item, index) => 
            <span>
                <div className="PS_menu_box">
                    <div className="PS_menu_img"><img src="https://www.aloexhair.com/wp-content/uploads/2018/06/shutterstock_708886852.jpg" alt=""></img></div>
                    <div className="PS_menu_details">
                        <div className="PS_menu_name">{item.menu_name}</div>
                        <div className="PS_menu_price">ราคา {item.price} B</div>
                    </div>
                    <div className="PS_menu_icon">
                        <i className="fa-solid fa-circle-minus" onClick={(e)=>{handleCart(e, index, 1)}}></i>
                    </div>
                </div>
            </span>
            );
            return(
                <div className='ProfileShop'>
                    <div className="PS_shop">
                        <div className="PS_shop_box">
                            <div className="PS_IMG"><img src="https://cwdaust.com.au/wpress/wp-content/uploads/2015/04/placeholder-store.png" alt=""></img></div>
                            <div className="PS_Box">
                                <div className="PS_Box_details">
                                    {/* <div className="PS_Box_bg"></div> */}
                                    {shop.create_by.toString() === localStorage.getItem('id').toString()?
                                    <div className="PS_EditProfile"><Link to={"/EditShop/"+shop.shop_id}><i className="fa-solid fa-pen"></i></Link></div>:''}
                                    
                                    <div className="PS_name">{shop.shop_name}</div>
                                    <div className="PS_frame">
                                        <div><div className="PS_details"><span>Category :</span> {category_list}</div></div>
                                        <div><div className="PS_details"><img src='../img/rate.png' alt='' />-</div></div>
                                        <div><div className="PS_details"><i className="fa-solid fa-phone"></i>{shop.phonenumber}</div></div>
                                        <div className=""><div className="PS_details "><img src='../img/address.png' alt='' />{shop.location_name}</div></div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                    <div className="PS_menu">
                        <form className="PS_menu_Box_button" onSubmit={(e)=>{handleOrderNow(e)}}>
                            <div className="PS_name">Cart</div>
                            {cart_list}
                            {cart.length === 0?'':<span className="total">Total : {total_price} B</span>}
                            {cart.length === 0?'':
                            <>
                                <input type="datetime-local" value={order_time} onChange={(e)=>{setOrder_time(e.target.value)}} required/>
                            </>
                            }
                            {cart.length === 0?'':
                            <div className="total_">
                                <input className="PS_menu_button" type="submit" value="Order Now" />
                            </div>
                            
                            }
                            <div className="PS_menu_button back" onClick={(e)=>{setState(0)}}>
                                Back
                            </div>
                        </form>
                    </div>
                </div>
            );
        }
        
    }
}

export default AppProfileShop;
