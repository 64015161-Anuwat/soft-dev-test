import { useState, useEffect } from 'react';
import './../App.css';
import './../Style/SingIn.css';
import {
    Link,
    Navigate 
} from "react-router-dom";
import Swal from 'sweetalert2'
import withReactContent from 'sweetalert2-react-content'
import {variables} from "../Variables";

function AppSingIn(){
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [logged, setLogged] = useState(false);

    useEffect(() => {
        console.log(localStorage.getItem('id'))
        if(localStorage.getItem('id') !== "undefined" && localStorage.getItem('id') !== null){
            setLogged(true);
        }
    }, []);

    async function handleSubmit(e){
        const MySwal = withReactContent(Swal);
        e.preventDefault();
        try {
            fetch(variables.API_URL+"sign_in", {
                method: "POST",
                headers: {
                    'Accept': 'application/json, text/plain',
                    'Content-Type': 'application/json;charset=UTF-8'
                },
                body: JSON.stringify({
                    email: email.toString(),
                    password: password.toString()
                }),
            })
            .then(response => response.json())
            .then(result => {
                console.log(result)
                if(!result.error){
                    localStorage.setItem('id', result[0].id);
                    localStorage.setItem('firstname', result[0].firstname)
                    localStorage.setItem('lastname', result[0].lastname)
                    setLogged(true);
                } 
                else{
                    MySwal.fire({
                        html: <p>{result.error}</p>,
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
        <div className="SingIn">
            {logged && <Navigate to="/"/>}
            <div className="SingIn-logo">
               <Link to="/Shop">BEAUTY <span>SHOP</span></Link>
            </div>
            <div className="contianer-SingIn">
                <div className="SingIn-frame">
                    <form onSubmit={handleSubmit} id="SingIn-form">
                        <span className="topic-SingIn">
                            Sign In<br />
                        </span>
                        <span className="SingIn-error">
                        </span>
                        <div className="input-frame">
                            <input className="input" id="register-email" type="email" name="email"
                                placeholder="E-Mail" onChange={(e) => setEmail(e.target.value)} required/>
                            <span className="symbol">
                                <i className="fa-solid fa-envelope"></i>
                            </span>
                        </div>
                        <div className="input-frame">
                            <input className="input" id="SingIn-password" type="password" name="password"
                                placeholder="Password" onChange={(e) => setPassword(e.target.value)} required/>
                            <span className="symbol">
                                <i className="fas fa-lock"></i>
                            </span>
                        </div>
                        <div className="submit-frame">
                            <input id="submit" type="submit" value="SignIn" />
                        </div>
                        <div className="Button_SingUp">
                            <Link to="/SingUp" id="Button_SingUp">SignUp</Link>
                        </div>
                    </form>
                </div>
            </div>
        </div>
    );

}

export default AppSingIn;