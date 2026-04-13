require('dotenv').config()
const express = require('express')
const {GoogleGenAI} = require('@google/genai')
const cors = require('cors')

const ai = new GoogleGenAI({apiKey:process.env.API_KEY})

const server = express()
server.use(express.json())
server.use(cors())

server.post('/get-data',async(req,res)=>{
    const{content} = req.body
 try {
    const data = await ai.models.generateContent({
        model:"gemini-2.5-flash",
        contents:content
    })
    res.status(200).json({message:data.text || "NO response"})
 } catch (error) {
    console.error(error)
    if(error.status === 503){
        return res.status(503).json({ Error: "AI is busy right now. Please try again in a moment."})
    }
    res.status(500).json({message:"internal server error"})
 }
})

const port = process.env.PORT_NO || 5000
server.listen(port,()=>{
    console.log(`your server is running on port ${port}`)
})