import { utilService } from "./util.service.js"
import fs from 'fs'
import { loggerService } from "./logger.service.js"
export const bugService = {
    query,
    getById,
    remove,
    save
}

var bugs = utilService.readJsonFile('./data/bug.json')

function query(filterBy = {}) {
    let filteredBugs = bugs

    if (filterBy.title) {
        const regExp = new RegExp(filterBy.title, 'i')
        filteredBugs = filteredBugs.filter(bug => regExp.test(bug.title))
    }

    if (filterBy.minSeverity) {
        filteredBugs = filteredBugs.filter(bug => bug.severity >= filterBy.minSeverity)
    }

    if (filterBy.createdAt === -1) {
        filteredBugs = filteredBugs.sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt))
    } else if (filterBy.createdAt === 1) {
        filteredBugs = filteredBugs.sort((a, b) => new Date(a.createdAt) - new Date(b.createdAt))
    }

    if (filterBy.labels) {
        filteredBugs = filteredBugs.filter(bug => bug.labels.includes(filterBy.labels))
    }

    const startIdx = filterBy.page * filterBy.pageSize
    const endIdx = startIdx + filterBy.pageSize
    filteredBugs = filteredBugs.slice(startIdx, endIdx)

    return Promise.resolve(filteredBugs)
}
function getById(bugId) {
    const bug = bugs.find(bug => bug._id === bugId)
    return Promise.resolve(bug)
}

function remove(bugId, loggedinUser) {
    const idx = bugs.findIndex(bug => bug._id === bugId)
    if (idx === -1) return Promise.reject('Cannot find bug')
    const bug = bugs[idx]
    if (!loggedinUser.isAdmin && bug.owner._id != loggedinUser._id) {
        return Promise.reject('Not your bug')
    }
    bugs.splice(idx, 1)
    return _saveBugsToFile()
}


function save(bug, loggedinUser) {
    if (bug._id) {
        const updateBug = bugs.find(bug => bug._id === bug._id)
        if (!loggedinUser && updateBug.owner._id != loggedinUser._id) {
            return Promise.reject('Not your bug')
        }
        updateBug.severity = bug.severity
        updateBug.title = bug.title
        updateBug.description = bug.description
        updateBug.labels = bug.labels
        updateBug.owner = bug.owner || updateBug.owner

    } else {
        bug._id = utilService.makeId()
        bug.owner = loggedinUser
        bugs.push(bug)
    }
    return _saveBugsToFile().then(() => bug)
}


function _saveBugsToFile() {
    return new Promise((resolve, reject) => {
        const data = JSON.stringify(bugs, null, 2)
        fs.writeFile('data/bug.json', data, (err) => {
            if (err) {
                loggerService.error('Cannot write to bugs file', err)
                return reject(err)
            }
            resolve()
        })
    })
}

