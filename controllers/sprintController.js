const mongoose = require('mongoose')
const Sprint = mongoose.model('Sprint')

exports.homePage = (req, res) => {
    const message = { message: 'Looks like I work' }
    res.json(message)
};
  
exports.createSprint = async (req, res) => {
    req.body.user = req.user._id
    const newSprint = new Sprint(req.body)    
    await newSprint.save()
    res.json({ message: "it worked"})
}

exports.getSprints = async (req, res) => {
    const sprints = await Sprint.find( { 'user': req.user._id })
    res.json(sprints)
}