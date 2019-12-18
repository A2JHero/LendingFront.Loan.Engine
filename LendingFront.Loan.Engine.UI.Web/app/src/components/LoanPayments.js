import React,{Component} from 'react';
import {Table} from 'react-bootstrap';
import {Button, ButtonToolbar} from 'react-bootstrap';
import {LoanPaymentsReportModal} from './LoanPaymentsReportModal'


export class LoanPayments extends Component{

    constructor(props){
        super(props);
        this.state={loanPayments:[], reportModalShow: false}
    }

    componentDidMount(){
        this.refreshList();
    }

    refreshList(){
        fetch('http://localhost:5000/payments')
            .then(response=>response.json())
            .then(data => {
                this.setState({loanPayments:data.loanPayments});
            });
    }

    render(){
        const {loanPayments} = this.state;
        let reportModalClose =() => this.setState({reportModalShow:false})

        return(
            <div>
            <Table className='mt-4' striped bordered hover size='sm'>
            <thead>
                <tr>
                    <th>Business Name</th>
                    <th>Status</th>
                    <th>Payment ID</th>
                    <th>Payment Amount</th>
                    <th>Total Payments</th>
                    <th>Loan Balance</th>
                </tr>
            </thead>
            <tbody>
                {loanPayments.map(payment=>
                <tr key={payment.PaymentIdentification}>  
                    <td>{payment.BusinessName}</td>
                    <td>{payment.Status}</td>
                    <td>{payment.PaymentIdentification}</td>
                    <td>{payment.PaymentAmount}</td>
                    <td>{payment.TotalPayments}</td>
                    <td>{payment.LoanBalance}</td>
                </tr>
                )}
            </tbody>
        </Table>
        <ButtonToolbar>
            <Button variant='primary' href='/paymentsReport'>
            Report
            </Button>
        </ButtonToolbar>
        </div>
        )
    }
}