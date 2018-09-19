import React, { Component } from 'react';

class Invoices extends Component{
    constructor(props){
        super(props);
        this.state = {
            loggedIn: this.props.loggedIn,
            invoices: this.props.invoices,
        }
    }
    componentDidMount(){
        this.props.getInvoices()
    }
    render(){
        return (
            <div>
                <h2 className="heading">Your Invoices...</h2>
                <section className="invoices">
                    {
                    // console.log(this.state, this.state.loggedIn, this.state.user.uid)
                        <ul>
                            {
                                this.props.invoices.map((invoice) => {
                                    return (
                                        <li className="invoice" id={invoice[0]} key={invoice[0]} onClick={(e) => {
                                            this.props.pullInvoice(e)
                                            this.props.toggleInvoice(true)
                                        }}>
                                            <div>
                                                <h3 onClick={this.props.pullInvoice}>{invoice[1].client}</h3>
                                            </div>
                                            <div>
                                                <h4 onClick={this.props.pullInvoice}> {invoice[1].dateModified || invoice[1].dateCreated}</h4>
                                            </div>
                                        </li>
                                    )
                                })
                            }
                        </ul>
                    // this.state.loggedIn
                    // ?
                    
                    // :
                    // <div></div>
                    }
                </section>
            </div>
        )
    }
}

export default Invoices;