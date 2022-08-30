# Quick Start

1. Mysql Database 생성

   ```sql
   npx sequelize db:create // default: database_development
   ```

   ```json
   // config.json
   {
     "development": {
       "username": "root",
       "password": null,
       "database": "database_development",
       "host": "127.0.0.1",
       "dialect": "mysql"
     },
     "test": {
       "username": "root",
       "password": null,
       "database": "database_test",
       "host": "127.0.0.1",
       "dialect": "mysql"
     },
     "production": {
       "username": "root",
       "password": null,
       "database": "database_production",
       "host": "127.0.0.1",
       "dialect": "mysql"
     }
   }
   ```

2. 서버 실행

   ```json
   npm start
   ```

3. 데몬 실행

   ```json
   // package.json

   "scripts": {
       "start": "nodemon app",
       "scheduler": "node daemon.js"
     },
   ```

   ```
   npm scheduler
   ```

---

# Database Schema

[https://lh3.googleusercontent.com/7Xw3ucKsBNr7-J4ev*X1Xb_yioHnxloVCKGiPN3M3vLTlMEAScjPb3IRX9x_in-0biS8vfVosgplzWqhWZCeYCGRhbapXv7lh7U-dFyzw9pAIwurqIbK6ZRkdJv3l4c5FRvzg4gkMpGff6NES8ReinzkRCvt9Sm5D15nkk6OsYoS6g3BpJ_1hk3NRyFrFVZThy438xW9PZw0POo_6DDwYniW9Dk6hDlznhANMe1VENdbr5cdtKdgJEzBTg1LoM9z5sFFUjx4XhvwtEOyxHiYtOMRVagHrtv2xUYpnCsgRwdpsvnIKN_8qOWmTPoHpSGw36eFxnSRI-Gw3ZhZynVyMSJJvN9LZILCKu_0jJZ_CNEopl5z2bnTCV0BqrNakdxXXwZQGMWAsoUs2RXz-G9z43M1WzvHSMXBO5QpjzqAFlxXdwh0-Q6uJBnRhGiOPEc9iSrl5FDMQknjiZd4kZck77v0wNQmbtn76I_lklgQvdOVY0eV7neVNy5cHXiglQE0VHiBz5W3sok_MhQpFVw7US4lJuAiFkvHtsV3cs4rALpV5iqFpuYTP_3nkfxh92TNVOAHgoAE0FbBxeSg4Fu_Zr0ZGJ03wraEjk2VO0ZMleEqz9rkXux8uiZiJ*-Vtyi4OCntn3nBbK_CSVVg8tCvxLJe3EXAbbrn3ao_025vA-46euUGaLYvR-IoJRakSiWH3038FIJkCVGRxQQsK6-NWlHwAymSpbWU4_cZCNKzbj0TNW1s21oUH7MFCCECNpzaRyMBK6RlcC3YbaqyV9kPsZaI3DY=w935-h767-no?authuser=0](https://lh3.googleusercontent.com/7Xw3ucKsBNr7-J4ev_X1Xb_yioHnxloVCKGiPN3M3vLTlMEAScjPb3IRX9x_in-0biS8vfVosgplzWqhWZCeYCGRhbapXv7lh7U-dFyzw9pAIwurqIbK6ZRkdJv3l4c5FRvzg4gkMpGff6NES8ReinzkRCvt9Sm5D15nkk6OsYoS6g3BpJ_1hk3NRyFrFVZThy438xW9PZw0POo_6DDwYniW9Dk6hDlznhANMe1VENdbr5cdtKdgJEzBTg1LoM9z5sFFUjx4XhvwtEOyxHiYtOMRVagHrtv2xUYpnCsgRwdpsvnIKN_8qOWmTPoHpSGw36eFxnSRI-Gw3ZhZynVyMSJJvN9LZILCKu_0jJZ_CNEopl5z2bnTCV0BqrNakdxXXwZQGMWAsoUs2RXz-G9z43M1WzvHSMXBO5QpjzqAFlxXdwh0-Q6uJBnRhGiOPEc9iSrl5FDMQknjiZd4kZck77v0wNQmbtn76I_lklgQvdOVY0eV7neVNy5cHXiglQE0VHiBz5W3sok_MhQpFVw7US4lJuAiFkvHtsV3cs4rALpV5iqFpuYTP_3nkfxh92TNVOAHgoAE0FbBxeSg4Fu_Zr0ZGJ03wraEjk2VO0ZMleEqz9rkXux8uiZiJ_-Vtyi4OCntn3nBbK_CSVVg8tCvxLJe3EXAbbrn3ao_025vA-46euUGaLYvR-IoJRakSiWH3038FIJkCVGRxQQsK6-NWlHwAymSpbWU4_cZCNKzbj0TNW1s21oUH7MFCCECNpzaRyMBK6RlcC3YbaqyV9kPsZaI3DY=w935-h767-no?authuser=0)

---

# ABIs

## /user

- get(”/”)
  프로필
  - req.user(이하 생략)
    ```jsx
    {
        id: ,
        email: ,
        nickname: ,
        password: ,
        createdAt: ,
        updatedAt:
      }
    ```
  - res.body
    ```jsx
    {
      dataValues: {
        id: ,
        email: ,
        nickname: ,
        createdAt: ,
        updatedAt: ,
        Followers: [ [User] ],
        Followings: [ [User] ],
        Posts: [ [Post] ],
        Wallet: ,
        Nfts: []
    		Coupon: []
      }
    ```
- post(”/login”)
  로그인
  - req.body
    ```jsx
    { email: , password: }
    ```
  - res.body
    ```jsx
    {
      dataValues: {
        id: ,
        email: ,
        nickname: ,
        createdAt: ,
        updatedAt: ,
        Followers: [ [User] ],
        Followings: [ [User] ],
        Posts: [ [Post] ],
        Wallet: ,
        Nfts: []
      }
    ```
- post(”/”)
  회원 가입
  - req.body
    ```jsx
    { email: , nickname: , password: , type: }
    ```
  - res
- post(”/logout”)
  로그아웃
  - req
  - res
- patch(”/nickname”)
  닉네임 수정
  - req.body
    ```jsx
    { nickname: }
    ```
  - res.body
    ```jsx
    { nickname: }
    ```
- get(”/followers”)
  팔로워 목록
  - req
  - res.body
    {followers}
- get(”/followings”)
  팔로우 목록
  - req
  - res.body
    {followings}
- delete(”/follower/:userId”)
  팔로워 삭제
  - req.params
    ```jsx
    { userId: }
    ```
  - res
    ```jsx
    { UserId: }
    ```
- get(”/:userId”)
  다른 유저 조회
  - req.params
    ```jsx
    {
      userId: 1;
    }
    ```
  - res.body
    ```jsx
    data
    {
      id: ,
      email: ,
      nickname: ,
      createdAt: ,
      updatedAt: ,
      Followers: ,
      Followings: ,
      Posts: []
    	Nft: []
    }
    ```
- get(”/:userId/posts”)
  다른 유저 포스트 목록
  - req.params
    ```jsx
    { userId:  }
    ```
  - res.body
    ```jsx
    posts
    [
    	{
          id: ,
          content: ,
          createdAt: ,
          updatedAt: ,
          UserId: ,
          User: [],
          Images: [],
          Comments: [],
          Likers: [],
    			Location: [],
    			ViewCount:
        },
    ]
    ```
- patch(”/:userId/follow”)
  팔로우하기
  - req.params
    ```jsx
    { userId: }
    ```
  - res.body
    ```jsx
    { userId: }
    ```
- delete(”/:userId/follow”)
  언팔로우
  - req.params
  - res.body
    ```jsx
    { userId: }
    ```
- delete(”/”)
  - req
  - res.body
    ```jsx
    { id: }
    ```

## /posts

- get(”/bydate”)
  글 목록 불러오기(날짜순)
  - req.query
    ```jsx
    { lastId: }
    ```
  - res.body
    ```jsx
    posts
    [
    	{
          id: ,
          content: ,
          createdAt: ,
          updatedAt: ,
          UserId: ,
          User: [],
          Images: [],
          Comments: [],
          Likers: [],
    			ViewCount:
        },
    ]
    ```
- get(”/byviewcount”)
  글 목록 불러오기(조회수 순)
  - req.query
    ```jsx
    { lastId: }
    ```
  - res.body
    ```jsx
    posts
    [
    	{
          id: ,
          content: ,
          createdAt: ,
          updatedAt: ,
          UserId: ,
          User: [],
          Images: [],
          Comments: [],
          Likers: [],
    			ViewCount:
        },
    ]
    ```

## /post

- post(”/”)
  글쓰기
  - req.body
    ```jsx
    {
    	title:
      image: ,
      content: ,
    	locationX: ,
    	locationY: ,
    	nftCode:
    }
    ```
  - res
    ```jsx
    {
        id: ,
    		title: ,
        content: ,
        createdAt: ,
        updatedAt: ,
        UserId: ,
        Images: [],
        Comments: [],
        User: [],
        Likers: [],
    		ViewCount:
      }
    //
    ```
- post(”/:postId/retweet”)
  리트윗
  - req.params
    ```jsx
    { postId: }
    ```
  - res.body
    ```jsx
    {
        id: ,
        content: ,
        createdAt: ,
        updatedAt: ,
        UserId: ,
        User: []
        Images: [],
        Comments: [],
        Likers: []
      }
    ```
- get(”/postID”)
  특정 게시글만 보기
  - req.params
    ```jsx
    { postId: }
    ```
  - res.body
    ```jsx
    {
        id: ,
        content: ,
        createdAt: ,
        updatedAt: ,
        UserId: ,
        User: [].
        Images: [],
        Comments: [],
        Likers: []
    		Location: []
    		ViewCount:
      }
    ```
- post(”/:postId/comment”)
  댓글 달기
  - req.params
    ```jsx
    { postId: }
    ```
  - req.body
    ```jsx
    { content: }
    ```
  - res.body
    ```jsx
    {
        id: ,
        content: ,
        createdAt: ,
        updatedAt: ,
        UserId: ,
        PostId: ,
        User: []
      }
    ```
- patch(”/:postId/like”)
  좋아요
  - req.params
    ```jsx
    { postId: }
    ```
  - res.body
    ```jsx
    { PostId: , UserId: }
    ```
- delete(”/:postId/like”)
  좋아요 취소
  - req.params
    ```jsx
    { postId: }
    ```
  - res.body
    ```jsx
    { PostId: , UserId: }
    ```
- patch(”/:postId”)
  - req
  - res
- delete(”/:postId”)
  글 지우기
  - req.params
    ```jsx
    { postId: }
    ```
  - res.body
    ```jsx
    { PostId: }
    ```
- post(”/images”)
  이미지 업로드
  - req.files
    ```jsx
    [
    {
        fieldname: ,
        originalname: ,
        encoding: ,
        mimetype: ,
        destination: ,
        filename: ,
        path: ,
        size:
      }
    ]
    ```
  - res

# /hashtag

- get(”/:hashtag”)
  - req
  - res

# /coupon

- get(/)
  쿠폰 리스트
  - req
  - res.body
    ```jsx
    [
    	{
    		discout: ,
    		price: ,
    		amount: ,
    	},
    ]
    ```
- get(/:discount)
  쿠폰 정보
  - res.params
    ```jsx
    { discount: }
    ```
  - req.body
    ```jsx
    {
    	discount: ,
    	price:
    	amount:
    }
    ```
- post(/buy/:couponid)
  구매
  - res.params
    ```jsx
    { discount: }
    ```
  - res.body
    ```jsx
    { amount: }
    ```
  - req
- get(/:userid)
  보유 쿠폰
  - res
  - req
    ```jsx
    [
    	{
    		discount: ,
    		amount:
    	}
    ]
    ```
