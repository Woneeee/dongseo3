import React, { useEffect, useState } from "react";
import DaumPostcode from "react-daum-postcode";

const Address = (props) => {
  const [isGeocodeReady, setIsGeocodeReady] = useState(false);

  useEffect(() => {
    // 이미 로드되어 있는지 확인
    if (window.kakao && window.kakao.maps && window.kakao.maps.services) {
      setIsGeocodeReady(true);
      return;
    }

    const KAKAO_API_KEY = "75950140860952472c7a878fff458a4c";

    // services 라이브러리만 포함하여 스크립트 로드
    const script = document.createElement("script");
    script.type = "text/javascript";
    script.src = `//dapi.kakao.com/v2/maps/sdk.js?appkey=${KAKAO_API_KEY}&libraries=services&autoload=false`;

    script.onload = () => {
      window.kakao.maps.load(() => {
        setIsGeocodeReady(true);
      });
    };

    document.head.appendChild(script);

    return () => {
      const scriptElement = document.querySelector(`script[src^="//dapi.kakao.com/v2/maps/sdk.js"]`);
      if (scriptElement) {
        document.head.removeChild(scriptElement);
      }
    };
  }, []);

  const handlePostCode = async (data) => {
    if (!isGeocodeReady) {
      console.error("Geocode 서비스가 준비되지 않았습니다.");
      return;
    }

    const fullAddress = data.address;

    try {
      const coordinates = await getLatLngFromAddress(fullAddress);
      // console.log("coordinates", coordinates);
      props.onAddData({
        address: fullAddress,
        zone: coordinates.zone_no,
        lat: coordinates.lat,
        lng: coordinates.lng,
      });

      props.onClose?.();
    } catch (error) {
      console.error("좌표 변환 실패:", error);
    }
  };

  const getLatLngFromAddress = (address) => {
    return new Promise((resolve, reject) => {
      const geocoder = new window.kakao.maps.services.Geocoder();

      geocoder.addressSearch(address, (result, status) => {
        if (status === window.kakao.maps.services.Status.OK && result[0]) {
          console.log("result", result);
          resolve({
            lat: result[0]?.road_address.y,
            lng: result[0]?.road_address.x,
            zone_no: result[0]?.road_address.zone_no || "", // zone_no가 없을 경우 빈 문자열 반환
          });
        } else {
          reject(new Error("좌표를 찾을 수 없습니다."));
        }
      });
    });
  };

  if (!isGeocodeReady) {
    console.log("카카오 api 로드중");
    return null;
  }

  const postCodeStyle = {
    display: "block",
    // position: "absolute",
    // top: "0px",
    // right: "0%",
    width: "420px",
    height: "500px",
    padding: "10px",
    background: "#fff",
    border: "1px solid var(--white-color-2)",
    borderRadius: "10px",
    zIndex: 999,
    // overflow: "auto",
  };

  return (
    <div style={postCodeStyle}>
      <DaumPostcode onComplete={handlePostCode} autoClose={true} style={{ height: "470px" }} />
    </div>
  );
};

export default Address;
