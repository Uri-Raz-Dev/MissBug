

export function BugPreview({ bug }) {

    const labels = bug.labels.join(',');
    console.log(labels);
    return <artice>
        <h4>{bug.title}</h4>
        <p>{new Date(bug.createdAt).toString()}</p>
        <h1>🐛</h1>
        <p>Severity: <span>{bug.severity}</span></p>
        <p>{labels}</p>
    </artice>
}