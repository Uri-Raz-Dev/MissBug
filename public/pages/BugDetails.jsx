const { useState, useEffect } = React
const { Link, useParams } = ReactRouterDOM

import { bugService } from '../services/bug.service.js'
import { showErrorMsg } from '../services/event-bus.service.js'


export function BugDetails() {

    const [bug, setBug] = useState(null)
    const { bugId } = useParams()

    useEffect(() => {
        bugService.getById(bugId)
            .then(bug => {
                setBug(bug)
            })
            .catch(err => {
                showErrorMsg('Cannot load bug')
            })
    }, [])

    if (!bug) return <h1>loadings....</h1>
    return <div className="bug-details">
        <h3>Bug Details 🐛</h3>
        <h4>{bug.title}</h4>
        <p>Created At: {new Date(bug.createdAt).toString()}</p>
        <p>Severity: <span>{bug.severity}</span></p>
        {<p>Description: {bug.description}</p>}
        <p>Labels: {bug.labels.join()}</p>
        <Link to="/bug">Back to List</Link>
    </div>

}

