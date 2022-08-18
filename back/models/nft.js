module.exports = (sequelize, DataTypes) => {
  const Nft = sequelize.define(
    // 스키마
    "Nft",
    {
      nftId: DataTypes.INTEGER,
    },
    // 세팅값
    { charset: "utf8", collate: "utf8_general_ci" }
  );
  Nft.associate = (db) => {
    db.Wallet.belongsTo(db.User);
    db.Wallet.belongsTo(db.Wallet);
  };
  return Nft;
};
