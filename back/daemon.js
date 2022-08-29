const cron = require("node-cron");
const web3 = require("../back/utils/web3Handler");
const { User, Wallet, Post } = require("../back/models");
const { tokenContract } = require("../back/utils/contractHandler");

const task1 = cron.schedule("0 0 1 * *", async () => {
  // 주기는 한 달에 한 번
  // db에서 모든 유저의 게시글 정보 겟
  // 유저가 작성한 모든 게시글의 조회수와 따봉으로 점수 산출
  // 점수 기반으로 토큰 지급
  const users = User.findAll();
  users.forEach(async (user) => {
    const wallet = Wallet.findOne({ where: { UserId: user.id } });
    const address = wallet.address;
    let score;
    const posts = Post.findAll({
      where: { UserId: user.id },
      include: [
        {
          model: User,
          as: "Likers",
          attributes: ["id"],
        },
      ],
    });
    posts.forEach((post) => {
      score += post.viewCount;
      score += post.Likers.length;
    });
    await tokenContract.methods
      .transfer(address, score / 1000)
      .send()
      .then(() => wallet.ballance = await tokenContract.methods.balanceOf(address).call());
  });
});

task1.start();