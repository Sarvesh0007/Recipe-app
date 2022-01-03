import React,{useEffect,useState} from 'react'
import Recipe from './Recipe'
import "./App.css";

const App=()=> {

  const [recipes,setRecipes]=useState([]);
  const [search,setSearch]=useState("")
  const [query,setQuery]=useState('chicken')

  // const exampleReq=``

  // const [counter,setCounter]=useState(0)

  useEffect(()=>{
    getRecipe();
  },[search]);

  const getRecipe=async()=>{
    const response=await fetch(`https://api.edamam.com/search?q=${query}&app_id=${process.env.REACT_APP_ID}&app_key=${process.env.REACT_APP_KEY}`)
    const data=await response.json();
    setRecipes(data.hits)
    console.log(data)
  }

  const updateSearch=e=>{
    setSearch(e.target.value)

  }

  const getSearch=e=>{
    e.preventDefault();
    setQuery(search)
    setSearch('')
  }

  return (
    <div className='App'>
      <form onSubmit={getSearch} className='search-form'>
        <input className='search-bar' type='text' value={search} onChange={updateSearch}/>
        <button className='search-btn' type='submit'>Search</button>
      </form>
      <div className='recipes'>
      {recipes.map(recipe=>(
        <Recipe
        title={recipe.recipe.label}
        calories={recipe.recipe.calories}
        image={recipe.recipe.image}
        ingredients={recipe.recipe.ingredients}
        />
      ))}
      </div>
      

      {/* <h1 onClick={()=>setCounter(counter+1)}>{counter}</h1> */}
    </div>
  )
}

export default App;