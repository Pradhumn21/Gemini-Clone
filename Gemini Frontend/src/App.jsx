import { useState } from 'react'
import './App.css'

function App() {
const[inputValue, setInputValue] = useState('')
const[data,setData] = useState([]);

function hanldeSubmit(event){
  event.preventDefault()
  let userMessage = {role:'user', content:inputValue}
  setData((prevMessages)=>[...prevMessages,userMessage])

fetch('https://jsonplaceholder.typicode.com/posts',{
  method:'POST',
  headers:{
    'Content-Type':'application/json'
  },
  body:JSON.stringify(userMessage)
})
.then(response=>response.json())
.then(apiResponse=>setData((prevMessages)=>[...prevMessages,{role:'ai',content:apiResponse.body}]))
.catch(error=>console.log(error))
setInputValue('')
}

  return (
    <>
    <div>
        {data.map((message)=>{
           return <div className={`${message.role === 'user'?'userContainer':'aiContainer'}`}>
             <div>{message.content}</div>
           </div>
        })}
      </div>
    <div className='formContainer'>
      <form onSubmit={hanldeSubmit}>
        <input type="text" placeholder='Ask Anything...' 
        onChange={(e)=>{setInputValue(e.target.value)}} value={inputValue}/>
        <button type='submit' disabled={!inputValue.trim()}>🔎</button>
      </form>
      </div>
    </>
  )
}

export default App
