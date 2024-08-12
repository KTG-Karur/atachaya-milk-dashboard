import React, { useEffect, useState } from 'react'
import { Table } from 'react-bootstrap'
import { dateConversionNormal } from '../../utils/applicationFun';

export default function DownloadTemplate(props) {
    const { data } = props
    const [state, setState] = useState({
         totalFat : 0,
         totalsnf : 0,
         totalqty : 0,
         totalRate : 0,
         totalAmount : 0,
         EtotalFat : 0,
         Etotalsnf : 0,
         Etotalqty : 0,
         EtotalRate : 0,
         EtotalAmount : 0,
    })

    useEffect(() => {
        if (data.length > 0) {
            let totalFat = 0;
            let totalsnf = 0;
            let totalqty = 0;
            let totalRate = 0;
            let totalAmount = 0;
            let EtotalFat = 0;
            let Etotalsnf = 0;
            let Etotalqty = 0;
            let EtotalRate = 0;
            let EtotalAmount = 0;

            data.forEach(({ snf, qty, fat, rate, amount, Esnf, Eqty, Efat, Erate, Eamount }) => {
                totalsnf += parseFloat(snf);
                totalqty += parseFloat(qty);
                totalFat += parseFloat(fat);
                totalRate += parseFloat(rate);
                totalAmount += parseFloat(amount);
                Etotalsnf += parseFloat(Esnf);
                Etotalqty += parseFloat(Eqty);
                EtotalFat += parseFloat(Efat);
                EtotalRate += parseFloat(Erate);
                EtotalAmount += parseFloat(Eamount);
            });

            setState({
                ...state,
                totalFat : totalFat,
                totalqty : totalqty,
                totalRate : totalRate,
                totalAmount : totalAmount,
                Etotalsnf : Etotalsnf,
                Etotalqty : Etotalqty,
                EtotalFat : EtotalFat,
                EtotalRate : EtotalRate,
                EtotalAmount : EtotalAmount,
            })
        }

    }, [data]);


    return (
        <Table striped hover style={{ borderLeft: '1px solid #ddd', borderRight: '1px solid #ddd' }}>
            <thead>
                <tr>
                    <th rowSpan={2} className='wrap'><b>உற்பத்தி<br />யாளர்<br />எண்</b></th>
                    <th rowSpan={2} ><b>தேதி</b></th>
                    <th colSpan={5} className='text-center'><b>M</b></th>
                    <th colSpan={5} className='text-center'><b>E</b></th>
                    <th colSpan={2} rowSpan={2} className='text-center'><b>ACCOUNT SUMMARY/<br />கணக்கு சுருக்கம்</b></th>
                </tr>
                <tr>
                    <th><b>கொழுப்பு</b></th>
                    <th><b>இதரசத்து</b></th>
                    <th><b>அளவு</b></th>
                    <th><b>விலை</b></th>
                    <th><b>தொகை</b></th>
                    <th><b>கொழுப்பு</b></th>
                    <th><b>இதரசத்து</b></th>
                    <th><b>அளவு</b></th>
                    <th><b>விலை</b></th>
                    <th><b>தொகை</b></th>
                </tr>
            </thead>
            <tbody>
                {

                    data.map((ele, idx) => {
                        return (<tr style={{ height: '50px' }}>
                            <td >{idx === 4 ? ele.customerId : ""}</td>
                            <td>{ele.entryDate ? dateConversionNormal(ele.entryDate, "DD-MM-YYYY") : ""}</td>
                            <td>{ele?.fat || ""}</td>
                            <td>{ele?.snf || ""}</td>
                            <td>{ele?.qty || ""}</td>
                            <td>{ele?.rate || ""}</td>
                            <td>{ele?.amount || ""}</td>
                            <td>{ele?.Efat || ""}</td>
                            <td>{ele?.Esnf || ""}</td>
                            <td>{ele?.Eqty || ""}</td>
                            <td>{ele?.Erate || ""}</td>
                            <td>{ele?.Eamount || ""}</td>
                            <td dangerouslySetInnerHTML={{ __html: idx === 0 ? `<b>AMOUNT<br/>/தொகை</b>` :(idx === 2) ? `<b>CATTLE FEED<br/>/தீவனம்</b>` : (idx === 4) ? `<b>BONUS</b>` :(idx === 5) ? `<b>ADVANCE</b>` : (idx === 6) ? `<b>PENDING <br/>/நிலுவை</b>` : (idx === 7) ? `<b>நிகர தொகை</b>` : "" }} />
                            <td style={{ textAlign: 'right' }} ><b>{idx === 0 ? `${(state?.EtotalAmount + state?.totalAmount).toFixed(2)}` :(idx === 2) ? `0.00` : (idx === 4) ? `0.00` : (idx === 5) ? `0.00` : (idx === 6) ? `0.00` :  ""}</b></td>
                        </tr>)
                    })
                }
                <tr>
                    <td><b>{state?.customerId?.customerId || "-"} </b></td>
                    <td><b>Total</b></td>
                    <td><b>{state?.totalFat.toFixed(2) || "0.00"}</b></td>
                    <td><b>{state?.totalsnf.toFixed(2) || "0.00"}</b></td>
                    <td><b>{state?.totalqty.toFixed(2) || "0.00"}</b></td>
                    <td><b>{state?.totalRate.toFixed(2) || "0.00"}</b></td>
                    <td><b>{state?.totalAmount.toFixed(2) || "0.00"}</b></td>
                    <td><b>{state?.EtotalFat.toFixed(2) || "0.00"}</b></td>
                    <td><b>{state?.Etotalsnf.toFixed(2) || "0.00"}</b></td>
                    <td><b>{state?.Etotalqty.toFixed(2) || "0.00"}</b></td>
                    <td><b>{state?.EtotalRate.toFixed(2) || "0.00"}</b></td>
                    <td><b>{state?.EtotalAmount.toFixed(2) || "0.00"}</b></td>
                    <td><b>நிகர தொகை</b></td>
                    <td style={{ textAlign: 'right' }}><b>0.00</b></td>
                </tr>
            </tbody>
        </Table>
    );
}
