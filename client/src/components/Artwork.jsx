import { Card, Button} from "react-bootstrap";
import { useEffect } from "react";
import "aos/dist/aos.css";
import Aos from 'aos';

const Artwork = (prop) => {

    useEffect(() => {
        Aos.init({ duration: 2000 });
    }, [])

    return (
        <Card style={{ width: '18rem', marginRight: '3rem', marginBottom: '3rem', borderWidth: '50'}} data-aos="fade-up">
            <Card.Img className="rounded-lg" variant="top" src={prop.url} style={{ width: '18rem', height: '12rem' }} />
            <Card.Body>
                <Card.Title className="font-bold" style={{marginTop: '1rem'}}>{prop.name}</Card.Title>
                <Card.Text>{prop.price} ETH</Card.Text> 
            </Card.Body>
            <Button style={{marginTop: '1rem'}} className="flex justify-end place-items-end bg-white hover:bg-gray-100 text-gray-800 font-semibold py-2 px-4 border border-gray-400 rounded shadow">View details</Button>
        </Card>
    );
};

export default Artwork;
