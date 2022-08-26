const cron = require("node-cron");
const web3 = require("../back/utils/web3Handler");
const {
  tokenContract,
  nftContract,
  couponContract,
} = require("../back/utils/contractHandler");

const task1 = cron.schedule("0 0 1 * *", async () => {
  // 주기는 한 달에 한 번
  // db에서 모든 유저의 게시글 정보 겟
  // 유저가 작성한 모든 게시글의 조회수와 따봉으로 점수 산출
  // 점수 기반으로 토큰 지급
});
const task2 = cron.schedule("* * * * * *", async () => {
  // 트랜잭션 db에 업로드
});

task1.start();
task2.start();
