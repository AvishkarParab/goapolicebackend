const mongoose = require("mongoose");
// gid , pastroute
// pastRoute { "name": "something","routes":[]}
const pastRoutesSchema = new mongoose.Schema(
  {
    gid: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Group",
    },
    pastRoute: [
      {
        name: String,
        routes: [
          {
            place: {
              type: mongoose.Schema.Types.ObjectId,
              ref: "Place",
            },

            ltd: String,
            lgn: String,
          },
        ],
      },
    ],
  },
  { timestamps: true }
);
const pastRoute = mongoose.model("PastRoute", pastRoutesSchema);
module.exports = pastRoute;
