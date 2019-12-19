import React,{Component} from 'react';
import {Modal, Button, Row, Col, Form} from 'react-bootstrap'
import DatePicker from 'react-date-picker'
import Report from 'bv-react-data-report'


export class LoanPaymentsReportModal extends Component{
    constructor(props)
    {
      super(props);
      this.state={loanPayments:[],dateFrom:new Date(),dateTo:new Date()}
    }  
    
    componentDidMount(){
      this.refreshData();
    }

    onChangeFrom = dateFrom => this.setState({ dateFrom })

    onChangeTo = dateTo => this.setState({ dateTo })

    refreshData(){
      let paramFrom = new Intl.DateTimeFormat('ko-KR').format(this.state.dateFrom).replace('.','-');
      let paramTo = new Intl.DateTimeFormat('ko-KR').format(this.state.dateTo).replace('.','-');
      let reportURL = 'http://localhost:5000/paymentsReport/' + paramFrom +'/'+ paramTo;
      
      fetch(reportURL)
          .then(response=>response.json())
          .then(data => {
              this.setState({loanPayments:data.loanPayments});
          });
    }

  
    render(){
          return(
              <Modal
              {...this.props}
              size="lg"
              aria-labelledby="contained-modal-title-vcenter"
              centered
            >
              <Modal.Header closeButton>
                <Modal.Title id="contained-modal-title-vcenter">
                  Export Loan Payments Report
                </Modal.Title>
              </Modal.Header>
              <Modal.Body>
                <div className="container" id="LoanPaymentsModalContainer">
                    <Row>
                      <Col sm='6'>
                        <Form onSubmit={this.handleSubmit}>
                          <Form.Group controlId='DateFrom'>
                          <Form.Label>From</Form.Label>
                          <DatePicker
                          dateFormat='YYYY-MM-DD'
                          onChange={this.onChangeFrom}
                          value={this.state.dateFrom}
                          required
                          />
                          </Form.Group>
                          <Form.Group controlId='DateTo'>
                          <Form.Label>To</Form.Label>
                          <DatePicker
                          dateFormat='YYYY-MM-DD'
                          onChange={this.onChangeTo}
                          value={this.state.dateTo}
                          required
                          />
                          </Form.Group>
                          <Form.Group>
                            <Button variant='primary' 
                            onClick={this.refreshData()}>
                              Generate
                            </Button>
                          </Form.Group>
                        </Form>
                      </Col>
                    </Row>
                    <Row>
                      <Col sm='10'>
                      <Report data={this.state.loanPayments}/>
                      </Col>
                    </Row>
                </div>
              </Modal.Body>
              <Modal.Footer>
                <Button variant ='danger' onClick={this.props.onHide}>Close</Button>
              </Modal.Footer>
            </Modal>
          )
      }
  }