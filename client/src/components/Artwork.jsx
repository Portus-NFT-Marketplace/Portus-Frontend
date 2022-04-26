import { Card } from "react-bootstrap";

const Artwork = (prop) => {
    return (
        <Card style={{ width: '18rem', marginRight: '3rem', marginBottom: '3rem'}}>
            <Card.Img className="rounded-lg" variant="top" src={prop.url} style={{ width: '18rem', height: '12rem' }} />
            <Card.Body>
                <Card.Title>{prop.name}</Card.Title>
            </Card.Body>
        </Card>
    );
};

export default Artwork;
