import React, {Component} from 'react'
import './Examen.css'

const items = [
    {id:1, text:'AWT Exam ', isCompleted: false},
    {id:2, text: 'LA Exam ', isCompleted: false}, 
    {id:3, text: 'Exam 3', isCompleted: false}
  ]
    
  
class Examen extends Component {

    constructor() {
        super();
        this.state = {
          items: items,
        };
        this.deleteItem = this.deleteItem.bind(this);
        this.addItem = this.addItem.bind(this);
        this.editItem = this.editItem.bind(this);
        this.editInput = this.editItem.bind(this);
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

    //   editInput = (item) =>{
    //       var editInput = items.createElement("input");
    //       item.id = items;
    //       item.edit = false;
    //       item.compleateItem = "";
    //       let updateList = [...items, item];
    //       this.setState({
    //          items: updateList
    //        }
    //       )
    //    }

    // onToggleEdit = itemId => {
    //     let tasks = this.state.tasks.map(item => {
    //       if (item.id == itemId) {
    //         item.edit = !item.edit;
    //       }
    //       return item;
    //     });
    //     this.setState({tasks});
    //   }





    editInput(e){ this.setState({ items: e.target.value }) }

      editItem = (item) =>{
        const {items} = this.state;
          item.id = items.edit;
          item.edit = true;
          item.compleateItem = true;
          let updateList = [...items, item];
          this.setState({
             items: updateList
           }
          )
       }
     



    render() {
        return (
            <div className="container">
                <div className="row">
                     <div className="col-sm-5 left">
                         <h1 className="text-center">  </h1>
                     </div>
                </div>
                    <div className="row">
                        <div className="col-sm-7 left">
                            <h1 className="heading text-left display-3">MyBook Exam-Planner</h1>
                        </div>
                        {/* <div className="col-xs-1">
                        </div> */}
                        <div className="col-sm-5 right ">
                            <h1 className="heading text-center display-3">  Add Exams</h1>
                        
                        </div>
                    
                    </div>
                    <Input addItem={this.addItem}/>
                        <div>
                             <Items items = {this.state.items} deleteItem={this.deleteItem} editItem={this.editItem} compleateItem={this.compleateItem} className="items"/>
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
        <p><h1>You are done with all Exams</h1></p>
    );
    return(
        <div>
            {itemList}
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
                    placeholder="Enter your Exam"
                >
                </input>
            
                <Button type={"submit"} className={"Button"}>
                    Add
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



export default Examen