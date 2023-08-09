import{Link} from 'react-router-dom'
import {Image} from 'react-bootstrap'


export default function TvCard({data}) {
console.log('TvCard', data); 
  return (
    <Link to= {`/tvshows/${data.id}`}>
      <Image src= {data?.image?.original } className='tvcard'/>
      <p className="text-black fs-5"> {data.name}</p>
      </Link>
  )
}
