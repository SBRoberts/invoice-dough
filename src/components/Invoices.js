import React from 'react';

const Invoices = (props) => {
    
    return(
        <div>
            <h2 className="heading">Your Invoices...</h2>
            <ul>
                {
                    props.invoices.map((invoice) => {
                        return (
                            <li className="invoice" id={invoice[0]} key={invoice[0]} onClick={props.pullInvoice}>
                                <div>
                                    <h3 onClick={props.pullInvoice}>{invoice[1].client}</h3>
                                </div>
                                <div>
                                    <h4 onClick={props.pullInvoice}> {invoice[1].dateModified || invoice[1].dateCreated}</h4>
                                </div>
                            </li>
                        )
                    })
                } 
            </ul>
        </div>
    )
}

export default Invoices;