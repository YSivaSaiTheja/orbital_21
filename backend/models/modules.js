const mongoose = require('mongoose');
const uniqueValidator = require("mongoose-unique-validator");
const Schema = mongoose.Schema;

const moduleSchema = new Schema({
    moduleCode: { type: String, required: true, unique: true },
    title: { type: String, required: true },
    description: { type: String, required: true},
    moduleCredit: { type: String, required: true },
    department: { type: String, required: true },
    faculty: { type: String, required: true },
    prerequisite: { type: String },
    preclusion: { type: String },
    workload: { type: [Number], required: true},
    attributes: { type: Map },
    semesterDate: {type: Array},
});

moduleSchema.plugin(uniqueValidator);

module.exports = mongoose.model("computingModules", moduleSchema, 'computingModules');





