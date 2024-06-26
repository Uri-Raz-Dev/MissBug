
const BASE_URL = '/api/bug/'

export const bugService = {
    query,
    getById,
    save,
    remove,
    getEmptyBug,
    getDefaultFilter
}




function query(filterBy = {}) {
    return axios.get(BASE_URL, { params: filterBy })
        .then(res => res.data)
}

function getById(bugId) {
    return axios.get(BASE_URL + bugId)
        .then(res => res.data)
}

function remove(bugId) {
    return axios.delete(BASE_URL + bugId)
        .then(res => res.data)
}

function save(bug) {
    const method = bug._id ? 'put' : 'post'
    const url = bug._id ? BASE_URL + bug._id : BASE_URL
    return axios[method](url, bug)
        .then(res => res.data)
}

function getEmptyBug(title = '', severity = '', createdAt = '', description = '', labels = [],) {
    return { title, description, severity, createdAt, labels }
}

function getDefaultFilter() {
    return { title: '', minSeverity: '', labels: '', page: 0, pageSize: 5, createdAt: 0 }
} 
