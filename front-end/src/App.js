import React ,{useRef,useState}from 'react'
import './App.css';
function App() {
  const messageRef = useRef()
  const submitString = useRef()
  const [mess,setMessages] = useState(<h4>no messages</h4>)
  function submit(){
    fetch(`http://express-api-dev.eba-h2jpwbic.us-east-1.elasticbeanstalk.com/${messageRef.current.value}`,{
      method:"POST",
    }).then((res)=>{
      res.json().then((val)=>{
        console.log(val)
        submitString.current.innerText = `Message added successfully \n ${val.message}`

      })
    })
  }
  function getMessages(){
    fetch(`http://express-api-dev.eba-h2jpwbic.us-east-1.elasticbeanstalk.com/`,{
      method:"GET"
    }).then((res)=>{
      res.json().then((val)=>{
        console.log(val)
        setMessages(val.map((e)=>
          <h4 style={{textAlign:"center"}}>{e.message}</h4>
        ))
        
      })
    })
  }
  return (<>
    <div style={{border:"solid 0.1vw red",margin:"1vw"}}>
      <input type="text" ref={messageRef} placeholder='Enter a message' style={{width:"79.3%",textAlign:"center",marginLeft:"10%"}}/>
      <button style={{width:"80%",textAlign:"center",marginLeft:"10%"}} onClick={submit}>Send message</button>
      <h3 ref = {submitString} style={{textAlign:"center"}}></h3>
    </div>
    <div style={{border:"solid 0.1vw red",margin:"1vw"}}>
    <button style={{width:"80%",textAlign:"center",marginLeft:"10%"}} onClick={getMessages}>See all message</button>
    <h3 style={{textAlign:"center"}}>All messages:</h3>
    {mess}
    </div>
    </>
  );
}

export default App;
