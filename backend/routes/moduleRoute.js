const express = require('express')
const router = express.Router()
const computingModules = require('../models/modules.js')

const decipher = (string) => {
    let myRe = new RegExp(/[A-Z]{2}[0-9]{4}[A-Z]{0,1}/g)
    let finalRes = []
    // Nested splits to identify prerequisite list
    let commaSplit = string.split(',')
    for (let seg of commaSplit) {
        // Split on and
        let andSplit = seg.split('and')
        for (let subSeg of andSplit) {
            let orSplit = subSeg.split('or')
            let listItem = orSplit[0]
            var match = myRe.exec(listItem)
            while (match != null) {
                finalRes.push(match[0])
                match = myRe.exec(listItem)
            }
        }
    }
    return finalRes
}

// Creating a queue for the BFS algorithm (keep)
class Queue {
    constructor() {
        this.modules = []
    }
    enqueue = mod => {
        this.modules.push(mod)
    }
    dequeue = () =>  {
        return this.modules.shift()
    }
    isEmpty = () => {
        return this.modules.length === 0
    }
    qlength = () => {
        return this.modules.length
    }
}


// Function to determine if iip can be taken  (keep)
const can_take_iip = (taken_list) => {
    if (taken_list.includes('IS2101') || taken_list.includes('CS2101')) {
        if (taken_list.includes('IS1105') || taken_list.includes('IS3101') || taken_list.includes('IS3103')) {
            if (taken_list.includes('IS2103') || taken_list.includes('CS2107') || ['BT2102', 'BT2101'].every(mod => taken_list.includes(mod)))
                return true
        }
    } return false
}

// Function to determine the prereqs for iip
const lstForIip = (iipMods, takenList, dbObj) => {
    let iipPrereq = []
    let newTaken = takenList
    for (let module of iipMods) {
        let next_Mod = nextMod(module.modName, newTaken, dbObj)
        if (next_Mod !== 'dummy') {
            iipPrereq.push(next_Mod)
            // Add to takenList
            newTaken.push({
                id : Math.floor(Math.random() * 100) + 1,
                mod : next_Mod,
                grade : 'b-'
            })
        }
    }
    return iipPrereq
}

// Function to determine the prereq mods needed for sep
const lstForSep = (sepMods, takenList, dbObj) => {
    let sepPrereq = []
    let newTaken = takenList
    for (let module of sepMods) {
        let next_Mod = nextMod(module.modName, newTaken, dbObj)
        if (next_Mod !== 'dummy') {
            sepPrereq.push(next_Mod)
            // Add to takenList
            newTaken.push({
                id : Math.floor(Math.random() * 100) + 1,
                mod : next_Mod,
                grade : 'b-'
            })
        }
    }
    return sepPrereq
}

// Function to generate a list of all prereqs that need to be taken
const genFullPrereq = (takenList, progsList, sepMods, iipMods, dbObj) => {
    let result = []
    for (let prog of progsList) {
        if (prog.progName === 'sep' || prog.progName === 'noc') {
            const sepList = lstForSep(sepMods, takenList, dbObj)
            result = result.concat(sepList)
        } if (prog.progName === 'iip') {
            const iipList = lstForIip(iipMods, takenList, dbObj)
            result = result.concat(iipList)
        }
    }
    let finalRes = [...new Set(result)]
    return finalRes
}

// Function to get the prerequisite level for a mod
const getLevel = (modCode, dbObj) => {
    let deepest = 0
    if (dbObj[modCode] !== '') {
        const prereqString = dbObj[modCode]['prerequisite']
        const prereqList = decipher(prereqString)
        const prereqArr = Array.from(prereqList)
        for (let prereqMod of prereqArr) {
            deepest = Math.max(deepest, getLevel(prereqMod, dbObj))
        }
    }
    return deepest + 1
}

// Function to sort an object literal by value
const sortByValue = (unsortedObj) => {
    unsortedObj.sort(function(a, b) {
        return a['level'] - b['level']
    })
}

// Function to create a module mapping
const createLevelMapping = (mod_list, dbObj) => {
    const modMap = []
    for (let mod of mod_list) {
        let jsonObj = { "module" : mod, "level" : getLevel(mod, dbObj) }
        modMap.push(jsonObj)
    }
    sortByValue(modMap)
    return modMap
}

// Function to group a dictionary by level
const groupByLevel = (modMap, completedSems) => {
    const finalRes = []
    for (let mod of modMap) {
        const jsonObj = { sem : mod['level'] + completedSems, moduleToTake : mod.module }
        finalRes.push(jsonObj)
    }
    return finalRes
}

// Function to allocate the modules according to the sems
const allocate = (takenList, to_take_progs, sepMods, iipMods, completedSems, dbObj) => {
    // Generate the list of prereqs
    let full_lst = genFullPrereq(takenList, to_take_progs, sepMods, iipMods, dbObj)
    let modMap = createLevelMapping(full_lst, dbObj)
    let preAllocation = groupByLevel(modMap, completedSems)

    const allocation = []
    let curSem = preAllocation[0].sem
    let curSemMods = []
    const lastMod = preAllocation[preAllocation.length - 1]['moduleToTake']
    for (let module of preAllocation) {
        if (curSem === module.sem && curSemMods.length < 5) {
            curSemMods.push(module.moduleToTake)
            if (module.moduleToTake === lastMod) {
                const allocationObj = {
                    semester : curSem,
                    modsToTake : curSemMods
                }
                allocation.push(allocationObj)
            }
        } else {
            const allocationObj = {
                semester : curSem,
                modsToTake : curSemMods
            }
            allocation.push(allocationObj)
            curSemMods = []
            curSemMods.push(module.moduleToTake)
            if (curSem !== module.sem) {
                curSem = module.sem
            }
        }
    }
    return allocation
}

