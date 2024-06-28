import { userService } from "../services/user.service.js"
import { BugList } from "../cmps/BugList.jsx"
import { bugService } from "../services/bug.service.js"
const { useState, useEffect } = React
const { useParams, useNavigate, Link } = ReactRouterDOM


export function UserDetails() {
    const [user, setUser] = useState(null)
    const [bugs, setBugs] = useState([])
    const params = useParams()
    const navigate = useNavigate()

    useEffect(() => {
        loadUser()
        loadAllBugs()
    }, [params.userId])

    function loadUser() {
        userService.get(params.userId)
            .then(setUser)
            .catch(err => {
                console.log('err:', err)
                navigate('/')
            })
    }

    function onRemoveBug(bugId) {
        bugService.remove(bugId)
            .then(() => {
                setBugs(prevBugs => prevBugs.filter((bug) => bug._id !== bugId))
            })
            .catch((err) => {
                console.log('Error from onRemoveBug ->', err)
            })
    }

    function onEditBug(bug) {

        const severity = +prompt('New severity?')
        const bugToSave = { ...bug, severity }
        console.log(bugToSave);
        bugService.save(bugToSave)
            .then((savedBug) => {
                console.log('Updated Bug:', savedBug)
                setBugs(prevBugs => prevBugs.map((currBug) =>
                    currBug._id === savedBug._id ? savedBug : currBug
                ))
                showSuccessMsg('Bug updated')
            })
            .catch((err) => {
                console.log('Error from onEditBug ->', err)
                showErrorMsg('Cannot update bug')
            })


    }
    async function loadAllBugs() {
        let allBugs = []
        let page = 0
        let fetchedBugs

        do {
            fetchedBugs = await bugService.query({ page })
            allBugs = allBugs.concat(fetchedBugs)
            page++
        } while (fetchedBugs.length > 0)

        setBugs(allBugs)
    }
    function onBack() {
        navigate('/')
    }

    if (!user) return <div>Loading...</div>

    return (
        <section className="user-details">
            <h1>User {user.fullname}</h1>
            <pre>{JSON.stringify(user, null, 2)}</pre>

            <p>
                Lorem ipsum dolor sit amet consectetur, adipisicing elit. Enim rem
                accusantium, itaque ut voluptates quo? Vitae animi maiores nisi,
                assumenda molestias odit provident quaerat accusamus, reprehenderit
                impedit, possimus est ad?
            </p>
            <button onClick={onBack}>Back</button>
            <h2>User's Bugs</h2>

            <BugList bugs={bugs.filter(bug => bug.owner._id === user._id)} onRemoveBug={onRemoveBug} onEditBug={onEditBug} />
        </section>
    )
}
