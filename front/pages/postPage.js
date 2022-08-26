import React, { useEffect, useRef, useCallback, useMemo,useState } from 'react';
import { Button, Form, Input } from 'antd';
import { useDispatch, useSelector } from 'react-redux';
import Head from 'next/head';
import styled from 'styled-components';
import useInput from '../hooks/useInput';
import AppLayout from '../components/AppLayout';
import ModalPage from '../components/ModalPage';
import { useRouter } from 'next/router'

import {
    ADD_POST_REQUEST,
    addPost,
    REMOVE_IMAGE,
    UPLOAD_IMAGES_REQUEST,
  } from '../reducers/post';

const ErrorMessage = styled.div`
  color: red;
`;

const postPage = () => {
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
      '200px color:yello';
    }, []);
  
    const [text, onChangeText, setText] = useInput('');
    const [title, onChangeTitle, setTitle] = useInput('');
  
    const [openModal, setOpenModal] = useState(false);
  
    useEffect(() => {
      if (addPostDone) {
        setText('');
        setTitle('');
      }
    }, [addPostDone]);
  
  
    const onSubmit = useCallback(() => {
      if(!title || !title.trim()){
        return alert('게시글 제목을 작성하세요.');
      }
      if (!text || !text.trim()) {
        return alert('게시글을 작성하세요.');
      }
      const formData = new FormData();
      imagePaths.forEach((p) => {
        formData.append('image', p);
      });
      formData.append('title',title);
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
    });


  return (
    <>
      <Head>
        <title>게시글 작성</title>
      </Head>
      <AppLayout>
        <Form style={formStyle} encType="multipart/form-data" onFinish={onSubmit}>
          <div>
            <label htmlFor="post-title">제목</label>
            <br />
            <Input
              type="text"
              name="post-title"
              value={title}
              onChange={onChangeTitle}
              required
            />
          </div>
          <div>
            <label htmlFor="post-contents">내용</label>
            <br />
            <Input.TextArea
              name="post-contents"
              value={text}
              maxLength={140}
              onChange={onChangeText}
              required
            />
          </div>
          <div>
            <input
            type="file"
            multiple
            hidden
            ref={imageInput}
            onChange={onChangeImages}
            />
            <Button onClick={onClickImageUpload}>이미지 업로드</Button>
            <Button onClick={() => setOpenModal(true)}>
                모달창 
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
            {openModal && <ModalPage/>}
        </div>
        </Form>
      </AppLayout>
    </>
  );
};


export default postPage;
