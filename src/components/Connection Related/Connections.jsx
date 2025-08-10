import React, { useEffect } from 'react'
import axios from 'axios'
import { BASE_URL } from '../../utils/constants'
import { useDispatch, useSelector } from 'react-redux'
import { addConnections } from '../../utils/connectionSlice'
import ConnectionCard from './ConnectionCard'

const Connections = () => {
  const dispatch = useDispatch();
  const connections = useSelector(state => state.connection)
  const fetchConnections = async () => {
    try {
      const res = await axios.get(BASE_URL + "/request/connections", {
        withCredentials: true,
      })
      console.log(res.data.data)
      dispatch(addConnections(res.data.data))
    } catch (err) {
      console.log(err)
    }
  }
  useEffect(() => {
    fetchConnections()
  }, [])
  if (!connections) {
    return <div className="flex justify-center my-10">
      <h1 className='text-3xl font-bold text-center'></h1>


    </div>
  }
  if (connections.length === 0) {
    return <div className="flex justify-center my-10">
      <h1 className='text-3xl font-bold text-center'>No Connections Found</h1>
    </div>
  }
  return (
    <div className="flex flex-wrap justify-center items-center gap-6 my-10 px-4">
      {connections.map((user) => (
        <ConnectionCard
          key={user._id}
          firstName={user.firstName}
          lastName={user.lastName}
          skills={user.skills}
          about={user.about}
          photoURL={user}
        />
      ))}
    </div>
  )
}

export default Connections