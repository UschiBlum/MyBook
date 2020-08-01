import React, {Component} from 'react'
import './Assignments.css'
//import {Link, RichText, Date} from 'prismic-reactjs';
import { Form } from 'semantic-ui-react'
  


const items = [
  { id:1, text:'Learn React', isCompleted: false},
  { id:2, text: 'Work on project', isCompleted: false}, 
  { id:3, text: 'Learn Flask', isCompleted: true} 
]
  
class Assignments extends React.Component {

    
  constructor(props) {
    super(props);
    this.state = {
      items: items,
      date: Date.now(),
      description: ""
    };
    this.deleteItem = this.deleteItem.bind(this);
    this.addItem = this.addItem.bind(this);
    this.editItem = this.editItem.bind(this);
    this.compleateItem = this.compleateItem.bind(this);
        
    }
   

  deleteItem=(id)=>{
    const {items} = this.state;
    const isNotId = item => item.id !== id;
    const updateList = items.filter(isNotId);
    this.setState({
      items: updateList
    });

  }
  addItem = (item) =>{
    const {items} = this.state;
     item.id = items.length+1;
     item.edit = false;
     item.compleateItem = false;
     let updateList = [...items, item];
     this.setState({
        items: updateList
      }
     )
  }

  editItem = (id, item, e) =>{
   const {items} = this.state;
      item.id = items.length+1;
      item.edit = true;
      item.compleateItem = false;
      let updateList = [...items, item];
     this.setState({
        items: updateList
      }
     )
  }

//   editItem = itemId => {
//     let tasks = this.map(item => {
//       if (item.id == itemId) {
//         item.edit = !item.edit;
//       }
//       return item;
//     });
//     this.setState({tasks});
//   }
// onEdit = (item, itemid, e) => {
//     e.preventDefault()
//     this.setState({
//         id: itemid,
//         term: item
//     })
//     console.log(itemid)
// }





  compleateItem = (item) =>{
    const {items} = this.state;
    
    item.isCompleted 
      ? item.isCompleted = false
      : item.isCompleted = true

    this.setState({
      items
    });
    
  }
    render() {
        return (
            // <div className="container">
            //     <div className="row">
            //         <div className="col-sm-8 mx-auto">
            //             <h1 className="text-center">Assignments</h1>
            //         </div>
            //     </div>
            // </div>
            <div className="container">
                <div className="row">
                     <div className="col-sm-5 left">
                         <h1 className="text-center">  </h1>
                     </div>
                </div>
                    <div className="row">
                        <div className="col-xs-7 left header-row">
                            <h1 className="heading text-left display-3">MyBook Assignments</h1>
                        </div>
                        {/* <div className="col">
                        </div> */}
                        <div className="col-sm-5 right header-row">
                            <h1 className="heading text-center display-3">Add Assignments</h1>
                        
                        </div>
                    </div>


                {/* <div className="row">
                    <div className="col">
                     <h1>MyBook Assignments</h1>
                    </div>
                    <div className="col">
                    </div>
                    <div className="col">
                     <h1>Add Assignments</h1>
                    </div>
                </div> */}
                
                    
                    <Input addItem={this.addItem} super={this.setState}/>
                    <div>
                    <Items items = {this.state.items} deleteItem={this.deleteItem} compleateItem={this.compleateItem} editItem={this.editItem} super={this.setState} className="items"/>
                    </div>
            </div>
            
        );
    }
}



const Items = ({items, deleteItem, editItem, compleateItem}) => {
    const itemList = items.length ? (
        items.map(item=>
            <div key={item.id}>
                <span className="item" >
                    <p className="item-block">
                    <span className="item-name" style={{ textDecoration: item.isCompleted ? "line-through" : "" }}>{item.text}</span>
                    <Button onClick={()=>{compleateItem(item)}} className={"Button"}>&#10004;</Button>
                    <Button onClick={()=>{editItem(item)}} className={"Button edit"}>Edit</Button>
                    <Button onClick={()=>{deleteItem(item.id)}} className={"Button delete"}>-</Button>
                    </p>
                </span>
            </div>
        )
    ) 

    
    : (
        <p><h1>You have no Assignments to do</h1> </p>
        
    );

    
    return(
        
        <div className="row">
            <div className="col">{itemList}</div>
                    
                <div className="col">
                    {/* <Form>
                    <Form.Group widths='equal'>
                        <Form.TextArea width='auto' label='' placeholder='Enter the detail description of Task...' />
                    </Form.Group>
                    </Form>
                 */}
                </div>
                    
        </div>

   

    );
    
}
class Input extends React.Component {
    state = {
        text: '',
    }

    handleChange = (e) => {
        this.setState(
            {
                text: e.target.value

            }
        ) 
    }
    handleSubmit = (e) => {
        e.preventDefault();
        this.props.addItem(this.state);
        this.setState(
            {
                text: ''
            }
        )
        
    }
    handleEdit = (e) => {
        e.preventDefault();
        this.props.editItem(this.state);
        this.setState(
            {
                text: ''
            }
        )
        
    }


    
    render(){
        return(
            <div className="container">
            <div className="row">
            <div className="col"></div>
            <div className="col"></div>
            <div className="col-xs-5">
            
            <form onSubmit={this.handleSubmit} className="input">
                <input
                    className="add-input"
                    type = "text"
                    value = {this.state.text}
                    onChange={this.handleChange}
                    required="required"
                    placeholder="Enter your Assignment"
                >
                </input> 
                
            
                <Button type={"submit"} className={"Button"}>
                    Submit
                </Button>
            </form>
            </div>   
            </div>
             
            
            </div>


        );
    }
}

const Button =({
    onClick,
    className,
    type,
    children,
})=>
    <button
        onClick ={onClick}
        className={className}
        type={type}
    >
        {children}
    </button>





//ReactDOM.render(<App />, document.getElementById('root'));








export default Assignments

