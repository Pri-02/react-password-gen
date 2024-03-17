import { useCallback, useEffect, useRef, useState } from 'react';
import './App.css';
import { Prev } from 'react-bootstrap/esm/PageItem';

function App() {
  const[length,setlen]=useState(8)
    const[number,setnum]=useState(false)
    const[character,setchar]=useState(false)
    const[password,setpassword]=useState("");
    const passwordref=useRef(null)

    const passwordgenerator=useCallback(()=>{
      let pass=""
      let str="ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz"
      if(number){
        str=str+"0123456789"
      }
      if(character){
        str=str+"!#$%&'()*+,-./:;<=>?@[\]^_`{|}~"
      }
      for(let i=1;i<length;i++){
        let char=Math.floor(Math.random()*str.length+1)
        pass+=str.charAt(char)
      }
      setpassword(pass);
    },[length,number,character,password])
     const copypassword=useCallback(()=>{
      passwordref.current?.select()
      window.navigator.clipboard.writeText(password)
     })

   useEffect(()=>{
  passwordgenerator()
  },[length,number,character]
    )

  return (
    
    <div className="header">
    <div className="inp">
      <input type="text"
       value={password} 
       className="input"
       placeholder='password '
        readOnly
        ref={passwordref}
        >
       </input>
      <button onClick={copypassword}
      className="bttn">COPY</button>
    </div>
    <div className="options">
    <div className="lenallow">
      <input type="range"
      min={6}
      max={100}
      value={length}
      onChange={(e)=>{setlen(e.target.value)}}></input>
      <label>
        length {length}
      </label>
    </div>
    <div className="allow">
     <input type="checkbox"
      defaultChecked={number}
      onChange={(e)=>{setnum((prev=>!prev));}}></input>
      <label>
        number
      </label>
      </div>
    <div className="allow">
     <input type="checkbox"
      defaultChecked={character}
      onChange={(e)=>{setchar((prev=>!prev));}}></input>
      <label>
        character
      </label>

    </div>
    </div>
     
    </div>
  );
}

export default App;
