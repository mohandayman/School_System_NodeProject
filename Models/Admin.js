const mongoose = require("mongoose");
const AutoIncreamentPackege = require("mongoose-plugin-autoinc");
// AutoIncreamentPackege.initialize(mongoose.connection)
const AdminSchema = mongoose.Schema({
  _id: { type: Number, required: true },
  UserName: {
    type: String,
    Required: true,
    validate: {
      validator: function (v) {
        return /^([a-zA-Z0-9_\-\.]+)@([a-zA-Z0-9_\-\.]+)\.([a-zA-Z]{2,5})$/.test(
          v
        );
      },
      message: (props) => `${props.value} is not a valid email address!`,
    },
  },
  Password: { type: String, required: true},
  gender: { enum: ["Male , Female"], type: String },
  InstructorId: { type: Number, ref: "Instructor" },
  ChildrenIds: [{ type: Number, ref: "Child" }],
});

AdminSchema.plugin(AutoIncreamentPackege.plugin, {
  model: "Admin",
  field: "_id",
  startAt: 1,
  incrementBy: 1,
});

mongoose.model("Admin", AdminSchema);
