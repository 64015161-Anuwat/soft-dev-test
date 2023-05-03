import { Link } from 'react-router-dom';
import './../Style/ModelItem.css';

function AppModelItem(props) {
  const { modelItem } = props;
  return (
    <Link to={"/Profilemodel/"+modelItem.model_id}>
    <div className='item_model'>
        <div className='item_model_img'>
            <img src={modelItem.Url} alt="" />
        </div>
        <div className='item_model_details'>
            <div className='details_name_model'>{modelItem.model_name}</div>
                <div className='details_rate_model'><img src='../img/rate.png' alt='' />{modelItem.Rate}</div>
                <div className='details_address_model'><img src='../img/address.png' alt='' />{modelItem.Address}</div>
        </div>
    </div>
    </Link>
  );
}

export default AppModelItem;