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

![Database Schema](https://lh3.googleusercontent.com/G8TzsEdgWCldmCHFrY_AWSdGTvL7sraZHP2H4Y8X6yDUrBsXpn7aO0g_7SDzYEHECN_ea6uObVMNsfSkTbJ2x4BdyePtU62_fTch8sDU_q5k4qGhmYHFnX7ntbQaFqL6o2jTQb34MfC-tl5oTBwmHnZOgzOlYgps-if66l1vXQwSQh289gcSgCmS8OTVn0yax_oaR8nrLuDcM-tNXEzEySWSmCeiFtpHyb_QaArUeO_nm2rCvretSS9lTjnR4_gzuvMBWHPmbbbGBbPEYqdTdZQ3qfYv3zt5kAIKmaqzjYfzQXP7igwz9iTd5MDpnPiIvDOmfkbsEOl9bWBN-tAmi8a7lh8uqYQSkoQm89JK6fqtEexpUKpknJe32UXPhChy_3mvOD8pZVgpzOb1ssoB3KSSffiniouDpnqjcz6gEzCZtEnYhL8AWqBLUchYzBdOKmuCnFWFcnGfx1Dm4-98_2bi0ibRSL9ZUpwxohIzgdANfbgMaAt64BjVrWCyi2DdJdYF3x8YN9Nb9xtpaR3jbsrHUfoVs_H9ykou6R5b5hmqCCTNq1yztunJkwZHc_AbZ3FV5z_AKFpXgEFxLyRVeow7_SU_vhRzv6mGc57vl6nfN4lAvzJ-Xdy58_jy3hJl1R3LERnHEP2L1TZZ9iA6W0EHBH7xDpVKtOoSwm77ZSxusT1HnX-ddkmXmzQcBxSxsVTR7elkmK90mOYdPyxWbvlgl269Zd1eB-dVgh88X8J67VC8hs_lsYVzDjV5faDEmzVBIGYRNj-zDUGLtUvyKofm7ww=w935-h767-no?authuser=0)

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
