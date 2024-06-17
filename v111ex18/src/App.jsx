import { useState, useEffect } from 'react'
import './App.css'

async function getJsonResponse(api) {
  const response = await fetch(api);
  if (!response.ok) {
    console.log("Network response was not ok." + response.statusText);
    return;
  }
  const responseData = await response.json();
  return Object.entries(responseData);
}


function App() {
  const [count, setCount] = useState(0)
  const [postsArray, setPostsArray] = useState([]);

  useEffect(() => {
    console.log("first rendering");
    const fetchData = async () => {
      setPostsArray(await getJsonResponse("https://jsonplaceholder.typicode.com/posts"));
    }
    fetchData();
  }, [])

  return (
    <>
      <h1>Posts Data as fetched from the given API</h1>
      <div className="container w-screen gap-2 flex flex-wrap">
        {postsArray.map(post => {
          return (<div key={post[1].id} className="card h-96 bg-black flex-col overflow-auto w-1/5 m-3">
            <p className="bg-slate-600" >Id: {post[1].id}</p>
            <p>User Id: {post[1].userId}</p>
            <p className='font-bold m-4'>{post[1].title}</p>
            <p className="bg-slate-500">Description: {post[1].body}</p>
          </div>)
        })}
      </div>
    </>
  )
}

export default App
