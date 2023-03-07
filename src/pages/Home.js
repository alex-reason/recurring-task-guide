import GuideList from "../components/GuideList";
// hooks
import { useCollection } from "../hooks/useCollection";
import { useAuthContext } from "../hooks/useAuthContext";

const Home = () => {
  const { user } = useAuthContext()
  const { documents: data, isPending, error } = useCollection('guides');

  return (
    <div className='home'>
      <h1>Guides and templates for regular or recurring tasks</h1>
      {user &&
        <>
          {error && <p className='centered'>{error}</p>}
          {isPending && <p className='centered'>Loading</p>}
          {data && <GuideList data={data} />}
        </>
      }
      {!user && <p className='centered'>Please login to view the guides and templates</p>}

    </div>
  )
};

export default Home;