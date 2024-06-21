const { useState, useEffect } = React

export function BugFilter({ filterBy, onSetFilterBy }) {

    const [filterByToEdit, setFilterByToEdit] = useState(filterBy)

    console.log(filterByToEdit);

    function handleChange({ target }) {
        const field = target.name
        let value = target.value

        switch (target.type) {
            case 'number':
            case 'range':
                value = +value || ''
                break;

            case 'checkbox':
                value = target.checked
                break


            default:
                break
        }

        setFilterByToEdit(prevFilter => ({ ...prevFilter, [field]: value }))
    }

    function onSubmitFilter(ev) {
        ev.preventDefault()
        onSetFilterBy(filterByToEdit)
    }



    function clearFilter() {
        return onSetFilterBy({
            title: '',
            minSeverity: '',
            createdAt: 0,
            labels: ''
        })
    }

    function handleDateSort(value) {
        setFilterByToEdit((prevFilter) => ({ ...prevFilter, createdAt: value }))
        onSetFilterBy({ ...filterByToEdit, createdAt: value })
    }


    const { title, minSeverity, createdAt, labels } = filterByToEdit

    return (
        <section className="bug-filter">
            <h2>Filter Our Bugs</h2>
            <form onSubmit={onSubmitFilter}>
                <label htmlFor="title">Title: </label>
                <input value={title} onChange={handleChange} type="text" placeholder="By title" id="title" name="title" />

                <label htmlFor="minSeverity">Min Severity: </label>
                <input value={minSeverity} onChange={handleChange} type="number" placeholder="By Min Severity" id="minSeverity" name="minSeverity" />


                <label htmlFor="all">All </label>
                <input onChange={() => handleDateSort(0)} type="radio" id="all"
                    name="createdAt" checked={createdAt === 0}></input>

                <label htmlFor="newest">Newest </label>
                <input onChange={() => handleDateSort(-1)} type="radio" id="newest"
                    name="createdAt" checked={createdAt === -1}></input>

                <label htmlFor="oldest">Oldest </label>
                <input onChange={() => handleDateSort(1)} type="radio" id="oldest"
                    name="createdAt" checked={createdAt === 1}></input>


                <label htmlFor="labels">Labels: </label>
                <input value={labels} onChange={handleChange} type="text" id="labels" name="labels" />


                <button>Set Filter</button>
                <button onClick={clearFilter}>Clear Filter</button>
            </form>
        </section>
    )
}