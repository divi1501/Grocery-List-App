import Header from './Header';
import SearchItem from './SearchItem';
import AddItem from './AddItem';
import Content from './Content';
import Footer from './Footer';
import { useState,useEffect } from 'react';
import { useRef } from 'react';
function App() {
  const API_URL = 'http://localhost:3500/items';
  const inputRef = useRef();
  const [items, setItems] = useState([]);
  const [fetchError, setFetchError] = useState(null);
  const [isLoading, setIsLoading] =useState(true);
  useEffect(()=>{
    const fetchItems = async () => {
      try {
        const response = await fetch(API_URL);
        if(!response.ok) throw Error('Did not receive expected data');
        const itemsList = await response.json();
        setItems(itemsList);
        setFetchError(null);
      } catch (error) {
        setFetchError(error.message);
      }finally{
        setIsLoading(false);
      }
    }
    setTimeout(()=>{
      fetchItems();
    }, 2000);
  },[]);

const [search, setSearch] = useState('')
const [newItem, setNewItem] = useState('');
const addItem = (item) => {
  const id = items.length ? items[items.length - 1].id + 1 : 1;

  const myNewItem  = {id , checked:false, item}
  const newList = [...items, myNewItem];  
  setItems(newList);
  
}
const handleClick = (id) => {
    const listItems = items.map((item) => item.id === id ? { ...item, checked: !item.checked} : item);
   setItems(listItems);
}

const handleDelete = (id) => {
    const listItems = items.filter((item) => item.id !== id);
    setItems(listItems);

}

const handleSubmit = (e) => {
  e.preventDefault();
  if(!newItem) return;
  console.log(newItem);
  addItem(newItem);
  setNewItem('');
}

  return (
    <div className="App">
      <Header title="Grocery List" />
      <AddItem newItem={newItem} setNewItem={setNewItem} handleSubmit={handleSubmit} inputRef={inputRef} />
      <SearchItem search={search} setSearch={setSearch} />
      <main>
        {isLoading && <p>Loading Items...</p>}
        {fetchError && <p style={{color: "red"}}>{`Error : ${fetchError}`}</p>}
        {!fetchError && !isLoading && <Content items={items.filter( (item) => (item.item).toLowerCase().includes(search.toLowerCase())  )} handleClick={handleClick} handleDelete={handleDelete} />}
      
      </main>
      <Footer length={items.length} />
    </div>
  );
}

export default App;


//npx json-server -p 3500 -w data/db.json