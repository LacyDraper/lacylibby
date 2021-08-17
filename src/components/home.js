import React from 'react';
import { Card, Container, Row, Col } from 'react-bootstrap'
import './index';

const Home = ( ) => {

return(
    
        <Container class='container-fluid'>
            
                <Card className="mb-3" style={{color : '#000', }}>

                    <Card.Img src='https://firebasestorage.googleapis.com/v0/b/lacylibbycapstonepractice.appspot.com/o/images%2Flibrary%2FIMG_9711.JPG?alt=media&token=05a96e30-b0b8-4b0f-b9b0-c4369cc207c4' />
                    <Card.Body>
                        <Card.Title> <strong>Little Free Libraries Inventory </strong></Card.Title>
                        <Card.Text>  
                            <p>
                            Welcome to the Little Free Libraries Inventory. Are you curious 
                            about the treasure of books stocked by neighbors in Little Free Libraries 
                            near you? To see the latest books in your favorite libraries, <a href="/libraries">click here.</a> Be sure to run your cursor over the picture to see a zoomed in version and read the book titles. 
                            </p>
                            <p>Want to upload a new photo of the inventory of a library near you? <a href="/register">Click here</a> to create an account. 
                            </p>
                        </Card.Text>
                    </Card.Body>
                </Card>
            
        
        </Container>
)
}


export default Home;