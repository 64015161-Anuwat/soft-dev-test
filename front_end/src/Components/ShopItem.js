import { Link } from 'react-router-dom';
import './../Style/ShopItem.css';

function AppShopItem(props) {
  const { shopItem } = props;
  return (
    <Link to={"/ProfileShop/"+shopItem.shop_id}>
    <div className='item_shop'>
        <div className='item_shop_img'>
            <img src={shopItem.Url} alt="" />
        </div>
        <div className='item_shop_details'>
            <div className='details_name_shop'>{shopItem.shop_name}</div>
                <div className='details_rate_shop'><img src='../img/rate.png' alt='' />{shopItem.Rate}</div>
                <div className='details_address_shop'><img src='../img/address.png' alt='' />{shopItem.Address}</div>
        </div>
    </div>
    </Link>
  );
}

export default AppShopItem;