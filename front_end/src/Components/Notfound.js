import './../Style/Notfound.css';

function AppNotfound(props) {
    const { value } = props;
  
    return (
        <div className='notfound'>
            {value}
        </div>
    );
  }
  
  export default AppNotfound;