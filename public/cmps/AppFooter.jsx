import { showSuccessMsg } from '../services/event-bus.service.js'
const { useEffect } = React

export function AppFooter() {

    useEffect(() => {
        // component did mount when dependancy array is empty
    }, [])

    return (
        <footer className='footer full'>
            <div className='container'>
                <div className='row'>
                    <div className='col text-center'>
                        <p>
                            MissBug © 2024. All rights reserved.
                        </p>
                    </div>
                </div>
            </div>
        </footer>
    )

}