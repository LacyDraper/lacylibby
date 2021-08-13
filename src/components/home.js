import React from 'react';
import { Card, Container, Row, Col } from 'react-bootstrap'

const Home = ( ) => {

return(
    
        <Container class='container-fluid'>
            
                <Card className="mb-3" style={{color : '#000', width: "65rem"}}>

                    <Card.Img src='https://firebasestorage.googleapis.com/v0/b/lacylibbycapstonepractice.appspot.com/o/images%2Flibrary%2FIMG_9711.JPG?alt=media&token=1088f280-d034-4516-88d6-a083551beefe ' />
                    <Card.Body>
                        <Card.Title> Little Libraries </Card.Title>
                        <Card.Text>  Blurb about web app and how to use it  </Card.Text>
                    </Card.Body>
                </Card>
            
        
        </Container>
)
}


export default Home;