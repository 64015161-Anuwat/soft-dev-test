import './App.css';
import {
  BrowserRouter as Router,
  Routes,
  Route,
} from "react-router-dom";
import AppHeader from './Components/Header';
import AppEditProfile from './Components/EditProfile';
import AppShopUser from './Components/ShopUser';
import AppSingIn from './Components/SingIn';
import AppSingUp from './Components/SingUp';
import AppHistory from './Components/History';
import AppContact from './Components/Contact';
import AppModel from './Components/Model';
import AppShop from './Components/Shop';
import AppProfileShop from './Components/ProfileShop';
import AppCreateShop from './Components/CreateShop';
import AppEditShop from './Components/EditShop';
import AppCreateMenuShop from './Components/CreateMenuShop';
import AppEditMenuShop from './Components/EditMenuShop';
import AppShowCart from './Components/ShowCart';
import AppPayment from './Components/Payment';
import AppConfirm from './Components/Confirm';
import AppNotification from './Components/Notification';
import AppProfileModel from './Components/ProfileModel';

function App() {
  return (
    // <div className='container'> 
      <Router>
        <Routes>
          <Route path='SingIn' element={<AppSingIn />}></Route>
          <Route path='SingUp' element={<AppSingUp />}></Route>
          <Route path='*' element={<AppHeader />}></Route>
        </Routes>
        <Routes>
          <Route path='/' element={<AppShop />}></Route>
          <Route path='/Shop' element={<AppShop />}></Route>
          <Route path='/Model' element={<AppModel />}></Route>
          <Route path='/EditProfile/:id' element={<AppEditProfile />}></Route>
          <Route path='/ProfileShop/:id' element={<AppProfileShop />}></Route>
          <Route path='/ShopUser' element={<AppShopUser />}></Route>
          <Route path='/CreateShop' element={<AppCreateShop />}></Route>
          <Route path='/EditShop/:id' element={<AppEditShop />}></Route>
          <Route path='/CreateMenuShop/:id' element={<AppCreateMenuShop />}></Route>
          <Route path='/EditMenuShop/:id' element={<AppEditMenuShop/>}></Route>
          <Route path='/History' element={<AppHistory />}></Route>
          <Route path='/Notification' element={<AppNotification />}></Route>
          <Route path='/Contact' element={<AppContact />}></Route>
          <Route path='/ShowCart/:cart' element={<AppShowCart />}></Route>
          <Route path='/Payment/:id' element={<AppPayment />}></Route>
          <Route path='/confirm/:id/:start' element={<AppConfirm />}></Route>
          <Route path='/ProfileModel/:id' element={<AppProfileModel />}></Route>
        </Routes>
      </Router>
    // </div>
  );
}

export default App;
