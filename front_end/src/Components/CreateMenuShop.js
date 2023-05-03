
import './../Style/CreateMenuShop.css';
import { useState, useEffect } from 'react';
import {variables} from "../Variables";
import Swal from 'sweetalert2'
import withReactContent from 'sweetalert2-react-content'
import { useParams } from 'react-router-dom';

function AppCreateMenuShop() {
  const [name, setName] = useState('');
  const [price, setPrice] = useState('');
  const {id} = useParams()

  async function handleSubmit(e){
    const MySwal = withReactContent(Swal);
    e.preventDefault();
    try {
        fetch(variables.API_URL+"create_shop_menu", {
            method: "POST",
            headers: {
                'Accept': 'application/json, text/plain',
                'Content-Type': 'application/json;charset=UTF-8'
            },
            body: JSON.stringify({
                menu_name: name,
                price: price,
                create_by: id
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

  return (
    <div className='CreateMenuShop'>
        <div className="CMNS_add_box">
          <h1>Create Menu Shop</h1>
          <form onSubmit={handleSubmit}>
              <div className="CMNS_add_img"><img src="https://www.aloexhair.com/wp-content/uploads/2018/06/shutterstock_708886852.jpg" alt=""></img></div>
              <div className="CMNS_add_details">
                  <div className="CMNS_add_input"><input type='text' className="" name="" id="" placeholder="Name" onChange={(e)=>{setName(e.target.value)}} required></input></div>
                  <div className="CMNS_add_input"><input type='number' name="" id="" placeholder="price (B)" onChange={(e)=>{setPrice(e.target.value)}} required></input></div>
                  <button type="submit" className="CMNS_button_submit">
                      <i className="fa-solid fa-circle-plus"></i> Add
                  </button>
              </div>
          </form>
        </div>
    </div>
  );
}

export default AppCreateMenuShop;