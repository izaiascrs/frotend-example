import React, { useEffect, useState } from 'react';
import logo from '../assets/logo.png';
import './Details.css';

import api from '../services/api'; 

export default function Details({ match , location}){

    if(location.pathname === `/details/${match.params.platform}/${match.params.username}`) {
        document.body.className = 'body-bg-no-image';
     }    

    const [userInfo, setUserInfo] = useState([{
        gamertag: '',
        avatarUrl:'',
        image: '',
        activeLegend: '',
        damage: '',
        damagePercentile: '',
        killsPercentile: '',
        killsValue: '',        
        apexLevel: '',
        apexPercentile: ''
    }]);

    useEffect(() => {
        async function loadInfo(){
        const response = await api.get(`/api/v1/profile/${match.params.platform}/${match.params.username}`);

        const { platformInfo, segments , metadata } = response.data.data;
        console.log(platformInfo, segments,metadata);

        setUserInfo({gamertag: platformInfo.platformUserId,
                    avatarUrl: platformInfo.avatarUrl,
                    image: segments[1].metadata.imageUrl,
                    activeLegend: metadata.activeLegendName,
                    damage: segments[0].stats.damage.displayValue,
                    damagePercentile: segments[0].stats.damage.percentile,
                    killsPercentile: segments[0].stats.kills.percentile,
                    killsValue: segments[0].stats.kills.value,
                    apexLevel: segments[0].stats.level.displayValue,
                    apexPercentile: segments[0].stats.level.percentile,
        });

        if(userInfo.length > 0) {
            document.querySelector('.loading').style.display = 'none';
            document.querySelector('.info').style.display = 'block';
            }       
        }
        loadInfo();
    }, [match.params.platform, match.params.username])    

    return(
        <div className="container">      
           <header>
               <img src={logo} alt=""/>
           </header>
           <div className="loading">
            <h2>Loading...</h2>
            </div>      
           <div className="info">
               <div className="gamertag">
                   <img src={userInfo.avatarUrl} alt=""/>
                   <h3>{userInfo.gamertag}</h3>
               </div>
               <div className="details">
                   <div className="personagem">
                       <img src={userInfo.image} alt=""/>
                   </div>
                   <div className="track">
                        <div> 
                            <h3>Selected legend</h3>
                            <p>{userInfo.activeLegend}</p>
                        </div>
                        <div> 
                            <h3>Apex level</h3>
                            <div className="dados">
                                <p>{userInfo.apexLevel}</p>
                                <span>({userInfo.apexPercentile}%)</span>
                            </div>
                        </div>               
                        <div> 
                            <h3>Lifetime kills</h3>
                            <div className="dados">
                                <p>{userInfo.killsValue}</p>
                                <span>({userInfo.killsPercentile}%)</span>
                            </div>
                        </div>               
                        <div> 
                            <h3>Damage Done</h3>
                            <div className="dados">
                                <p>{userInfo.damage}</p>
                                <span>({userInfo.damagePercentile}%)</span>
                            </div>
                        </div>    
                   </div>
               </div>
           </div>
        </div>
    );
}