import { utilService } from "./util.service.js"

export const bugService = {
    query,
    getById,
    remove,
    save
}

var bugs = utilService.readJsonFile('./data/bug.json')

function query() {
    return Promise.resolve(bugs)
}

function getById(bugId) {
    const bug = bugs.find(bug => bug._id === bugId)
    return Promise.resolve(bug)
}

function remove(bugId) {
    const idx = bugs.findIndex(bug => bug._id === bugId)
    bugs.splice(idx, 1)

    return _saveBugsToFile()
}

function save(bugsToSave) {
    if (bugsToSave._id) {
        const idx = bugs.findIndex(bug => bug._id === bugsToSave._id)
        bugs.splice(idx, 1, bugsToSave)
    } else {
        bugsToSave._id = utilService.makeId()
        bugs.push(bugsToSave)
    }
    return _saveBugsToFile()
        .then(() => bugsToSave)
}

function _saveBugsToFile() {
    return utilService.writeJsonFile('./data/bug.json', bugs)
}
