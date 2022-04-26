import { Card, Button} from "react-bootstrap";

const Artwork = (prop) => {
    return (
        <Card style={{ width: '18rem', marginRight: '3rem', marginBottom: '3rem', borderWidth: '50'}}>
            <Card.Img className="rounded-lg" variant="top" src={prop.url} style={{ width: '18rem', height: '12rem' }} />
            <Card.Body>
                <Card.Title>{prop.name}</Card.Title>
                <Card.Text>{prop.price} ETH</Card.Text> 
            </Card.Body>
            <Button variant="primary">View details</Button>
        </Card>
    );
};

export default Artwork;
