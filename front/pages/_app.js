// 모든 페이지들의 공통 사항들을 정리하는 파일. 주로 Header를 구현하기에 좋다.
import React from 'react';
import PropTypes from 'prop-types';
import 'antd/dist/antd.css';
import Head from 'next/head';
import wrapper from '../store/configureStore';

const SNSApp = ({ Component }) => (
  // index.js의 return 부분이 Component에 해당한다. 즉 SNSApp은 index.js의 부모인 셈.
  <>
    <Head>
      <title>SNS</title>
    </Head>
    <script type="text/javascript" src="//dapi.kakao.com/v2/maps/sdk.js?appkey=f966c20ea7d1f4169943ffe75a384d23&libraries=services,clusterer,drawing"></script>
    <Component />
  </>
);
SNSApp.propTypes = {
  Component: PropTypes.elementType.isRequired,
};

export default wrapper.withRedux(SNSApp);
