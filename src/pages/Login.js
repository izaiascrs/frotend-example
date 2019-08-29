import React ,{useState} from 'react';
import logo from'../assets/logo.png';
import './Login.css';

import api from '../services/api';


export default function Login({ history, location}){
    if(location.pathname === '/') {
       document.body.className = 'body-bg-image';
    }

    const [userName, setUsername] = useState('');
    const [platform, setPlatform] = useState('psn');

    function handleChange(e) {
        setPlatform(e.target.value);
    }

    async function handleSubmit(e){
        e.preventDefault();        
        const response = await api.get(`/api/v1/profile/${platform}/${userName}`);
        console.log(response.data.data.platform);       
        history.push(`/details/${platform}/${userName}`);
    }
    return(
        <div className="container">
            <header>
                <img src={logo} alt="logo"/>
            </header>
            <section className="search">
            <h1>Track Player Stats</h1>
            <form onSubmit={handleSubmit}>           
                <div className="form-group">
                    <label htmlFor="platform">Platform</label>
                    <select onChange={handleChange} name="platform" id="platform">
                        <option value="psn">Playstation</option>
                        <option value="xbl">Xbox</option>
                        <option value="origin">Origin</option>
                    </select>
                </div>
                <div className="form-group">
                    <label htmlFor="gamertag">Gamertag</label>
                    <input type="text" id="gamertag" name="text" 
                    value={userName} onChange={e => setUsername(e.target.value)}
                    placeholder="Origin ID, Xbox Live gamertag, PSN ID, etc"/>
                </div>
                <div className="form-group">
                    <input type="submit" value="submit" className='btn'/>
                </div>
                </form>
            </section> 
        </div>
    );
}