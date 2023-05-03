
import './../Style/EditMenuShop.css';
import { useState, useEffect } from 'react';
import {variables} from "../Variables";
import Swal from 'sweetalert2'
import withReactContent from 'sweetalert2-react-content'
import { useParams } from 'react-router-dom';

function AppEditMenuShop() {
  const [name, setName] = useState('');
  const [price, setPrice] = useState('');
  const {id} = useParams();

  useEffect(()=>{
    fetch(variables.API_URL+"get_shop_menu/"+id, {
      method: "GET",
      headers: {
          'Accept': 'application/json, text/plain',
          'Content-Type': 'application/json;charset=UTF-8'
      },
      })
      .then(response => response.json())
      .then(result => {
          console.log(result)
          setName(result[0].menu_name)
          setPrice(result[0].price)
      }
  )
  }, [])

  async function handleSubmit(e){
    const MySwal = withReactContent(Swal);
    e.preventDefault();
    try {
        fetch(variables.API_URL+"update_shop_menu", {
            method: "POST",
            headers: {
                'Accept': 'application/json, text/plain',
                'Content-Type': 'application/json;charset=UTF-8'
            },
            body: JSON.stringify({
                id: id,
                menu_name: name,
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
    <div className='EditMenuShop'>
      <div className="EMNS_add_box">
        <h1>Edit Menu Shop</h1>
        <form onSubmit={handleSubmit}>
            <div className="EMNS_add_img"><img src="https://www.aloexhair.com/wp-content/uploads/2018/06/shutterstock_708886852.jpg" alt=""></img></div>
            <div className="EMNS_add_details">
                <div className="EMNS_add_input"><input className="" name="" id="" placeholder="Name" value={name} onChange={(e)=>{setName(e.target.value)}}></input></div>
                <div className="EMNS_add_input"><input className="" name="" id="" placeholder="price (B)" value={price} onChange={(e)=>{setPrice(e.target.value)}}></input></div>
                <button type="submit" className="EMNS_button_submit">
                  <i className="fa-solid fa-pen"></i> Edit
                </button>
            </div>
        </form>
      </div>
    </div>
  );
}

export default AppEditMenuShop;