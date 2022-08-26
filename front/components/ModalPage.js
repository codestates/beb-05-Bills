import React, { useState , useCallback} from 'react';
import ReactDOM from 'react-dom';
import ReactModal from 'react-modal';
import KakaoMap from './KakaoMap';
import styled  from 'styled-components';
import { Input } from 'antd';
import useInput from '../hooks/useInput';


const SearchInput = styled(Input.Search)`
vertical-align: middle;
`;

const ModalPage = () => {

  const [modal, setModal] = useState(true); // 모달창
  const [searchInput, onChangeSearchInput] = useInput('');
  const [searchKeyWorld , setSearchKeyWorld] = useState("이태원맛집");

  const modalOff = () => {
    setModal(false);
  };

  const onSearch = useCallback(() => {
    setSearchKeyWorld(searchInput);
    console.log(searchKeyWorld);
  });
  
  return (
    <>
      <ReactModal
        isOpen={modal}
        ariaHideApp={false}
        onRequestClose={modalOff}
        style={{
          overlay: {
            position: "fixed",
            top: 0,
            left: 0,
            right: 0,
            bottom: 0,
            backgroundColor: "rgba(15, 15, 15, 0.79)",
          },
          content: {
            position: "absolute",
            top: "60px",
            left: "35%",
            width: "30%",
            height: "80%",
            border: "1px solid #ccc",
            background: "#fff",
            overflow: "auto",
            WebkitOverflowScrolling: "touch",
            borderRadius: "4px",
            outline: "none",
            padding: "20px",
          },
        }}
      >
      <KakaoMap keyword={searchKeyWorld}></KakaoMap>
      
      <SearchInput
            enterButton
            value={searchInput}
            onChange={onChangeSearchInput}
            onSearch = {onSearch}
          />
      </ReactModal>
    </>
  );
};

export default ModalPage;