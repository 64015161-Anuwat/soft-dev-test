import './../Style/EditShop.css';
import { useParams } from "react-router-dom";
import { useState, useEffect } from 'react';
import {variables} from "../Variables";
import Swal from 'sweetalert2'
import withReactContent from 'sweetalert2-react-content'

function AppEditShop(){
    const { id } = useParams();
    const [shop_name, setShop_name] = useState('');
    const [category, setCategory] = useState('');
    const [category_list, setCategory_list] = useState([]);
    const [phonenumber, setPhonenumber] = useState('');
    const [location_name, setLocation_name] = useState('');
    const [state, setState] = useState(true);
    // const [PS_edit_click,PS_edit_setClick] = useState(false);
    // const PS_edit_handleClick = () => PS_edit_setClick(!PS_edit_click);
    // eslint-disable-next-line react-hooks/exhaustive-deps
    const category_box = [document.getElementsByName('1'), 
                          document.getElementsByName('2'), 
                          document.getElementsByName('3'), 
                          document.getElementsByName('4'), 
                          document.getElementsByName('5')]

    useEffect(() => {
        console.log(id)
        async function fetch_data(){
            await fetch(variables.API_URL+"get_shop/"+id, {
                method: "GET",
                headers: {
                    'Accept': 'application/json, text/plain',
                    'Content-Type': 'application/json;charset=UTF-8'
                },
                })
                .then(response => response.json())
                .then(result => {
                    console.log(result)
                    setShop_name(result[0].shop_name)
                    setCategory(result[0].category)
                    setPhonenumber(result[0].phonenumber)
                    setLocation_name(result[0].location_name) 
                }
            )
        }
        fetch_data()
    // eslint-disable-next-line react-hooks/exhaustive-deps
    }, []);

    useEffect(() => {
        async function handleCheck(){
            for (let index = 0; index < category.length; index++) {
                await handleCategory(index)
            }
        }
        function handleCategory(index){
            const element = category[index];
            setCategory_list([...category_list, element.category_id.toString()].sort())
            category_box[element.category_id-1][0].checked = true
            console.log(element.category_id)
            if(index === category.length-1){
                setState(false)
            }
        }
        if(state === true){
            handleCheck()
        }
    }, [category, category_box, category_list, state])

    async function handleCheckbox(e){
        if(e.target.checked === true){
            setCategory_list([...category_list, e.target.value].sort())
        } else{
            setCategory_list(category_list.filter(item => item !== e.target.value));
        }
        console.log(category_list)
    }

    async function handleSubmit(e){
        console.log(category_list)
        const MySwal = withReactContent(Swal);
        e.preventDefault();
        // try {
        //     fetch(variables.API_URL+"update_shop", {
        //         method: "POST",
        //         headers: {
        //             'Accept': 'application/json, text/plain',
        //             'Content-Type': 'application/json;charset=UTF-8'
        //         },
        //         body: JSON.stringify({
        //             id: id,
        //             shop_name: shop_name,
        //             category: category_list,
        //             phonenumber: phonenumber,
        //             location_name: location_name
        //         }),
        //     })
        //     .then(response => response.json())
        //     .then(result => {
        //         if(result.msg){
        //             MySwal.fire({
        //                 html: <p>{result.msg}</p>,
        //                 icon: "success",
        //                 confirmButtonColor: "#F07221"
        //             }).then(() => {
        //                 // window.location.reload(false);
        //             })
        //         } 
        //         else{
        //             MySwal.fire({
        //                 html: 
        //                     '<p style="text-align: left; margin: 0 auto;max-width: fit-content;">'+
        //                     result.error+
        //                     '</p>',
        //                 icon: "error",
        //                 confirmButtonColor: "#F07221"
        //             })
        //         }
        //     });
        // } catch (err) {
        //     alert(err);
        // }
    }

    return(
    <div className='EditShop'>
        <div className="form_Edit_Shop">
            <div className='form_Shop'>
                <form onSubmit={handleSubmit}>
                <h2> EDIT SHOP</h2>
                <img src="https://cwdaust.com.au/wpress/wp-content/uploads/2015/04/placeholder-store.png" alt="" />
                <div className="input-frame">

                            <input className="ES-input" id="register-FirstName" type="text" name="firstName"
                                placeholder="Shop Name" value={shop_name} onChange={(e)=>{setShop_name(e.target.value)}} required/>
                            <span className="symbol">
                                <i className="fa-solid fa-user"></i>
                            </span>
                        </div>
                    <div className="search-bar">
                        <div className="search-select">
                            <input type="button" value="Category V" id="select-province" onClick={(e) => {document.getElementsByClassName("province-list")[0].classList.toggle("select-province-toggle")}} />
                            <div className="province-list">
                                <label htmlFor="Eyelashextensions">Eyelash extensions<input type="checkbox" name="1" id="Eyelashextensions" className="select-item" value={1} onChange={handleCheckbox} /><span className="checkmark"></span></label>
                                <label htmlFor="Hairsalon">Hair salon<input type="checkbox" name="2" id="Hairsalon" className="select-item" value={2} onChange={handleCheckbox} /><span className="checkmark"></span></label>
                                <label htmlFor="Spasalons">Spa salons<input type="checkbox" name="3" id="Spasalons" className="select-item" value={3} onChange={handleCheckbox} /><span className="checkmark"></span></label>
                                <label htmlFor="Nailsalons">Nail salons<input type="checkbox" name="4" id="Nailsalons" className="select-item" value={4} onChange={handleCheckbox} /><span className="checkmark"></span></label>
                                <label htmlFor="Beautysalons">Beauty salons<input type="checkbox" name="5" id="Beautysalons" className="select-item" value={5} onChange={handleCheckbox} /><span className="checkmark"></span></label>
                            </div>
                        </div>
                    </div>
                    <div className="input-frame">
                            <input className="ES-input" id="register-PhoneNumber" type="tel" name="phonenumber"
                                placeholder="Phone Number" pattern="[0-9]{10}" value={phonenumber} onChange={(e)=>{setPhonenumber(e.target.value)}} required/>
                            <span className="symbol">
                                <i className="fa-solid fa-phone"></i>
                            </span>
                        </div>
                        <div className="input-frame">
                            <input className="ES-input" id="register-address" type="text" name="address"
                                placeholder="Address" value={location_name} onChange={(e)=>{setLocation_name(e.target.value)}} required/>
                            <span className="symbol">
                                <i className="fa-solid fa-location-dot"></i>
                            </span>
                        </div>
                        <button type="submit" className="ES_button_submit"><i className="fa-solid fa-pen"></i> Edit</button>
                </form>
            </div>
        </div>
    </div>
    );

}

export default AppEditShop;