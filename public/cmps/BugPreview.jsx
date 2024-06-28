const { Link } = ReactRouterDOM


export function BugPreview({ bug }) {
    const labels = Array.isArray(bug.labels) ? bug.labels.join(', ') : '';
    return <section className="bug-preview">
        <h4>{bug.title}</h4>
        <p>{new Date(bug.createdAt).toString()}</p>
        {bug.owner &&
            <h4>
                Owner: <Link to={`/user/${bug.owner._id}`}>{bug.owner.fullname}</Link>
            </h4>
        }
        <h1>🐛</h1>
        <p>Severity: <span>{bug.severity}</span></p>
        <p>Labels:{labels}</p>
    </section>
}