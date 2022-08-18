module.exports = (sequelize, DataTypes) => {
  const Wallet = sequelize.define(
    // 스키마
    "Wallet",
    {
      address: DataTypes.STRING(70),
      privateKey: DataTypes.STRING(70),
      ballance: DataTypes.INTEGER,
    },
    // 세팅값
    { charset: "utf8", collate: "utf8_general_ci" }
  );
  Wallet.associate = (db) => {
    db.Wallet.belongsTo(db.User);
  };
  return Wallet;
};
