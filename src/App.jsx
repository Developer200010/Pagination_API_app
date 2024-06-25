import { useEffect, useState } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import './App.css'

function App() {
  const [get, setGet] = useState([]);
  const [page, setPage] = useState(1);
  const perPage =8;
  const lastIndex = page * perPage;
  const firstIndex = lastIndex - perPage;
  const totalPage = Math.ceil(get.length/10);
  const getData = async () =>{
    const res = await fetch(`https://dummyjson.com/products?limit=100`);
    const data = await res.json();
    if(data && data.products){
      setGet(data.products);
    }
  }

  const pagination = (select) =>{
    if(select>=1 && select<=get.length/10 && select !== page){
      setPage(select);
    };
  }
  useEffect(()=>{
    getData();
    
  })

  return (
    <>
    <h1>Pagination Is completed ✌️</h1>
      <hr />
    <div className='cards'>
     
      {get.slice(firstIndex, lastIndex).map((val)=>{
        let {title, thumbnail} = val;
        const tit = title.substring(0,15);
        return(
          <>
           <div className='card'>
            <span>
            <img src={thumbnail} alt={val.title} />
           </span>
          <span><bold>Name :</bold> {tit.length>=15? `${tit}...` : tit}</span>
          <hr />
          <bold><i>Price :</i> {val.price}</bold>
          </div>
          </> 
        ) 
      })}
    

    </div>
    {
      get.length>0 &&  <div class="pagination">
      <a onClick={()=>pagination(page - 1)}>&laquo;</a>
      {
        [...Array(totalPage)].map((_,i)=>{
          return <a className={page === i+1 ? "pagination__selected" : ""} onClick={()=>pagination(i + 1)} key={i}>{i + 1}</a>
        })
      }
      <a onClick={()=>pagination(page + 1)} >&raquo;</a>
    </div>
    }
  
    </>
  )
}

export default App
