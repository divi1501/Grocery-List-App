import Header from './Header';
import SearchItem from './SearchItem';
import AddItem from './AddItem';
import Content from './Content';
import Footer from './Footer';
import { useState,useEffect } from 'react';
import { useRef } from 'react';
function App() {
  const inputRef = useRef();
  const [items, setItems] = useState(JSON.parse(localStorage.getItem('shoppingList')) || []);
  
  useEffect(()=>{
    localStorage.setItem('shoppingList', JSON.stringify(items));
  },[items]);

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
      <Content items={items.filter( (item) => (item.item).toLowerCase().includes(search.toLowerCase())  )} handleClick={handleClick} handleDelete={handleDelete} />
      <Footer length={items.length} />
    </div>
  );
}

export default App;