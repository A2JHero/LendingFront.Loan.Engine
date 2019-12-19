import React,{Component} from 'react';
import {Modal, Button, Row, Col, Form} from 'react-bootstrap';
import Snackbar from '@material-ui/core/Snackbar';
import IconButton from '@material-ui/core/IconButton';

export class AddLoanRequestModal extends Component{
  constructor(props)
  {
    super(props);

    this.state = {snackbarOpen:false, snackbarMsg:''}
    this.handleSubmit = this.handleSubmit.bind(this);
  }  

  snackbarClose = (event)=>{
    this.setState({snackbarOpen:false});
  }
  handleSubmit(event){
    event.preventDefault();

    fetch('http://localhost:5000/requests',
          {
              method:'POST',
              headers:{
                'Accept':'application/json',
                'Content-Type':'application/json'
              },
              body:JSON.stringify({
                'BusinessTaxId':event.target.BusinessTaxId.value,
                'BusinessName':event.target.BusinessName.value,
                'OwnerSSN':event.target.OwnerSSN.value,
                'OwnerName':event.target.OwnerName.value,
                'OwnerEmail':event.target.OwnerEmail.value,
                'Amount': event.target.Amount.value
              })
          }      
        )
        .then(response=>response.json())
        .then((result) => {
            this.setState({snackbarOpen:true,snackbarMsg:"Request Created Succesfully"})
        },
        (error)=> {
          this.setState({snackbarOpen:true,snackbarMsg:"Failure Creating Request"})
        }
        );

  }

  render(){
        return(
          <div className="container">
            <Snackbar
            anchorOrigin={{vertical:'bottom',horizontal:'left'}}
            open={this.state.snackbarOpen}
            autoHideDuration={3000}
            onClose={this.snackbarClose}
            message={<span id="message-id">{this.state.snackbarMsg}</span>}
            action={[
              <IconButton
              key="close"
              aria-label="close"
              color="inherit"
              onClick={this.snackbarClose}
              >
                x
              </IconButton>
            ]}
            />
            <Modal
              {...this.props}
              size="lg"
              aria-labelledby="contained-modal-title-vcenter"
              centered
            >
            <Modal.Header closeButton>
              <Modal.Title id="contained-modal-title-vcenter">
                Add New Loan Request
              </Modal.Title>
            </Modal.Header>
            <Modal.Body>
                  <Row>
                    <Col sm='6'>
                      <Form onSubmit={this.handleSubmit}>
                      <Form.Group controlId='BusinessTaxId'>
                        <Form.Label>Business Tax Id</Form.Label>
                        <Form.Control 
                        type='text'
                        name = 'BusinessTaxId'
                        required
                        placeholder='Business Tax Id'
                        />
                        </Form.Group>
                        <Form.Group controlId='BusinessName'>
                        <Form.Label>Business Name</Form.Label>
                        <Form.Control 
                        type='text'
                        name = 'BusinessName'
                        required
                        placeholder='Business Name'
                        />
                        </Form.Group>
                        <Form.Group controlId='OwnerSSN'>
                        <Form.Label>Owner SSN</Form.Label>
                        <Form.Control 
                        type='text'
                        name = 'OwnerSSN'
                        required
                        placeholder='SSN'
                        />
                        </Form.Group>
                        <Form.Group controlId='OwnerName'>
                        <Form.Label>Owner Name</Form.Label>
                        <Form.Control 
                        type='text'
                        name = 'OwnerName'
                        required
                        placeholder='Owner Name'
                        />
                        </Form.Group>
                        <Form.Group controlId='OwnerEmail'>
                        <Form.Label>Owner Email</Form.Label>
                        <Form.Control 
                        type='text'
                        name = 'OwnerEmail'
                        required
                        placeholder='Email'
                        />
                        </Form.Group>
                        <Form.Group controlId='Amount'>
                        <Form.Label>Amount</Form.Label>
                        <Form.Control 
                        type='number'
                        name = 'Amount'
                        required
                        placeholder='Amount'
                        />
                        </Form.Group>
                        <Form.Group>
                          <Button variant='primary' 
                          type='submit'>Add</Button>
                        </Form.Group>
                      </Form>
                    </Col>
                  </Row>
              
            </Modal.Body>
            <Modal.Footer>
              <Button variant ='danger' onClick={this.props.onHide}>Close</Button>
            </Modal.Footer>
          </Modal>
          </div>
        )
    }
}

