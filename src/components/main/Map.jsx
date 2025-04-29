import React, { useEffect, useState, useRef } from "react";
import styled from "styled-components";

const Map = ({ Data }) => {
  const [kakaoLoaded, setKakaoLoaded] = useState(false);
  const [Click_Map, setClick_Map] = useState(null);
  const [Click_Item, setClick_Item] = useState(null);
  const [MergedData, setMergedData] = useState([]);

  const markerList = useRef([]);
  const overlayList = useRef([]);
  const currentOverlay = useRef(null);

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
      setKakaoLoaded(true);
    }
  }, []);

  useEffect(() => {
    if (!kakaoLoaded || !MergedData || MergedData.length === 0) return;

    const Map_Container = document.getElementById("map");
    const First_Load_Option = {
      center: new window.kakao.maps.LatLng(36.22729338394668, 128.02730400640417),
      level: 13,
    };

    const New_Map = new window.kakao.maps.Map(Map_Container, First_Load_Option);
    setClick_Map(New_Map);

    const Marker_Size = new window.kakao.maps.Size(10, 10);
    let Cur_Overlay = null;
    const markers = [];

    MergedData.forEach((item) => {
      const position = new window.kakao.maps.LatLng(item.addr_pos_x, item.addr_pos_y);
      const marker = new window.kakao.maps.Marker({
        position: position,
        width: Marker_Size.width,
        height: Marker_Size.height,
      });

      const content = `
        <div class="Map_Custom_Overlay">
          <div class="Inner">
            <div class="Title">${item.representative} ${item.biz_name}</div>
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

      window.kakao.maps.event.addListener(marker, "click", function () {
        if (Cur_Overlay) {
          Cur_Overlay.setMap(null);
        }
        overlay.setMap(New_Map);
        Cur_Overlay = overlay;
      });

      markers.push(marker); // 마커 배열에 추가
    });

    // 클러스터러 추가
    const clusterer = new window.kakao.maps.MarkerClusterer({
      map: New_Map,
      markers: markers,
      gridSize: 30,
      averageCenter: true,
      minLevel: 11, // 확대 많이 해야 개별 마커가 보이도록
    });

    // 전역 닫기 함수
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

  return (
    <div className="Item">
      <div className="Desc">{kakaoLoaded ? <MapContainer id="map"></MapContainer> : <p>맵 로딩 중...</p>}</div>
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
