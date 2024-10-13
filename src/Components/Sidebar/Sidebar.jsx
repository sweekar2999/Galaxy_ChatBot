import React, { useContext, useState } from 'react'
import { assets } from '../../assets/assets';
import './Sidebar.css'; 
import { Context } from '../../context/Context';

function Sidebar() {
    const [extended, setExtended] = useState(false);
    const { onSent, prevPrompt, setRecentPrompt, newChat } = useContext(Context);
    const loadPrompt= async (prompt)=>{
        setRecentPrompt(prompt);
        await onSent(prompt);
    }

    return (
        <>
            <div className={`Sidebar ${extended ? 'extended' : 'collapsed'}`}>
                <div className='top'>
                    <img
                        className='menu'
                        onClick={() => setExtended((prev) => !prev)}
                        src={assets.menu_icon}
                        alt="Menu"
                    />
                    <div onClick={()=>newChat()} className='new-chat'>
                        <img src={assets.plus_icon} alt="New Chat" />
                        {extended ? <p>New Chat</p> : null}
                    </div>
                    {extended ? (
                        <div className='recent'>
                            <p className='recent-title'>Recent</p>
                            {prevPrompt.map((item, index) => (
                                <div  onClick={()=>{loadPrompt(item)}} className='recent-entry' key={index}>
                                    <img src={assets.message_icon} alt="Recent Message" />
                                   
                                    <p>{item.slice(0, 15)}...</p>
                                </div>
                            ))}
                        </div>
                    ) : null}
                </div>
                <div className='bottom'>
                    <div className='bottom-item recent-entry'>
                        <img src={assets.question_icon} alt="Help" />
                        {extended ? <p>Help</p> : null}
                    </div>
                    <div className='bottom-item recent-entry'>
                        <img src={assets.history_icon} alt="Activity" />
                        {extended ? <p>Activity</p> : null}
                    </div>
                    <div className='bottom-item recent-entry'>
                        <img src={assets.setting_icon} alt="Settings" />
                        {extended ? <p>Settings</p> : null}
                    </div>
                </div>
            </div>
        </>
    );
}

export default Sidebar;
