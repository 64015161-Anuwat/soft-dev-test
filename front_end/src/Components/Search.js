import './../Style/Search.css';

function AppSearch(props) {
  const { value, onValueChange } = props;
  console.log(value)

  return (
    <div className='menu_search'>
        <input
        className="app-search-input"
        type="text"
        value={value}
        placeholder="Search" 
        onChange={(event) => onValueChange(event.target.value)}
        />
    </div> 
  );
}

export default AppSearch;