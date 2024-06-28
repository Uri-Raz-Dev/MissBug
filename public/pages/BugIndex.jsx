import { bugService } from '../services/bug.service.js'
import { showSuccessMsg, showErrorMsg } from '../services/event-bus.service.js'
import { BugList } from '../cmps/BugList.jsx'
import { BugFilter } from '../cmps/BugFilter.jsx'

const { useState, useEffect } = React

export function BugIndex() {
  const [bugs, setBugs] = useState([])
  console.log(bugs);
  const [filterBy, setFilterBy] = useState(bugService.getDefaultFilter())
  useEffect(() => {
    bugService.query(filterBy)
      .then(bugs => setBugs(bugs))
      .catch(err => console.log('err:', err))
  }, [filterBy])



  function onRemoveBug(bugId) {
    bugService.remove(bugId)
      .then(() => {
        console.log('Deleted Succesfully!')
        setBugs(prevBugs => prevBugs.filter((bug) => bug._id !== bugId))
        showSuccessMsg('Bug removed')
      })
      .catch((err) => {
        console.log('Error from onRemoveBug ->', err)
        showErrorMsg('Cannot remove bug')
      })
  }


  function onAddBug() {
    const bug = {
      title: prompt('Bug title?'),
      severity: +prompt('Bug severity?'),
      description: prompt('Add description'),
      createdAt: new Date().toISOString(),
      labels: prompt('Add labels (comma separated)').split(',').map(label => label.trim()).filter(Boolean)
    }

    bugService
      .save(bug)
      .then((savedBug) => {
        console.log('Added Bug', savedBug)
        setBugs(prevBugs => [savedBug, ...prevBugs])
        showSuccessMsg('Bug added')
      })
      .catch((err) => {
        console.log('Error from onAddBug ->', err)
        showErrorMsg('Cannot add bug')
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




  function onSetFilterBy(filterBy) {
    setFilterBy(filterBy)
  }


  return (
    <main>
      <h3>Bugs App</h3>
      <main>
        <button onClick={onAddBug}>Add Bug ⛐</button>
        <BugFilter filterBy={filterBy} onSetFilterBy={onSetFilterBy} />
        <BugList bugs={bugs} onRemoveBug={onRemoveBug} onEditBug={onEditBug} />
      </main>
    </main>
  )
}
