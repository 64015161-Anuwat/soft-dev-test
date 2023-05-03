import './../Style/CreateShop.css';
import { useState, useEffect } from 'react';
import {variables} from "../Variables";
import Swal from 'sweetalert2'
import withReactContent from 'sweetalert2-react-content'
import { useParams } from 'react-router-dom';

function AppCreateShop(){
    const [shop_name, setShop_name] = useState('');
    const [category, setCategory] = useState('');
    const [category_list, setCategory_list] = useState([]);
    const [phonenumber, setPhonenumber] = useState('');
    const [location_name, setLocation_name] = useState('');

    async function handleSubmit(e){
        const MySwal = withReactContent(Swal);
        e.preventDefault();
        try {
            fetch(variables.API_URL+"create_shop", {
                method: "POST",
                headers: {
                    'Accept': 'application/json, text/plain',
                    'Content-Type': 'application/json;charset=UTF-8'
                },
                body: JSON.stringify({
                    create_by: localStorage.getItem('id'),
                    shop_name: shop_name,
                    category: category_list,
                    phonenumber: phonenumber,
                    location_name: location_name
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
                        // window.location.reload(false);
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
            });
        } catch (err) {
            alert(err);
        }
    }

    async function handleCheckbox(e){
        if(e.target.checked === true){
            setCategory_list([...category_list, e.target.value].sort())
        } else{
            setCategory_list(category_list.filter(item => item !== e.target.value));
        }
        console.log(category_list)
    }

    return(
        <div className='CreateShop'>
            <div className="form_Create_Shop">
                <div className='form_Shop'>
                <form onSubmit={handleSubmit}>
                <h2> CREATE SHOP</h2>
                <img src="https://cwdaust.com.au/wpress/wp-content/uploads/2015/04/placeholder-store.png" alt="" />
                <div className="input-frame">
                    <input className="CS-input" id="register-FirstName" type="text" name="firstName"
                        placeholder="Shop Name" onChange={(e)=>setShop_name(e.target.value)} required/>
                    <span className="symbol">
                        <i className="fa-solid fa-user"></i>
                    </span>
                </div>
                    <div className="search-bar">
                        <div className="search-select">
                            <input type="button" value="Category V" id="select-province" onClick={(e) => {document.getElementsByClassName("province-list")[0].classList.toggle("select-province-toggle")}} />
                            <div className="province-list">
                                <label htmlFor="Eyelashextensions">Eyelash extensions<input type="checkbox" name="Eyelashextensions" id="Eyelashextensions" className="select-item" onChange={handleCheckbox} value={1} /><span className="checkmark"></span></label>
                                <label htmlFor="Hairsalon">Hair salon<input type="checkbox" name="Hairsalon" id="Hairsalon" className="select-item" onChange={handleCheckbox} value={2} /><span className="checkmark"></span></label>
                                <label htmlFor="Spasalons">Spa salons<input type="checkbox" name="Spasalons" id="Spasalons" className="select-item" onChange={handleCheckbox} value={3} /><span className="checkmark"></span></label>
                                <label htmlFor="Nailsalons">Nail salons<input type="checkbox" name="Nailsalons" id="Nailsalons" className="select-item" onChange={handleCheckbox} value={4} /><span className="checkmark"></span></label>
                                <label htmlFor="Beautysalons">Beauty salons<input type="checkbox" name="Beautysalons" id="Beautysalons" className="select-item" onChange={handleCheckbox} value={5} /><span className="checkmark"></span></label>
                            </div>
                        </div>
                    </div>
                    <div className="input-frame">
                            <input className="CS-input" id="register-PhoneNumber" type="tel" name="phonenumber"
                                placeholder="Phone Number" pattern="[0-9]{10}" onChange={(e)=>setPhonenumber(e.target.value)} required/>
                            <span className="symbol">
                                <i className="fa-solid fa-phone"></i>
                            </span>
                        </div>
                        <div className="input-frame">
                            <input className="CS-input" id="register-address" type="text" name="address"
                                placeholder="Address" onChange={(e)=>setLocation_name(e.target.value)} required/>
                            <span className="symbol">
                                <i className="fa-solid fa-location-dot"></i>
                            </span>
                        </div>
                        <button type="submit" className="CS_button_submit"><i className="fa-solid fa-circle-plus"></i> Add</button>
                </form>
                </div>
            </div>
        </div>
    );

}

export default AppCreateShop;