import React,{Component} from 'react';
import Report from 'bv-react-data-report';

export class PaymentsExport extends Component{
    render(){
        return(
         <Report reportData={this.props.data}/>
      )
    }
}