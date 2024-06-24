

export function BugPreview({ bug }) {
    console.log(bug)
    const labels = Array.isArray(bug.labels) ? bug.labels.join(', ') : '';
    return <section>
        <h4>{bug.title}</h4>
        <p>{new Date(bug.createdAt).toString()}</p>
        <h1>🐛</h1>
        <p>Severity: <span>{bug.severity}</span></p>
        <p>{labels}</p>
    </section>
}