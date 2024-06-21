
const BASE_URL = '/api/bug'

export const bugService = {
    query,
    getById,
    save,
    remove,
    getEmptyBug,
    getDefaultFilter
}




function query(filterBy = {}) {
    return axios.get(BASE_URL)
        .then(res => res.data)
        .then(bugs => {
            if (filterBy.title) {
                const regExp = new RegExp(filterBy.title, 'i')
                bugs = bugs.filter(bug => regExp.test(bug.title))
            }
            if (filterBy.minSeverity) {
                bugs = bugs.filter(bug => bug.severity >= filterBy.minSeverity)
            }
            if (filterBy.createdAt === -1) {
                bugs = bugs.sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt));
            } else if (filterBy.createdAt === 1) {
                bugs = bugs.sort((a, b) => new Date(a.createdAt) - new Date(b.createdAt));
            }
            if (filterBy.labels) {
                bugs = bugs.filter(bug => bug.labels.includes(filterBy.labels))
            }
            const startIdx = filterBy.page * filterBy.pageSize
            const endIdx = startIdx + filterBy.pageSize
            bugs = bugs.slice(startIdx, endIdx)
            return bugs
        })
}

function getById(bugId) {
    return axios.get(BASE_URL + '/' + bugId)
        .then(res => res.data)
}

function remove(bugId) {
    return axios.delete(BASE_URL + '/' + bugId)
        .then(res => res.data)
}

function save(bug) {
    if (bug._id) {
        return axios.put(BASE_URL + '/' + bug._id, bug)
            .then(res => res.data)
    } else {
        return axios.post(BASE_URL, bug)
            .then(res => res.data)
    }
}

function getEmptyBug(title = '', severity = '', createdAt = '', description = '', labels = []) {
    return { title, description, severity, createdAt, labels }
}

function getDefaultFilter() {
    return { title: '', severity: '', labels: '', page: 0, pageSize: 5, createdAt: 0 }
} 
