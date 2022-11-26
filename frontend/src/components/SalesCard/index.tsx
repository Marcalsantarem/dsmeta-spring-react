import NotificationButton from "../NotificationButton";

import DatePicker from 'react-datepicker';
import "react-datepicker/dist/react-datepicker.css";

import './styles.css';

import { useEffect, useState } from "react";
import axios from "axios";
import { BASE_URL } from "../../utils/request";
import { sale } from "../../models/sale";


function visitesOrDeals(sale : sale) {
    if (sale.deals > sale.visited) {
        return Math.trunc(sale.visited - (sale.visited / 3));
    } else {
        return sale.deals;
    }    
}

function SalesCard() {

    const min = new Date(new Date().setDate(new Date().getDate() - 90));
    const max = new Date();

    const [minDate, setMinDate] = useState(min);
    const [maxDate, setMaxDate] = useState(max);

    const [sales, setSales] = useState<sale[]>([]);

    useEffect(() => {

        const dmin = minDate.toISOString().slice(0, 10) + "T00:00:00Z";
        const dmax = maxDate.toISOString().slice(0, 10) + "T23:59:59Z";

        {/* Chamada correta para o GET no backend, já filtrando no select as datas
        axios.get(`${BASE_URL}/sales?minDate=${dmin}&maxDate=${dmax}`)
            .then(response => {
                setSales(response.data.content);
            }) */}
        
        axios.get(`https://mockend.com/marcalsantarem/fake-api-rest/sales?date_order=asc`)
            .then(response => {
                setSales(response.data)
        });

    }, [minDate, maxDate]);

    return (
        <div className="dsmeta-card">
            <h2 className="dsmeta-sales-title">Vendas</h2>
            <div>
                <div className="dsmeta-form-control-container">
                    <DatePicker
                        selected={minDate}
                        onChange={(date: Date) => setMinDate(date)}
                        className="dsmeta-form-control"
                        dateFormat="dd/MM/yyyy"
                    />
                </div>
                <div className="dsmeta-form-control-container">
                    <DatePicker
                        selected={maxDate}
                        onChange={(date: Date) => setMaxDate(date)}
                        className="dsmeta-form-control"
                        dateFormat="dd/MM/yyyy"
                    />
                </div>
            </div>
            <div>
                <table className="dsmeta-sales-table">
                    <thead>
                        <tr>
                            <th className="show992">ID</th>
                            <th className="show576">Data</th>
                            <th>Vendedor</th>
                            <th className="show992">Visitas</th>
                            <th className="show992">Vendas</th>
                            <th>Total</th>
                            <th>Notificar</th>
                        </tr>
                    </thead>
                    <tbody> 
                        {sales.filter(s => {return s.date >= minDate.toISOString() && s.date <= maxDate.toISOString()})
                               .map(sale => {
                            return (
                                <tr key={sale.id}>
                                    <td className="show992">{sale.id}</td>
                                    <td className="show576">{new Date(sale.date).toLocaleDateString()}</td>
                                    <td>{sale.sellerName}</td>
                                    <td className="show992">{sale.visited}</td>
                                    <td className="show992">{visitesOrDeals(sale)}</td>
                                    <td>R$ {sale.amount.toFixed(2)}</td>
                                    <td>
                                    <div className="dsmeta-red-btn-container">
                                        <NotificationButton saleId={sale.id}/>
                                     </div>
                                    </td>
                                </tr>
                            )
                        })}
                    </tbody>
                </table> 
            </div>
        </div>
    )
}

export default SalesCard;