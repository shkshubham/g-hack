import { connect, Mongoose, Model, Document } from "mongoose";
import { DB_URL, USER_PASSWORD } from "./configs";
import UserModelSchema from "./models/User";
import SubmissionModelSchema from "./models/Submission";
import GroupModelSchema from "./models/Group";
import bcrypt from "bcrypt";
class Database {
  static mongoose: Mongoose;
  static User: Model<any, {}>;
  static Group: Model<any, {}>;
  static Submission: Model<any, {}>;
  static initModel() {
    this.User = Database.mongoose.model("User", UserModelSchema);
    this.Submission = Database.mongoose.model("Submission", SubmissionModelSchema);
    this.Group = Database.mongoose.model("Group", GroupModelSchema);
    this.initFakeData();
  }

  static init() {
    return new Promise((resolve, reject) => {
      connect(DB_URL, {
        useNewUrlParser: true,
        useUnifiedTopology: true,
      }).then((mongoose) => {
        console.log("Mongo connected");
        Database.mongoose = mongoose;
        this.initModel();
        return resolve(true);
      }).catch((error) => {
        console.log("error", error);
        return reject(error);
      });
    });
  }
  static async initFakeData() {
    const email = "shk.shubham@gmail.com";
    const foundUser: any = await this.User.findOne({
      email
    }).lean();
    if (!foundUser) {
      let user = await this.User.create({
        name: "Shubham Shukla",
        email,
        password: await bcrypt.hash(USER_PASSWORD, 8)
      });
      const group = await this.Group.create({
        members: [user.id],
        name: "Test Group"
      });
      delete user.password;
      return {group, user};
    }
    delete foundUser.password;
    return {user: foundUser};
  }
}

export default Database;