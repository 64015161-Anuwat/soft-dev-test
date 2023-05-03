import { useState, useEffect } from 'react';
import './../Style/SingUp.css';
import {
    Link,
    Navigate 
} from "react-router-dom";
import Swal from 'sweetalert2'
import withReactContent from 'sweetalert2-react-content'
import {variables} from "../Variables";

function AppSingUp(){
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [display_name] = useState("");
    const [firstname, setFirstname] = useState("");
    const [lastname, setLastname] = useState("");
    const [phonenumber, setPhonenumber] = useState("");
    const [location_name, setLocation_name] = useState("");
    const [logged, setLogged] = useState(false);
    const [success, setSuccess] = useState(false);

    useEffect(() => {
        if(localStorage.getItem('id') !== "undefined" && localStorage.getItem('id') !== null){
            setLogged(true);
        }
    }, []);

    async function handleSubmit(e){
        const MySwal = withReactContent(Swal);
        e.preventDefault();
        try {
            fetch(variables.API_URL+"sign_up", {
                method: "POST",
                headers: {
                    'Accept': 'application/json, text/plain',
                    'Content-Type': 'application/json;charset=UTF-8'
                },
                body: JSON.stringify({
                    email: email,
                    password: password,
                    display_name: display_name,
                    firstname: firstname,
                    lastname: lastname,
                    phonenumber: phonenumber,
                    location_name: location_name,
                    roleId: 2
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
                        setSuccess(true);
                    })
                } 
                else{
                    MySwal.fire({
                        html: 
                            '<p style="text-align: left; margin: 0 auto;max-width: fit-content;">'+
                            result.email_error+'<br/>'+
                            result.password_error+
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
        <div className="SingUp">
            {logged && <Navigate to="/"/>}
            {success && <Navigate to="/SingIn   "/>}
            <div className="SingUp-logo">
                <Link to="/Shop">BEAUTY <span>SHOP</span></Link>
            </div>
            <div className="contianer-SingUp">
                <div className="SingUp-frame">
                    <form id="SingUp-form" onSubmit={handleSubmit}>
                        <span className="topic-SingUp">
                            Sign Up<br />
                        </span>
                        <span className="SingUp-error">
                        </span>
                        <div className="input-frame">
                            <input className="input" id="register-email" type="email" name="email"
                                placeholder="E-Mail" onChange={(e) => setEmail(e.target.value)} required/>
                            <span className="symbol">
                                <i className="fa-solid fa-envelope"></i>
                            </span>
                        </div>
                        <div className="input-frame">
                            <input className="input" id="register-password" type="password" name="password"
                                placeholder="Password" onChange={(e) => setPassword(e.target.value)} required/>
                            <span className="symbol">
                                <i className="fas fa-lock"></i>
                            </span>
                        </div>
                        <div className="input-frame">
                            <input className="input" id="register-FirstName" type="text" name="firstName"
                                placeholder="First Name" onChange={(e) => setFirstname(e.target.value)} required/>
                            <span className="symbol">
                                <i className="fa-solid fa-user"></i>
                            </span>
                        </div>
                        <div className="input-frame">
                            <input className="input" id="register-LastName" type="text" name="lastName"
                                placeholder="Last Name" onChange={(e) => setLastname(e.target.value)} required/>
                            <span className="symbol">
                                <i className="fa-solid fa-user"></i>
                            </span>
                        </div>
                        <div className="input-frame">
                            <input className="input" id="register-PhoneNumber" type="tel" name="phonenumber"
                                placeholder="Phone Number" pattern="[0-9]{10}" onChange={(e) => setPhonenumber(e.target.value)} required/>
                            <span className="symbol">
                                <i className="fa-solid fa-phone"></i>
                            </span>
                        </div>
                        <div className="input-frame">
                            <input className="input" id="register-address" type="text" name="address"
                                placeholder="Address" onChange={(e) => setLocation_name(e.target.value)} required/>
                            <span className="symbol">
                                <i className="fa-solid fa-location-dot"></i>
                            </span>
                        </div>
         
                        <div className="submit-frame">
                            <input id="submit" type="submit" value="SingUp" />
                        </div>
                        
                        <div className="Button_SingIn">
                            <Link to="/SingIn" id="Button_SingIn">SingIn</Link>
                        </div>
                    </form>
                </div>
            </div>
        </div>
    );

}

export default AppSingUp;