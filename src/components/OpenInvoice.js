import React from 'react';

const OpenInvoice = (props) => {
    
    const printDate = (date) => {
        const newDate = date.split(' ').splice(1,3).join('/')
        return newDate
    }
    const tallySum = () => {
        let sum = 0;
        if(props.openInvoice.tasks){
            props.openInvoice.tasks.map((task) => {
                sum = sum + parseInt(task[1].sum, 10);
            })
        }
        return sum
        // return sum
    }

    return(
        <div >
        {
        // If the user is not logged in, don't display an open invoice
        props.loggedIn 
        ?
        <div>
            {/* <button className="openInvoice openInvoice__icon closeInvoice icon hideOnPrint" onClick={() => {
                props.closeInvoice()
                props.toggleInvoice(false)
            }}> <i className="fas fa-times fa-2x"></i></button> */}
            { // Invoice Header
                <header className="openInvoice openInvoice__header">
                    <div className="row row__spaceBetween row--nowrap">
                        <input className="openInvoice openInvoice__input" type="text" defaultValue={props.displayName} />
                        <div className="row  row__justifyFlexEnd row__alignCenter row--nowrap">
                            <p>{props.openInvoice.key}</p>
                            <p className="bar"> | </p>
                            <p>{props.openInvoice.dateModified ? `${printDate(props.openInvoice.dateModified)}` : printDate(props.openInvoice.dateCreated)}</p>
                        </div>

                    </div>
                    <h3 className="heading heading__big">Invoice</h3>
                    <h4 className="">for {props.openInvoice.client}</h4>
                </header>
                // Invoice Header End
            }
            {/* Invoice Task  List */}
            <section className="openInvoice openInvoice__body">
                <div className="row row__spaceBetween openInvoice openInvoice__tasks oopenInvoice__tasks--indexes">
                    <h3 className="taskName heading ">Services Rendered</h3>
                    <h3 className="hours heading ">Time</h3>
                    <h3 className="sum heading ">Amount $/hr</h3>
                </div>
                <div className="openInvoice">
                    <ul className="openInvoice__tasks--list">
                        {
                        props.openInvoice.tasks
                        ?
                        props.openInvoice.tasks.map((task) => {
                            const key = task[0];
                            const taskObj = task[1];
                            return (
                                <li className="openInvoice openInvoice__tasks  openInvoice__tasks--item" key={key} id={key} >

                                    <div className="row row__spaceBetween">
                                        <button className="openInvoice openInvoice__icon openInvoice__icon--save hideOnPrint" onClick={props.updateTask} ><i className="fas fa-save"></i> </button>
                                        
                                        <button className="openInvoice openInvoice__icon openInvoice__icon--remove hideOnPrint" onClick={props.removeTask} ><i className="fas fa-trash"></i> </button>
                                    </div>

                                    <div className="row row__spaceBetween openInvoice__task">
                                        <div className="row row__spaceBetween">
                                            <div className="inputContainer taskName">
                                                <input id="taskName" className="taskName" onChange={this.handleChange} type="text" placeholder="Task Name" defaultValue={taskObj.taskName} />
                                            </div>

                                            <div className="inputContainer hours">
                                                <input id="hours" className="hours" onChange={this.handleChange} type="number noSpinners" step="any" placeholder="Hours" defaultValue={taskObj.hours} />
                                            </div>

                                            <div className="inputContainer sum">
                                                <input type="number noSpinners" className="sum" placeholder="Sum" defaultValue={tallySum()} />
                                            </div>
                                            <div className="inputContainer description">
                                                <textarea id="description" className="row row__padding" onChange={this.handleChange} placeholder="Explain yourself..." defaultValue={taskObj.description}></textarea>
                                            </div>
                                        </div>
                                    </div>

                                </li>
                            )
                        })
                        :
                        null
                        }
                    </ul>
                </div>
            </section>
            {/* Invoice Task  List  End*/}
            {/* Invoice Total */}
            <section className="openInvoice openInvoice__total">
                <div className="row row__spaceBetween">
                    <h3>Total</h3>
                    {
                        <h3>
                            {
                                tallySum()
                            }
                        </h3>
                    }
                </div>
            </section>
            {/* Invoice Total End */}
            {/* Invoice Footer */}
            <footer className="openInvoice openInvoice__footer">
                <div className="row">
                    <input className="heading" type="text" placeholder="Say goodbye to your client" defaultValue="Thank You" />
                    <input className="heading heading__subHeading" ype="text" placeholder="Add a goodbye caption" defaultValue="Let's work again soon!" />
                </div>
                <div className="row row__alignStart">
                    <div className="row row__half ">
                        <input type="text" defaultValue="Please reach out to me with any questions or concerns" />
                        <input type="text" defaultValue={`Payable by interact e-transfer to ${props.user.email}`} />
                    </div>
                    <div className="row row__half ">
                        <input type="text" defaultValue={props.user.email} placeholder="Email" />
                        <input type="text" defaultValue={props.user.phoneNumber ? props.user.phoneNumber : null} placeholder="Phone Number" />
                        <input type="text" defaultValue="Toronto, ON" placeholder="Location" />
                    </div>
                </div>
            </footer>
        </div>
        :
        null
        }
        </div>
    )
}

export default OpenInvoice;