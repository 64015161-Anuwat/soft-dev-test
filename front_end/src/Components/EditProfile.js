import './../Style/EditProfile.css';
import { useState, useEffect } from 'react';
import {variables} from "../Variables";
import Swal from 'sweetalert2'
import withReactContent from 'sweetalert2-react-content'

function AppEditProfile(){
    const [firstname, setFirstname] = useState('');
    const [lastname, setLastname] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [phonenumber, setPhonenumber] = useState('');
    const [location_name, setLocation_name] = useState('');

    useEffect(() => {
        fetch(variables.API_URL+"get_user/"+localStorage.getItem("id"), {
            method: "GET",
            headers: {
                'Accept': 'application/json, text/plain',
                'Content-Type': 'application/json;charset=UTF-8'
            },
            })
            .then(response => response.json())
            .then(result => {
                if(result.length > 0){
                    setFirstname(result[0].firstname);
                    setLastname(result[0].lastname);
                    setEmail(result[0].email);
                    setPassword(result[0].password);
                    setPhonenumber(result[0].phonenumber);
                    setLocation_name(result[0].location_name);
                }
            }
        )
    }, []);

    async function handleSubmit (e) {
        const MySwal = withReactContent(Swal);
        e.preventDefault();
        try {
            fetch(variables.API_URL+"update_user", {
                method: "POST",
                headers: {
                    'Accept': 'application/json, text/plain',
                    'Content-Type': 'application/json;charset=UTF-8'
                },
                body: JSON.stringify({
                    id: localStorage.getItem('id'),
                    email: email,
                    password: password,
                    firstname: firstname,
                    lastname: lastname,
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
    };

    return(
        <div className='EditProfile'>
            <div className="contianer-ED">
                <div className="ED-frame">
                    <form id="ED-form" onSubmit={handleSubmit}>
                        <span className="topic-ED">
                            EDIT PROFILE SHOP<br />
                        </span>
                        <span className="ED-error"></span>
                        <div className='ED-img'><img src='https://upload.wikimedia.org/wikipedia/commons/9/99/Sample_User_Icon.png' alt=''></img></div>
                        <div className="input-frame">
                            <input className="input" id="register-FirstName" type="text" name="firstName"
                                placeholder="First Name" value={firstname} onChange={(e) => setFirstname(e.target.value)} required/>
                            <span className="symbol">
                                <i className="fa-solid fa-user"></i>
                            </span>
                        </div>
                        <div className="input-frame">
                            <input className="input" id="register-LastName" type="text" name="lastName"
                                placeholder="Last Name" value={lastname} onChange={(e) => setLastname(e.target.value)} required/>
                            <span className="symbol">
                                <i className="fa-solid fa-user"></i>
                            </span>
                        </div>
                        <div className="input-frame">
                            <input className="input" id="register-email" type="email" name="email"
                                placeholder="E-Mail" value={email} onChange={(e) => setEmail(e.target.value)} required/>
                            <span className="symbol">
                                <i className="fa-solid fa-envelope"></i>
                            </span>
                        </div>
                        <div className="input-frame">
                            <input className="input" id="register-password" type="password" name="password"
                                placeholder="Password" value={password} onChange={(e) => setPassword(e.target.value)} required/>
                            <span className="symbol">
                                <i className="fas fa-lock"></i>
                            </span>
                        </div>
                        <div className="input-frame">
                            <input className="input" id="register-PhoneNumber" type="tel" name="phonenumber"
                                placeholder="Phone Number" pattern="[0-9]{10}" value={phonenumber} onChange={(e) => setPhonenumber(e.target.value)} required/>
                            <span className="symbol">
                                <i className="fa-solid fa-phone"></i>
                            </span>
                        </div>
                        <div className="input-frame">
                            <input className="input" id="register-address" type="text" name="address"
                                placeholder="Address" value={location_name} onChange={(e) => setLocation_name(e.target.value)} required/>
                            <span className="symbol">
                                <i className="fa-solid fa-location-dot"></i>
                            </span>
                        </div>
         
                        <div className="submit-frame">
                            <input id="submit" type="submit" value="submit" />
                        </div>
                    </form>
                </div>
            </div>
        </div>
    );

}

export default AppEditProfile;