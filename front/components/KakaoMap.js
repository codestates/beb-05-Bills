import { MapMarker, Map } from "react-kakao-maps-sdk";
import { useState , useEffect } from 'react';

const KakaoMap = (keyword) => {
    const [info, setInfo] = useState()
    const [markers, setMarkers] = useState([])
    const [map, setMap] = useState()
    const [locationX,setLocationX] = useState([]) // x 좌표
    const [locationY,setLocationY] = useState([]) // Y 좌표
    
    const map_wrap={
      
    }
    useEffect(() => {
      if (!map) return // 정보 확인 
      const ps = new kakao.maps.services.Places()
      
      //키워드 검색 
      ps.keywordSearch(keyword, (data, status, _pagination) => {
        if (status === kakao.maps.services.Status.OK) { // 통신 완료

          const bounds = new kakao.maps.LatLngBounds()
          let markers = []
  
          for (var i = 0; i < data.length; i++) {
            markers.push({ // 좌표 배열 추가 
              position: {
                lat: data[i].y,
                lng: data[i].x,
              },
              content: data[i].place_name,
            })
            bounds.extend(new kakao.maps.LatLng(data[i].y, data[i].x))
          }
          setMarkers(markers)
  
          map.setBounds(bounds)
        }
      })
    }, [map])
  
    //지도 영역 클릭 
    const onClickPlace = ((e) =>{
      console.log(e);
    });
    
    return (
      <>
`      <Map // 로드뷰를 표시할 Container
        center={{
          lat: 37.566826,
          lng: 126.9786567,
        }}
        style={{
          width: "100%",
          height: "350px",
        }}
        level={3}
        onCreate={setMap}
      >
        {markers.map((marker) => (
          <MapMarker
            key={`marker-${marker.content}-${marker.position.lat},${marker.position.lng}`}
            position={marker.position}
            onClick={
              ()=>{
                setInfo(marker)
                setLocationX(marker.position.lng) // X 좌표 세탕
                setLocationY(marker.position.lat) // Y 좌표 세팅
                console.log(marker.position.lng,marker.position.lat)
              }
            }
          >
            {info &&info.content === marker.content && (
              <div style={{color:"#000"}}>{marker.content}</div>
            )}
          </MapMarker>
        ))}
      </Map>  
      </>
    )
  };
  
export default KakaoMap; 