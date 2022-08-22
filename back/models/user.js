module.exports = (sequelize, DataTypes) => {
  // model(테이블) 이름인 User가 자동으로 소문자복수형이 되어 mysql에 저장된다.
  const User = sequelize.define(
    "User",
    // 첫 번째 인자: 스키마
    {
      email: {
        type: DataTypes.STRING(30),
        allowNull: false, // 필수
        unique: true, // 고유한 값
      },
      nickname: {
        type: DataTypes.STRING(30),
        allowNull: false, // 필수
      },
      password: {
        type: DataTypes.STRING(100),
        allowNull: false, // 필수
      },
      userType: {
        type: DataTypes.STRING(10),
        allowNull: true, // 임시로 true
      },
    },
    // 두 번째 인자: 세팅값
    {
      charset: "utf8",
      collate: "utf8_general_ci", // 한글 저장
    }
  );
  User.associate = (db) => {
    db.User.hasOne(db.Wallet);
    db.User.hasMany(db.Post);
    db.User.hasMany(db.Comment);
    db.User.hasMany(db.Nft);
    db.User.belongsToMany(db.Post, { through: "Likes", as: "Liked" });
    db.User.belongsToMany(db.User, {
      through: "Follow",
      as: "Followers",
      foreignKey: "FollowingId",
    });
    db.User.belongsToMany(db.User, {
      through: "Follow",
      as: "Followings",
      foreignKey: "FollowerId",
    });
  };
  return User;
};
