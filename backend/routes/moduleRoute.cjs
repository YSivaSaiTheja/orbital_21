const express = require('express')
const router = express.Router()
const computingModules = require('../models/modules.cjs')

// Function to get all the data according to the module code
const getModData = (modCode) => {
    let query = computingModules.find({ "moduleCode" : modCode })
    query.exec((error, modData) => {
        if (error) {
            console.log('Error')
        }
        return modData
    })
}

console.log(getModData("CS1010"))

// Function to perform regex on the string of prereqs
const decipher = (string) => {
    let myRe = new RegExp(/[A-Z]{2}[0-9]{4}[A-Z]{0,1}/g)
    let myArr = []
    var match = myRe.exec(string)
    while (match != null) {
        myArr.push(match[0])
        match = myRe.exec(string)
    }
    return myArr
}

// Function to get prerequisite
const getPrereqList = (modData) => {
    if (modData.hasOwnProperty('prerequisite')) {
        let prerequisite = modData.prerequisite
        let prereqArr = decipher(prerequisite)
        return prereqArr
    }
    else
        return []
}

// Function to get preclusion
const getPrecList = (modData) => {
    if (modData.hasOwnProperty('preclusion')) {
        let preclusion =  modData.preclusion
        let precArr = decipher(preclusion)
        return precArr
    }
    else
        return []
}

// Functions to determine if a module can be taken
const can_take = (mod, taken_list) => {
    // Getting the list of prerequisite modules from the mod_dict
    let prereq_list = getPrereqList(getModData(mod))
    // Include all the preclusion mods in the taken_list as well
    let precList = getPrecList(getModData(mod))
    // Check if there are any mods in the prereq_list not in the taken_list
    for (let module in prereq_list) {
        if (!taken_list.includes(module)) {
            // Check if module is included in preclusion list
            if (precList.includes(module)) {
                return true
            } else {
                return false
            }
        }
    }
}

// Creating a queue for the BFS algorithm
function Queue() {
    this.modules = []
}
Queue.prototype.enqueue = mod => {
    this.modues.push(mod)
}
Queue.prototype.dequeue = () =>  {
    return this.modules.shift()
}
Queue.prototype.isEmpty = () => {
    return this.modules.length === 0
}
Queue.prototype.length = () => {
    return this.modules.length
}

// Function to determine if iip can be taken
const can_take_iip = (taken_list) => {
    if (taken_list.includes('IS2101') || taken_list.includes('CS2101')) {
        if (taken_list.includes('IS1105') || taken_list.includes('IS3101') || taken_list.includes('IS3103')) {
            if (taken_list.includes('IS2103') || taken_list.includes('CS2107') || ['BT2102', 'BT2101'].every(mod => taken_list.includes(mod)))
                return true
        }
    } return false
}

// Function to return the next mod to be taken
const next_mod_needed = (mod, taken_list) => {
    // Initialise the queue
    let q = new Queue()
    q.enqueue(mod)
    let visited = {}

    // Iterating through the entire ModuleDict
    for (let obj in computingModules) {
        visited[obj.moduleCode] = false
    }

    // Marking all the taken mods as visited
    for (let module in taken_list) {
        visited[module] = true
    }

    // Performing BFS
    while (!q.isEmpty) {
        let mod_to_take = q.dequeue
        const prereq_list = getPrereqList(getModData(mod_to_take))

        for (let module in prereq_list) {
            if (!visited[module]) {
                if (can_take(module, taken_list)) {
                    return module
                } else {
                    visited[module] = true
                    q.enqueue(module)
                }
            }
        }
    } return 'dummy'
}

// Function to generate the list needed for iip
const lst_needed_for_iip = (iip_mods, taken_list) => {
    let iip_list = []
    for (let mod in iip_mods) {
        let next_mod = next_mod_needed(mod, taken_list)
        if (next_mod !== 'dummy') {
            iip_list.push(next_mod)
            // Flag this as a taken mod
            taken_list.push(next_mod)
        }
    }
    let result = iip_list + taken_list
    return result
}

// Function to determine the prereq mods needed for sep
const lst_needed_for_sep = (sep_mods, taken_list) => {
    let sep_prereq = []
    for (let mod in sep_mods) {
        let next_mod_to_take = next_mod_needed(mod, taken_list)
        if (next_mod_to_take !== 'dummy') {
            sep_prereq.push(next_mod_to_take)
            // Add this mod to taken list
            taken_list.push(next_mod_to_take)
        }
    }
    return sep_prereq
}

// Function to get the prerequisite level for a mod
const getLevel = (mod) => {
    let deepest = 0
    let prereq_list = getPrereqList(mod)
    for (let prereq_mod in prereq_list) {
        deepest = Math.max(deepest, getLevel(prereq_mod))
    }
    return deepest + 1
}

// Function to sort an object literal by value
const sortByValue = (unsortedObj) => {
    unsortedObj.sort(function(a, b) {
        return a.level - b.level
    })
}

// Function to create a module mapping
const createLevelMapping = (mod_list) => {
    let modMap = []
    for (let mod in mod_list) {
        let jsonObj = { "module" : mod, "level" : getLevel(mod) }
        modMap.push(jsonObj)
    }
    let sortedModMap = sortByValue(modMap)
    return sortedModMap
}

// Function to group a dictionary by level
const groupByLevel = (modMap, key, completedSems) => {
    return modMap.reduce((groupedMap, mod) => {
        (groupedMap[mod[key]] = groupedMap[mod[key] + completedSems] || []).push(mod)
        return groupedMap
    }, {})
}

// Function to generate a list of all prereqs that need to be taken
const gen_prereq_lst = (taken_list, to_take_progs, sep_mods, iip_mods) => {
    var result = []
    for (let obj in to_take_progs) {
        if (obj.progName === 'SEP' || obj.progName === 'NOC') {
            const sep_lst = lst_needed_for_sep(sep_mods, taken_list)
            result = result.concat(sep_lst)
        } if (obj.progName === 'IIP' && !can_take_iip(taken_list)) {
            const iip_lst = lst_needed_for_iip(iip_mods, taken_list)
            result = result.concat(iip_lst)
        }
    }
    // Remove duplicate modules
    result = [...new Set(result)]
    return result
}

// Function to allocate the modules according to the sems
const allocate = (takenList, to_take_progs, sep_mods, iip_mods, completedSems) => {
    // Generate the list of prereqs
    let full_lst = gen_prereq_lst(takenList, to_take_progs, sep_mods, iip_mods)

    // Create a module mapping
    let modMap = createLevelMapping(full_lst)
    let allocation = groupByLevel(modMap, completedSems)
    return allocation
}

router.route('/plan').get((req, res) => {
    // Extract all the data from the req object
    const sems = req.body.sems
    const takenList = req.body.takenList
    const progList = req.body.progList
    const sepList = req.body.sepList
    const iipList = req.body.iipList

    let allocation = allocate(takenList, progList, sepList, iipList, sems)
    res.json(allocation)
})

module.exports = router
