import React,{Component} from 'react';
import {Table} from 'react-bootstrap';
import {Button, ButtonToolbar} from 'react-bootstrap';
import {AddLoanRequestModal} from './AddLoanRequestModal';

export class LoanRequests extends Component{

    constructor(props){
        super(props);
        this.state={loans:[], addModalShow: false}
    }

    componentDidMount(){
        this.refreshList();
    }

    refreshList(){
        fetch('http://localhost:5000/requests')
            .then(response=>response.json())
            .then(data => {
                this.setState({loans:data.loanRequests});
            });
    }

    //componentDidUpdate(){
    //    this.refreshList();
    //}

    render(){
        const {loans} = this.state;
        let addModalClose =() => this.setState({addModalShow:false})

        return(
            <div>
            <Table className='mt-4' striped bordered hover size='sm'>
            <thead>
                <tr>
                    <th>Id</th>
                    <th>Business Tax Id</th>
                    <th>Business Name</th>
                    <th>Owner SSN</th>
                    <th>Owner Name</th>
                    <th>Owner Email</th>
                    <th>Amount</th>
                    <th>Status</th>
                </tr>
            </thead>
            <tbody>
                {loans.map(loan=>
                <tr key={loan.Id}>  
                <td>{loan.Id}</td>
                <td>{loan.BusinessTaxId}</td>
                <td>{loan.BusinessName}</td>
                <td>{loan.OwnerSSN}</td>
                <td>{loan.OwnerName}</td>
                <td>{loan.OwnerEmail}</td>
                <td>{loan.Amount}</td>
                <td>{loan.Status}</td>
                </tr>
                )}
            </tbody>
        </Table>
        <ButtonToolbar>
            <Button variant='primary' onClick={()=>this.setState({addModalShow:true})}>Add new
            </Button>
            <AddLoanRequestModal
            show={this.state.addModalShow}
            onHide={addModalClose}
            ></AddLoanRequestModal>
        </ButtonToolbar>
        </div>
        )
    }
}