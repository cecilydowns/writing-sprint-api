const mongoose = require('mongoose')
const Sprint = mongoose.model('Sprint')

exports.homePage = (req, res) => {
    const message = { message: 'Looks like I work' }
    res.json(message)
};
  
exports.createSprint = async (req, res) => {
    
    const sprint = await (new Sprint(req.body)).save()
    res.json(req.body)
}

exports.getSprints = async (req, res) => {
    const sprints = await Sprint.find()
    res.json(sprints)
}