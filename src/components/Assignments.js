import React, {Component} from 'react'
import './Assignments.css'
//import {Link, RichText, Date} from 'prismic-reactjs';
import { Form } from 'semantic-ui-react'
import {add_assignments} from "./UserFunction";
import jwt_decode from 'jwt-decode'

// const items = [
//   {id:1, text:'Learn React', isCompleted: false},
//   {id:2, text: 'Work on project', isCompleted: false}
// ]
  
class Assignments extends React.Component {

    
  constructor(props) {
    super(props);
    this.state = {
        items: [],
        // date: "",
        // description: "",
        newassignment: '',
        // assignments: [],
        submission: '',
        username: '',
        isCompleted: false

    };
    this.deleteItem = this.deleteItem.bind(this);
    this.addItem = this.addItem.bind(this);
    this.editItem = this.editItem.bind(this);
    this.compleateItem = this.compleateItem.bind(this);
    this.handleChange = this.handleChange.bind(this)
    this.handleSubmit = this.handleSubmit.bind(this)

    
    }

    componentDidMount() {
      const token = localStorage.usertoken
        const decoded = jwt_decode(token)
        this.setState({
            items: decoded.identity.assignments,
            username: decoded.identity.username

        })
    }

    handleChange(e) {
      this.setState({[e.target.name]: e.target.value})
    }

    handleSubmit(e) {
        e.preventDefault()

        const newAss = {
            newassignment: this.state.newassignment,
            username: this.state.username,
            submission: this.state.submission,
            isCompleted: this.state.isCompleted
        }
        add_assignments(newAss).then(res =>{
            window.location.reload()
        }).catch(err =>{
            console.log(err)
        })
    }

    renderAssignmentsData(){
      return this.state.assignments.map((ass, )=>{
          const {assignment, submission} = ass
          return(
              <div>
                  {assignment} on {submission}
              </div>
          )
      })
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
     item.compleateItem = false;
     let updateList = [...items, item];
     this.setState({
        items: updateList
      }
     )
      const newAss = {
          newassignment: this.state.newassignment,
          username: this.state.username,
          submission: this.state.submission,
          isCompleted: this.state.isCompleted
      }
      add_assignments(newAss).then(res =>{
          // window.location.reload()
          console.log("add new item")
      }).catch(err =>{
          console.log(err)
      })
  }

  editItem = (item) =>{
    const {items} = this.state;
     item.id = items.length+1;
     item.compleateItem = false;
     let updateList = [...items, item];
     this.setState({
        items: updateList
      }
     )
  }



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
                
                    
                    <Input addItem={this.addItem}/>
                    <div>
                    <Items items = {this.state.items} deleteItem={this.deleteItem} compleateItem={this.compleateItem} className="items"/>
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
                    <Button onClick={()=>{editItem(item)}} className={"Button"}>Edit</Button>
                    <Button onClick={()=>{deleteItem(item.id)}} className={"Button delete"}>-</Button>
                    </p>
                </span>
            </div>
        )
    ) 

    
    : (
        <p> You have no items</p>
        
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

