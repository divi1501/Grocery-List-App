import ItemList from "./ItemList";
const Content = ({items, handleClick, handleDelete}) => {
    
    return (
        <main>
            {items.length ? (
                <ItemList items={items} handleClick={handleClick} handleDelete={handleDelete} />
            ) : (
                <p style={{marginTop:'2rem'}}>Your list is empty.</p>
            )
        }
        </main>
    )
}

export default Content