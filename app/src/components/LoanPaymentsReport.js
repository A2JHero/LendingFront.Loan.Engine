import React,{Component} from 'react';
import {Button, Row, Col, Form} from 'react-bootstrap'
import DatePicker from 'react-date-picker';
import Moment from 'moment';
import Report from 'bv-react-data-report';
import PaymentsExport from './PaymentsExport';

export class LoanPaymentsReport extends Component{
    constructor(props)
    {
      super(props);
      this.state={loanPayments:[],dateFrom:new Date(Date.parse('2019-01-01')),dateTo:new Date(Date.parse('2019-12-31'))}
    }  
    
    onChangeFrom = dateFrom => this.setState({ dateFrom })

    onChangeTo = dateTo => this.setState({ dateTo })

    refreshData(){
      let paramFrom = Moment(this.state.dateFrom).format('YYYY-MM-DD').toString();
      let paramTo = Moment(this.state.dateTo).format('YYYY-MM-DD').toString();
      let reportURL = 'http://localhost:5000/paymentsReport/' + paramFrom +'/'+ paramTo;
      
      fetch(reportURL)
          .then(response=>response.json())
          .then(data => {
              this.setState({loanPayments:data.loanPayments});
          });
    }
  
    render(){
          return(
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
          )
      }
  }