router.route('/post').post(async (req, res) => {
    const completedSems = req.body.sems
    const takenList = req.body.takenList
    const progList = req.body.progList
    const sepList = req.body.sepList
    const iipList = req.body.iipList

    const numCompleted = parseInt(completedSems, 10)
    // Removing dummy data
    takenList.shift()
    progList.shift()
    sepList.shift()
    iipList.shift()

    console.log(completedSems)

    const dbObj = await createDatabaseObj()
    try {
        let allocation = allocate(takenList, progList, sepList, iipList, numCompleted, dbObj)
        res.json(allocation)
    } catch(error) {
        console.log(error.message)
    }
})

// Function to create a database object (works)
const createDatabaseObj = async () => {
    let modObj = await computingModules.find({}).select({
        '_id' : 0,
        'moduleCode' : 1,
        'moduleCredit' : 1,
        'prerequisite' : 1,
        'preclusion' : 1,
    })
    let finalObj = {}
    modObj.forEach((module) => {
        finalObj[module.moduleCode] = module
    })
    for (const [key, value] of Object.entries(finalObj)) {
        if (value['prerequisite'] === undefined) {
            value['prerequisite'] = ''
        }
    }
    for (const [key, value] of Object.entries(finalObj)) {
        if (value['preclusion'] === undefined) {
            value['preclusion'] = ''
        }
    }
    return finalObj
}

// Function to determine if a module can be taken (works)
const canTake = (modCode, takenList, dbObj) => {
    const takenArr = takenList.map((takenMod) => takenMod.mod)
    const modValue = dbObj[modCode]
    // Identifying if a mod is 1K
    let oneK = false
    for (let char in modCode) {
        let typeCasted = Number(char)
        if (!isNaN(typeCasted) && typeCasted === 1) {
            oneK = true
            break
        }
    }
    if (modValue['prerequisite'] === '' || oneK) {
        return true
    } else {
        const prereqArr = Array.from(decipher(modValue['prerequisite']))
        const fullPrereq = prereqArr
        for (let index in prereqArr) {
            const prereq = prereqArr[index]
            const modData = dbObj[prereq]
            if (modData !== undefined) {
                if (modData['preclusion'] !== '') {
                    let precArr = Array.from(decipher(modData['preclusion']))
                    for (let subIndex in precArr) {
                        const prec = precArr[subIndex]
                        fullPrereq.push(prec)
                    }
                }
            }
        }

        let flag = true
        for (let index2 in takenArr) {
            const takenMod = takenArr[index2]
            if (!fullPrereq.includes(takenMod)) {
                // eslint-disable-next-line no-unused-vars
                flag = false
            }
        }
        return flag
    }
}


// Function to make visited dictionary (works)
const makeVisited = (dbObj, takenList) => {
    let visited = {}

    for (var key in dbObj) {
        visited[key] = false
    }

    for (let takenMod of takenList) {
        visited[takenMod.mod] = true
    }
    return visited
}

// Function to return the list to loop through for nextMod
const getLoopList = (modToTake, takenList, dbObj) => {
    let result = []
    const takenArr = Array.from(takenList).map((module) => module.mod)
    // Getting an array of prerequisites out
    const prereqString = dbObj[modToTake]['prerequisite']
    const prereqList = decipher(prereqString)
    const prereqArr = Array.from(prereqList)
    for (let index in prereqArr) {
        const prereq = prereqArr[index]
        if (prereq !== undefined) {
            if (!takenArr.includes(prereq)) {
                const modValue = dbObj[prereq]
                if (modValue !== undefined) {
                    if (modValue['preclusion'] === '') {
                        result.push(prereq)
                    } else {
                        const precArr = Array.from(decipher(modValue['preclusion']))
                        let flag = false
                        for (let subIndex in takenArr) {
                            const takenMod = takenArr[subIndex]
                            if (precArr.includes(takenMod)) {
                                // eslint-disable-next-line no-unused-vars
                                flag = true
                            }
                        }
                        if (!flag) {
                            result.push(prereq)
                        }
                    }
                }
            }
        }
    }
    return result
}

// Function to return the next module to be taken
const nextMod = (modCode, takenList, dbObj) => {
    const q = new Queue()
    q.enqueue(modCode)

    let visited = makeVisited(dbObj, takenList)

    while (!q.isEmpty()) {
        const modToTake = q.dequeue()
        let loopList = getLoopList(modToTake, takenList, dbObj)
        for (let index in loopList) {
            const module = loopList[index]
            if (!visited[module]) {
                if (canTake(module, takenList, dbObj)) {
                    return module
                } else {
                    visited[module] = true
                    q.enqueue(module)
                }
            }
        }
    }
    return 'dummy'
}

module.exports = router
