import { Card, Button} from "react-bootstrap";
import { useEffect } from "react";
import "aos/dist/aos.css";
import Aos from 'aos';

const Artwork = (prop) => {

    // useEffect(() => {
    //     Aos.init({ duration: 2000 });
    // }, [])

    return (
        // <div className="grid place-items-center" style={{marginBottom: '2rem'}} data-aos="fade-up">
        <div className="grid place-items-center" style={{marginBottom: '2rem'}}>
            <Card style={{ width: '18rem'}}>
                <Card.Img className="rounded-lg" variant="top" src={prop.url} style={{ width: '18rem', height: '12rem' }} />
                <Card.Body>
                    <Card.Title className="font-bold" style={{marginTop: '1rem'}}>{prop.name}</Card.Title>
                    <Card.Text>{prop.price} ETH</Card.Text> 
                </Card.Body>
                <div className="flex justify-end">
                    <Button style={{marginTop: '1rem'}} className="bg-transparent hover:bg-gray-100 text-gray-800 font-semibold py-2 px-4 border border-gray-400 rounded shadow">View details</Button>
                </div>
            </Card>            
        </div>

    );
};

export default Artwork;
