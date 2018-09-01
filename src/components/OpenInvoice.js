import React from 'react';

const OpenInvoice = (props) => {
    const printDate = (date) => {
        console.log(date)
        const newDate = date.split(' ').splice(1,3).join('/')
        return newDate
    }
    let sum = 0;
    const tallySum = () => {
        props.openInvoice.tasks.map((task) => {
            sum = sum + parseInt(task.sum);
        })
        return sum
    }

    return(
        <div className="openInvoice">
            <h2>Invoice</h2>
            <div>
                {console.log(props)}
                {
                <header className="openInvoice openInvoice__header">
                    <div className="row row__spaceBetween">
                        <input className="openInvoice openInvoice__input" type="text" defaultValue={props.displayName}/>
                        <div>
                            <p>{props.openInvoice.key}</p>
                                <p>{props.openInvoice.dateModified ? `${printDate(props.openInvoice.dateModified)}` : printDate(props.openInvoice.dateCreated) }</p>
                        </div>

                    </div>
                    <h3>Invoice</h3>
                    <h4>for {props.openInvoice.client}</h4>
                </header>
                }
                <section className="openInvoice openInvoice__tasks">
                    <div className="openInvoice openInvoice__tasks oopenInvoice__tasks--indexes">
                        <h3>Services Rendered</h3>
                        <h3>Time</h3>
                        <h3>Amount</h3>
                    </div>
                    <div className="openInvoice openInvoice__tasks oopenInvoice__tasks--list">
                        <ul>
                            {
                                props.openInvoice.tasks
                                ?
                                props.openInvoice.tasks.map((task) => {
                                    const key = props.openInvoice.tasks.indexOf(task)
                                    return (
                                        <li className="openInvoice openInvoice__tasks oopenInvoice__tasks--item" key={key} >

                                            <input id="taskName" onChange={this.handleChange} type="text" placeholder="Task Name" defaultValue={task.taskName}/>

                                            <input id="hours" onChange={this.handleChange} type="number" step="any" placeholder="Hours" defaultValue={task.hours}/>

                                            <input type="number" placeholder="Sum" defaultValue={task.sum} />
                                            <textarea id="description" className="row row__padding" onChange={this.handleChange} placeholder="Explain yourself..." defaultValue={task.description}></textarea>
                                        </li>
                                    )
                                })
                                :
                                null
                            }
                        </ul>
                    </div>
                </section>
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
            </div>
        </div>
    )
}

export default OpenInvoice;