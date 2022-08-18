module.exports = (sequelize, DataTypes) => {
  const Location = sequelize.define(
    // 스키마
    "Location",
    {
      x: DataTypes.DECIMAL(10, 7),
      y: DataTypes.DECIMAL(10, 7),
    },
    // 세팅값
    { charset: "utf8", collate: "utf8_general_ci" }
  );
  Location.associate = (db) => {
    db.Location.belongsTo(db.Post);
  };
  return Location;
};
