const express = require('express')
const Functionality = require('../Functionality.cjs')
const router = express.Router()

router.route('/plan').get((req, res) => {
    // Extract all the data from the req object 
    const sems = req.body.sems
    const takenList = req.body.takenList
    const progList = req.body.progList
    const sepList = req.body.sepList
    const iipList = req.body.iipList

    let allocation = Functionality.allocate(takenList, progList, sepList, iipList, sems)
    res.json(allocation)
})

module.exports = router