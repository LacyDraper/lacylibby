import React from 'react';
import { Card, Container, Row, Col } from 'react-bootstrap'
import './index';

const Home = ( ) => {

return(
    
        <Container class='container-fluid'>
            
                <Card className="mb-3" style={{color : '#000', width: "65rem"}}>

                    <Card.Img src='https://firebasestorage.googleapis.com/v0/b/lacylibbycapstonepractice.appspot.com/o/images%2Flibrary%2FIMG_9711.JPG?alt=media&token=1088f280-d034-4516-88d6-a083551beefe ' />
                    <Card.Body>
                        <Card.Title> Little Free Libraries Inventory </Card.Title>
                        <Card.Text>  
                            <p>
                                Welcome to the Little Free Libraries Inventory. Are you curious about the treasure of books stocked by neighbors in Little Free Libraries near you? We are a one stop shop for all things Little Library Inventory related. This project centers the desire to connect people who arent able to stroll through neigborhoods and books. Once a user creates an account, they are able to upload an image to update an inventory for a library. The zoom feature on the map allows you to get a closer look of the books. Not interested in creating an account? No problem! Anyone can view the map and see the most recent invetories. Enjoy! 
                            </p>  
                        </Card.Text>
                    </Card.Body>
                </Card>
            
        
        </Container>
)
}


export default Home;