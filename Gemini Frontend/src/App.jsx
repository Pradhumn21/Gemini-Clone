import { useState } from 'react'
import './App.css'
import ReactMarkdown from 'react-markdown'

function App() {
const[inputValue, setInputValue] = useState('')
const[data,setData] = useState([]);
const[isLoading,setIsLoading] = useState(false)

function handleSubmit(event){
  event.preventDefault()
  let userMessage = {role:'user', content:inputValue}
  setData((prevMessages)=>[...prevMessages,userMessage])
  setIsLoading(true)

fetch(import.meta.env.VITE_CONTENT_REQUEST,{
  method:'POST',
  headers:{
    'Content-Type':'application/json'
  },
  body:JSON.stringify(userMessage)
})
.then(response=>response.json())
.then(apiResponse=>{
  console.log(apiResponse)
  setData((prevMessages)=>[...prevMessages,{role:'ai',content:apiResponse.message}])
  setIsLoading(false)
})
.catch(error=>console.log(error))
setInputValue('')
}

  return (
    <div className='mainContainer'>
      <div className='chatContainer'>
        {data.map((message,index)=>{
           return <div key={index} className={`${message.role === 'user'?'userContainer':'aiContainer'}`}>
             <ReactMarkdown>{message.content}</ReactMarkdown>
           </div>
        })}
    </div>

        {isLoading && (
          <div className="aiContainer">AI is typing...</div>
        )}
    <div className='formContainer'>
      <form onSubmit={handleSubmit} className='form'>
        <input type="text" placeholder='Ask Anything...' 
        onChange={(e)=>{setInputValue(e.target.value)}} value={inputValue}/>
        <button type='submit' disabled={!inputValue.trim() || isLoading}>🔎</button>
      </form>
      </div>
    </div>
  )
}

export default App
