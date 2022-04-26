import { Card } from "react-bootstrap";

const Artwork = (prop) => {
    return (
        <Card style={{ width: '18rem', marginRight: '3rem', marginBottom: '3rem', marginTop: '2rem'}}>
            <Card.Img variant="top" src={prop.url} style={{ width: '18rem', height: '15rem' }} />
            <Card.Body>
                <Card.Title>{prop.name}</Card.Title>
            </Card.Body>
        </Card>
    );
};

export default Artwork;
