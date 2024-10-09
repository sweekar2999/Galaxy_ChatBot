import React, { useContext } from 'react'
import './Main.css'
import { assets } from '../../assets/assets'
import { Context } from '../../context/Context'
function Main() {
    const {onSent,showResult,input,setInput,loading,recentPrompt,resultData}=useContext(Context);
  return (
    <div className='main'>
        <div className='nav'>
            <p>Gemini</p>
            <img src={assets.user_icon} alt="" />
        </div>
        <div className='main-container'>
            {!showResult?<>
            <div className='greet'>
                <p><span>Hello Dev,</span></p>
                <p>How can I help you today,</p>
            </div>
            <div className='cards'>
                <div className='card'>
               <p>Lorem ipsum dolor sit amet consectetur adipisicing.</p>
               <img src={assets.compass_icon} alt="" />
                </div>
                <div className='card'>
               <p>Lorem ipsum dolor sit amet consectetur adipisicing.
               </p>
               <img src={assets.bulb_icon} alt="" />
                </div>
                <div className='card'>
                    <p>Lorem ipsum dolor sit amet consectetur adipisicing elit. Itaque.</p>
                    <img src={assets.code_icon} alt="" />
                </div>
                <div className='card'>
                    <p>Lorem ipsum dolor, sit amet consectetur adipisicing.</p>
                    <img src={assets.message_icon} alt="" />
                </div>
            </div>
            </>:
            <div className='result'>
                <div className='result-title'>
                    <img src={assets.user_icon} alt="" />
                    <p>{recentPrompt}</p>
                </div>
                <div className='result-data'>
                    <img src={assets.gemini_icon} alt="" />
                    <p dangerouslySetInnerHTML={{__html:resultData}}></p>
                </div>

                </div>}
            <div className='main-bottom'>
                <div className='search-box'>
                    <input onChange={(evt)=>{
                        setInput(evt.target.value)
                    }} value={input} type="text" placeholder="Enter a prompt here" />
                    <div>
                    <img src={assets.gallery_icon} alt="" />
                    <img src={assets.mic_icon} alt="" />
                    <img  onClick={()=>onSent(input)}src={assets.send_icon} alt="" />
                    </div>
                </div>
                <p className='bottom-info'>Lorem ipsum dolor sit amet consectetur adipisicing elit. Ipsum.</p>             
            </div>
        </div>
    </div>
  )
}

export default Main