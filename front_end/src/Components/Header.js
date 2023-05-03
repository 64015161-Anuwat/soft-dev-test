import { useState } from 'react';
import { MenuData } from '../Data/MenuData';
import './../App.css';
import './../Style/Header.css';
import {
    Link,
    Navigate 
} from "react-router-dom";
function AppHeader(){
    const [click,setClick] = useState(false);
    const [clickProfile,setClickProfile] = useState(false);
    const handleClick = () => setClick(!click);
    const handleClickProfile = () => setClickProfile(!clickProfile);
    const [out, setOut] = useState(false)


    return(
        // <div className='NavbarItem'>
        <div className={click ? 'NavbarItem active_nav':'NavbarItem'}>
            {out && <Navigate to="/login"/>}
            <Link to={""}>
                <h1 className='logo'>BEAUTY <span>SHOP</span></h1>
            </Link>
            <div className='nav-normal'>
                <div className='nav-item'>
                    <div className='nav-menu'>
                        <ul className='nav-menu-item '>
                            {MenuData.map((item,index)=>{
                                return(
                                    <li key={index}>
                                    <Link to={item.page} className='nav-links'>{item.icon}<div className='title'>{item.title}</div></Link>
                                    {/* <Link to={item.page} className='nav-links'> <img src={item.url} alt="" />{item.icon}<div className='title'>{item.title}</div></Link> */}
                                    </li>
                                )
                            })}
                        </ul>
                    </div>

                    <div className={localStorage.getItem('id') !== "undefined" && localStorage.getItem('id') !== null? 'nav-profile' : 'hide'} onClick={handleClickProfile} >
                        <img src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRzrAYqzJv4xWvpZ3Pxc2z_Zt11yUJMHXYGEmMkFY0QSMxkXvI_39WMWOPkXG_GVlAOIFU&usqp=CAU" alt="" />
                        <ul className={clickProfile ? "active_dropdown dropdown_profile":"dropdown_profile"}>
                            <li onClick={handleClick}><Link to="/EditProfile/1">Edit Profile</Link></li>
                            <li onClick={(e) => {localStorage.clear();setOut(true);}}><Link to="/SingIn">Sign Out</Link></li>
                        </ul>
                    </div>

                    <div className={localStorage.getItem('id') !== "undefined" && localStorage.getItem('id') !== null? 'hide' : 'nav-profile'} onClick={handleClickProfile} >
                        <img src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRzrAYqzJv4xWvpZ3Pxc2z_Zt11yUJMHXYGEmMkFY0QSMxkXvI_39WMWOPkXG_GVlAOIFU&usqp=CAU" alt="" />
                        <ul className={clickProfile ? "active_dropdown dropdown_profile":"dropdown_profile"}>
                            <li onClick={(e) => {localStorage.clear();setOut(true);}}><Link to="/SingIn">Sign In</Link></li>
                        </ul>
                    </div>
                    
                </div> 
            </div>
            <div className='nav-responsive'>
                <div className='openmenu' onClick={handleClick}><img src="../img/openmenu.png" alt=""/></div>
                <div className='nav-item'>

                    <div className="close" onClick={handleClick}>
                        <img src="../img/Close.png" alt=""/>
                    </div>
                    
                    <div className='nav-profile'>
                        <img src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRzrAYqzJv4xWvpZ3Pxc2z_Zt11yUJMHXYGEmMkFY0QSMxkXvI_39WMWOPkXG_GVlAOIFU&usqp=CAU" alt="" />
                    </div>
                    <div className='nav-profile-detai-bg'><div className='nav-profile-detai-bg-content'></div></div>
                    <div className='nav-profile-detai'>
                        <div className='nav-profile-name'>{localStorage.getItem('firstname') && localStorage.getItem('lastname')?localStorage.getItem('firstname')+" "+localStorage.getItem('lastname'):''}</div>
                        
                            {localStorage.getItem('id')?
                            <div className='nav-profile-dropdown'>
                            <Link to='/EditProfile/1'><div className='nav-profile-item' onClick={handleClick}>Edit profile</div></Link>
                            <Link to='/SingIn'><div className='nav-profile-item' onClick={(e) => {localStorage.clear();setOut(true);}}>Sign Out</div></Link>
                            </div>
                            :
                            <div className='nav-profile-dropdown'>
                            <Link to='/SingIn'><div className='nav-profile-item' onClick={handleClick}>SignIn</div></Link>
                            </div>}
                            
                        
                    </div>
                    
                    <div className='nav-menu'>
                        <ul className='nav-menu-item'>
                            {MenuData.map((item,index)=>{
                                return(
                                    <li key={index} onClick={handleClick}>
                                    <Link to={item.page} className='nav-links'>{item.icon}<div className='title'>{item.title}</div></Link>
                                    {/* <Link to={item.page} className='nav-links'> <img src={item.url} alt="" />{item.icon}<div className='title'>{item.title}</div></Link> */}
                                    </li>
                                )
                            })}
                        </ul>
                    </div>
                </div>
            </div>
        </div>
    );

}

export default AppHeader;