import React, { useEffect, useState, useRef } from "react";
import styled from "styled-components";

const Map = ({ Data }) => {
  const [kakaoLoaded, setKakaoLoaded] = useState(false);

  const [Click_Map, setClick_Map] = useState(null);
  const [Click_Item, setClick_Item] = useState(null);
  const [MergedData, setMergedData] = useState([]);

  useEffect(() => {
    const merged = Data.map((item) => {
      return item.factories.map((factory) => ({
        idx: factory.idx,
        representative: item.representative,
        biz_name: item.biz_name,

        name: factory.name,
        addr: factory.addr,
        addr_pos_x: factory.addr_pos_x,
        addr_pos_y: factory.addr_pos_y,
      }));
    }).flat();

    setMergedData(merged);
    console.log("Merged Data: ", merged);
  }, [Data]);

  // 카카오맵 스크립트 로드
  useEffect(() => {
    if (!window.kakao || !window.kakao.maps) {
      const script = document.createElement("script");
      script.src = "https://dapi.kakao.com/v2/maps/sdk.js?appkey=75950140860952472c7a878fff458a4c&libraries=services,clusterer,drawing&autoload=false";
      script.async = true;
      script.onload = () => {
        window.kakao.maps.load(() => {
          setKakaoLoaded(true);
        });
      };
      document.head.appendChild(script);
    } else {
      setKakaoLoaded(true); // 이미 로드되어 있으면 바로 상태 업데이트
    }
  }, []);

  // 초기 지도 로드 및 마커 생성
  useEffect(() => {
    if (!kakaoLoaded || !MergedData || MergedData.length === 0) return;

    const Map_Container = document.getElementById("map");
    const First_Load_Option = {
      center: new window.kakao.maps.LatLng(35.080681407544326, 128.95695294584988),
      level: 13,
    };

    const New_Map = new window.kakao.maps.Map(Map_Container, First_Load_Option);
    setClick_Map(New_Map); // 지도 인스턴스 저장

    const Marker_Size = new window.kakao.maps.Size(10, 10);
    let Cur_Info_Window = null;
    let Cur_Overlay = null;

    // 열려있는 인포윈도우를 저장할 변수
    let openInfowindow = null;

    MergedData.forEach((item) => {
      const position = new window.kakao.maps.LatLng(item.addr_pos_x, item.addr_pos_y);
      const marker = new window.kakao.maps.Marker({
        map: New_Map,
        position: position,
        width: Marker_Size.width,
        height: Marker_Size.height,
      });

      // 인포윈도우 내용
      const content = `
           <div class="Map_Custom_Overlay">
             <div class="Inner">
               <div class="Title">
                 ${item.representative} ${item.biz_name}
                
               </div>
               <div class="Desc">
                 <div class="Data">
                   <span>업체명 : ${item.name}</span>
                   <span>주소 : ${item.addr}</span>
                 </div>
                  <div class="close" onclick="window.closeOverlay()" title="닫기">닫기</div>
               </div>
             </div>
           </div>`;

      const overlay = new window.kakao.maps.CustomOverlay({
        content: content,
        position: position,
        map: null,
      });

      // 마커 클릭 이벤트 리스너
      window.kakao.maps.event.addListener(marker, "click", function () {
        // 이전에 열린 오버레이가 있으면 닫기
        if (Cur_Overlay) {
          Cur_Overlay.setMap(null);
        }
        // 현재 오버레이 열기
        overlay.setMap(New_Map);
        Cur_Overlay = overlay;
      });
    });

    // 전역 closeOverlay 함수 정의
    window.closeOverlay = function () {
      if (Cur_Overlay) {
        Cur_Overlay.setMap(null);
      }
    };

    // 지도 컨트롤 추가
    const Ctrl_Map_Type = new window.kakao.maps.MapTypeControl();
    New_Map.addControl(Ctrl_Map_Type, window.kakao.maps.ControlPosition.TOPRIGHT);

    const Ctrl_Map_Zoom = new window.kakao.maps.ZoomControl();
    New_Map.addControl(Ctrl_Map_Zoom, window.kakao.maps.ControlPosition.RIGHT);
  }, [kakaoLoaded, MergedData]);

  // 아이템 클릭시 지도 이동
  const handleItemClick = (x, y, place_name, road_name, idx) => {
    setClick_Item(idx);
    if (!Click_Map) return;

    const Position = new window.kakao.maps.LatLng(y, x);

    // 지도 이동
    Click_Map.setCenter(Position);
    Click_Map.setLevel(2);

    // 마커 생성
    const Marker = new window.kakao.maps.Marker({
      map: Click_Map,
      position: Position,
    });

    // 인포윈도우 생성
    const Info_Window = new window.kakao.maps.InfoWindow({
      content: `<div class="Win_Point" >${idx + 1}. ${place_name ? place_name : road_name}</div>`,
    });

    // 마커에 인포윈도우 열기
    Info_Window.open(Click_Map, Marker);
  };

  return (
    <div className="Item">
      <div className="Desc">{kakaoLoaded ? <MapContainer id="map"></MapContainer> : <MapContainer>맵 로딩 중...</MapContainer>}</div>
    </div>
  );
};

export default Map;

const MapContainer = styled.div`
  width: 100%;
  height: 650px;
  background-color: #f5f5f5;
  border-radius: 10px;
  position: relative;

  .Map_Custom_Overlay {
    background: rgba(255, 255, 255, 0.9);
    border: 1px solid var(--white-color-2);
    border-radius: 5px;
    box-shadow: 0 0 3px var(--white-color-5);
    color: var(--gray-color-5);
    padding: 10px;

    .Title {
      box-shadow: none;
      border-bottom: 1px dashed var(--white-color-2);

      font-weight: 500;

      padding-bottom: 5px;
      margin-bottom: 5px;
    }

    .Desc {
      display: flex;
      align-items: flex-end;
      justify-content: space-between;

      font-size: 14px;
      padding: 0;
      min-height: auto;

      .Data {
        display: flex;
        gap: 10px;
        justify-content: space-between;
        flex-direction: column;
        padding: 3px 0;
      }

      .close {
        display: flex;
        justify-content: flex-end;
        transition: 0.3s;
        &:hover {
          color: var(--red-color);
        }
      }
    }
  }
`;
