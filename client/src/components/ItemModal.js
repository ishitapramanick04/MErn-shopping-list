import React, {Component} from 'react';
import {
    Button,
    Modal,
    ModalHeader,
    ModalBody,
    Form,
    FormGroup,
    Label,
    Input
} from 'reactstrap';
import PropTypes from 'prop-types';
import {connect} from 'react-redux';
import {addItem} from '../actions/ItemActions';

class ItemModal extends Component{
state={
    modal:false,
    name:''
}
static propTypes={
    isAuthenticated:PropTypes.bool
}
toggle=()=>{
    this.setState({
        modal:!this.state.modal
    });
}
onChange=(e)=>{
    this.setState({
        [e.target.name]:e.target.value
    });
}
onSubmit=(e)=>{
   e.preventDefault();
   const newItem={
    name:this.state.name
   };
   this.props.addItem(newItem);
   this.toggle();
}
render(){
    return(
        <div>
            {this.props.isAuthenticated?(
            <Button 
            color="dark"
            style={{marginBottom:'2rem'}}
            onClick={this.toggle}>Add Item</Button>):(<div></div>)}
            <Modal
            isOpen={this.state.modal}
            toggle={this.state.toggle}>
                <ModalHeader toggle={this.toggle}>
                Add to Shopping List
                </ModalHeader>
                <ModalBody>
                    <Form
                    onSubmit={this.onSubmit}>
                       <FormGroup>
                           <Label for="item">Item
                               </Label>
                               <Input
                               type="text"
                               name="name"
                               id="item"
                               placeHolder="Add item"
                               onChange={this.onChange}>
                               </Input>
                               <Button
                               color="dark"
                               style={{marginBottom:'2rem'}}
                               block onClick={this.onSubmit}>Add Item</Button>
                               </FormGroup>  
                    </Form>
                </ModalBody>
            </Modal>
        </div>
    )
}
}
const mapStateToProps=state=>({
   item:state.item,
   isAuthenticated:state.auth.isAuthenticated
})
export default connect(mapStateToProps,{addItem})(ItemModal);