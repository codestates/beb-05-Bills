import React, { useEffect } from 'react'

const Location=(props)=>{
    // X 좌표와 Y 좌표 입력시 카카오 지도 표시
    const locationX = props.locationX;
    const locationY = props.locationY; 
    useEffect(()=>{
        const container = document.getElementById('map');
        const options = {
        center: new kakao.maps.LatLng(locationX,locationY),
        level: 3
        };

        const map = new kakao.maps.Map(container, options);
        const markerPosition  = new kakao.maps.LatLng(locationX, locationY); 
        const marker = new kakao.maps.Marker({
        position: markerPosition
    });
    
    marker.setMap(map);
        }, [])
        return (
            <div>
            <div id="map" style={{width:"500px", height:"400px"}}></div>
        
            </div>
        )
};

export default Location;