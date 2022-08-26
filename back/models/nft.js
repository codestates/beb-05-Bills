module.exports = (sequelize, DataTypes) => {
  const Nft = sequelize.define(
    // 스키마
    "Nft",
    {
      nftId: DataTypes.INTEGER,
      name: DataTypes.STRING(20),
    },
    // 세팅값
    { charset: "utf8", collate: "utf8_general_ci" }
  );
  Nft.associate = (db) => {
    db.Nft.belongsTo(db.User);
  };
  return Nft;
};
