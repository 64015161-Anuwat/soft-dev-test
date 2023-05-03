import './../Style/ShowShop.css';

import {
    Link
  } from "react-router-dom";
function AppShowShop(){
    return(
        <div className='ShowShop'>
            <div className='shop_menu'>
                <ul className='shop_menu_item'>
                    <li><Link to={"/ProfileShop/1"} className='nav-links'> <img src="https://scontent.fbkk3-4.fna.fbcdn.net/v/t39.30808-6/293396973_566655204913192_6209154558062932296_n.jpg?_nc_cat=108&ccb=1-7&_nc_sid=09cbfe&_nc_eui2=AeFuVETCq28XZh61X7CE04e9pzJkLRKavvWnMmQtEpq-9T4_XdkgIBRbTzsrAIq74LiqTakHNZGrQ_LDS38N_SSY&_nc_ohc=DkeObG_5F6YAX92Pw4T&_nc_zt=23&_nc_ht=scontent.fbkk3-4.fna&oh=00_AfCLIWQ6C3WFBxH2j4TcqjdzhgnfPbrxgxHcCbD23c8pow&oe=64447D11" alt="" /><div className='title'>สถาบันสอนทำผม</div></Link><Link to={"/EditShop/1"} className='nav-links'><i className="fa-solid fa-pen "></i></Link></li>
                    <li><Link to={'/ProfileShop/2'} className='nav-links'> <img src="https://img.wongnai.com/p/984x0/2019/09/25/9b67aa05b6f748649ded5aa091659826.jpg" alt="" /><div className='title'>สถาบันสอนทำผม สถาบันสอนทำผม22สถาบันสอนทำผม22สถาบันสอนทำผม22สถาบันสอนทำผม22</div></Link><Link to={"/EditShop/2"} className='nav-links'><i className="fa-solid fa-pen"></i></Link></li>
                </ul>
            </div>
        </div>
    );

}

export default AppShowShop;