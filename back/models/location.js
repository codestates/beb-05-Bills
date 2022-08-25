module.exports = (sequelize, DataTypes) => {
  const Location = sequelize.define(
    "Location",
    {
      x: DataTypes.DECIMAL(10, 7),
      y: DataTypes.DECIMAL(10, 7),
    },
    { charset: "utf8", collate: "utf8_general_ci" }
  );
  Location.associate = (db) => {
    db.Location.belongsTo(db.Post);
  };
  return Location;
};
