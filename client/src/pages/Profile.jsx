import  {useSelector} from 'react-redux'

const Profile = () => {

  const { user } = useSelector((store)=> store.userAuth)

  return (
    <>
      <h1>Profile page goes here</h1>

      <p>{user.followers}</p>
        
    </>
  )
}

export default Profile

/*

  import { useParams } from "react-router-dom"
  import axios from "axios";
  import { useEffect,useState } from "react";

 const [data,setData] = useState(null);
  const params = useParams();

  useEffect(()=>{

    const fetchData = async()=>{
      try {
        const response = await axios.get(`http://localhost:4000/auth/user/${params.id}`);
        setData(response.data); 
      } catch (error) {
        console.error('Error fetching data:', error);
      }
    }

    fetchData();

  },[params.id])


  <p>{JSON.stringify(data)}</p>

*/