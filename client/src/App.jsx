import { Navbar, Welcome, TopArtworks} from './components'

const App = () => {

  return (
    <div className="min-h-screen">
      <div className="gradient-bg-nav">
        <Navbar />
      </div>
      <div className="gradient-bg-welcome">
        <Welcome />
      </div>
      <TopArtworks />
    </div>
  )
}

export default App