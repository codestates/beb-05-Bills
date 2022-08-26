import React, { useEffect, useRef, useCallback, useMemo,useState } from 'react';
import { Button, Form, Input } from 'antd';
import { useDispatch, useSelector } from 'react-redux';
import useInput from '../hooks/useInput';
import { useRouter } from 'next/router'
import Location from "./Location";

import {
  ADD_POST_REQUEST,
  addPost,
  REMOVE_IMAGE,
  UPLOAD_IMAGES_REQUEST,
} from '../reducers/post';

const PostForm = () => {
  const dispatch = useDispatch();
  const { imagePaths, addPostDone } = useSelector((state) => state.post);
  const router = useRouter()
  const formStyle = useMemo(() => {
    '10px 0 20px';
  }, []);
  const uploadBtnStyle = useMemo(() => {
    'right';
  }, []);
  const imgPathDivStyle = useMemo(() => {
    'inline-block';
  }, []);
  const imgPreviewStyle = useMemo(() => {
    '200px';
  }, []);

  const kakoBtnStyle = useMemo(() => {
    '200px';
  }, []);

  const [text, onChangeText, setText] = useInput('');

  const [show, setShow] = useState(false);


  const [popup, setPopup] = useState({open: false, title: "", message: "", callback: false});

  useEffect(() => {
    if (addPostDone) {
      setText('');
    }
  }, [addPostDone]);


  const onSubmit = useCallback(() => {
    if (!text || !text.trim()) {
      return alert('게시글을 작성하세요.');
    }
    const formData = new FormData();
    imagePaths.forEach((p) => {
      formData.append('image', p);
    });
    formData.append('content', text);
    return dispatch({ type: ADD_POST_REQUEST, data: formData });
  }, [text, imagePaths]);
  const imageInput = useRef();
  const onClickImageUpload = useCallback(() => {
    imageInput.current.click();
  }, [imageInput.current]);

  const onChangeImages = useCallback((e) => {
    // 이미지 업로드 대화상자에서 확인/취소를 클릭한 경우 호출됨
    console.log('images', e.target.files); // e.target.files는 배열이 아니라 유사배열임.
    const imageFormData = new FormData(); // FormData(): multipart 형식으로 전송해 준다.
    [].forEach.call(e.target.files, (f) => {
      // 유사배열 처리하고자 배열의 형식 빌려쓰기
      imageFormData.append('image', f); // key: image, value: f
    });
    dispatch({
      type: UPLOAD_IMAGES_REQUEST,
      data: imageFormData,
    });
  }, []);

  const onRemoveImage = useCallback(
    (index) => () => {
      dispatch({ type: REMOVE_IMAGE, data: index });
    },
    []
  );
  //카카오 지도 호출 
  const onClickKakaoMap = useCallback((e) => {
    // 팝업창을 열었을 때, 처음으로 보이는 위치
    console.log("지도싱행");
  });



  return (
    <Form style={formStyle} encType="multipart/form-data" onFinish={onSubmit}>
      <Input type="text" id="title" placeholder='제목을 입력해주세요' maxLength={140}></Input>
      <Input.TextArea
        value={text}
        onChange={onChangeText}
        maxLength={140}
        placeholder="어떤 신기한 일이 있었나요?"
      />
      {/* <div>
        <Location locationX="37.365264512305174" locationY="127.10676860117488" >

        </Location>
        <Kakao keyword="이태원 맛집"></Kakao>
      </div> */}
      <div>
        <input
          type="file"
          multiple
          hidden
          ref={imageInput}
          onChange={onChangeImages}
        />
        <Button onClick={onClickImageUpload}>이미지 업로드</Button>
        <Button onClick={onClickKakaoMap}>
        </Button>
        <Button onClick={() => router.back()}>목록</Button>
        <Button type="primary" style={uploadBtnStyle} htmlType="submit">
          작성완료
        </Button>
      </div>
      <div>
        {imagePaths.map((v, i) => (
          <div key={v} style={imgPathDivStyle}>
            <img
              src={`http://localhost:3065/${v}`}
              style={imgPreviewStyle}
              alt={v}
            />
            <div>
              <Button onClick={onRemoveImage(i)}>제거</Button>
            </div>
          </div>
        ))}
      </div>
    </Form>
  );
};

export default PostForm;
