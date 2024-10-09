import React, { useState } from 'react'
import {assets} from '../../assets/assets';
import './Sidebar.css'; 

function Sidebar() {
    const [extended,setExtended]=useState(false);

    return (
        <>
            <div className={`Sidebar ${extended ? 'extended' : 'collapsed'}`}>
                <div className='top'>
                    <img className='menu' onClick={()=>setExtended((prev)=>!prev)}src={assets.menu_icon} alt="Menu" />
                    <div className='new-chat'>
                        <img  src={assets.plus_icon} alt="New Chat" />
                        {extended ?<p>New Chat</p>:null}
                    </div>
                    {extended?
                    <div className='recent'>
                        <p className='recent-title'>Recent</p>
                        <div className='recent-entry'>
                            <img src={assets.message_icon} alt="Recent Message" />
                            <p>What is React...</p>
                        </div>
                    </div>:null}
                </div>
                <div className='bottom'>
                    <div className='bottom-item recent-entry'>
                        <img src={assets.question_icon} alt="Help" />
                        {extended?<p>Help</p>:null}
                    </div>
                    <div className='bottom-item recent-entry'>
                        <img src={assets.history_icon} alt="Activity" />
                        {extended?<p>Activity</p>:null}
                    </div>
                    <div className='bottom-item recent-entry'>
                        <img src={assets.setting_icon} alt="Settings" />
                        {extended?<p>Settings</p>:null}
                    </div>
                </div>
            </div>
        </>
    )
}

export default Sidebar