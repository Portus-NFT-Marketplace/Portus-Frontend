import { Navbar, Welcome, TopArtworks, Footer} from './components'

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
      <Footer />
    </div>
  )
}

export default App