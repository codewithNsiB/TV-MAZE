
import { useNavigate } from 'react-router-dom'

export default function Error() {
    const navigate =useNavigate()
  return (
    <div className='text-center mt-5'>
        <h1>Error pls go home</h1>
        <button onClick={() => navigate ('/')}> GO BACK
            </button>
        </div>
  )
}
