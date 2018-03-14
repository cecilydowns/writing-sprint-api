const mongoose = require('mongoose')
const Project = mongoose.model('Project')
  
exports.createProject = async (req, res) => {
    req.body.user = req.user._id
    const newProject = new Project(req.body)    
    await newProject.save()
    res.json({ message: "it worked"})
}

exports.getProjects = async (req, res) => {
    const projects = await Project.find( { 'user': req.user._id })
    res.json(projects)
}