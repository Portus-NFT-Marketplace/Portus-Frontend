import Artwork from "./Artwork";
const TopArtworks = () => {

    const data = [{
        name: "Rainbow Sky",
        url: "https://www.photobox.co.uk/blog/wp-content/uploads/2019/07/rainbow_1500.jpg",
        price: "1.32",
        views: "98"
    },
    {
        name: "Chicken or Bird",
        url: "https://www.hellowonderful.co/ckfinder/userfiles/images/134_sycheva_planet_5_suns__35846_1405327849_1280_1280.jpg",
        price: "0.95",
        views: "48"
    },
    {
        name: "Under the Sea",
        url: "https://media.istockphoto.com/photos/underwater-world-of-the-coral-reef-picture-id501192746?k=20&m=501192746&s=612x612&w=0&h=YhtyFVKh97fywXmR6Cg9S0IHLCrKlxAQbVWX7oUnTP0=",
        price: "0.92",
        views: "42"
    } ]

    function createCard(json) {
    
        return (
          <Artwork
            url={json.url}
            name={json.name}
          />
        );
    }

    return(
        <div>
            <div className="flex w-full justify-center items-center p-6">
                <b style={{ fontSize: "2.5rem" }}>Top artworks over last 7 days</b>
            </div>
            <div className="flex flex-row justify-center">
                    { data.map(createCard) }
            </div>
        </div>
        
    );
}

export default TopArtworks;