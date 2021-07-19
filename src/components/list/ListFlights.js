import {useSelector} from "react-redux";
import {selectFlights, selectSearchFlightsLoading} from "../../reducers/flights.slice";
import FlightCard from "../card/FlightCard";
import {Spin} from "antd";


function ListFlights() {

    const flights = useSelector(selectFlights)
    const loading = useSelector(selectSearchFlightsLoading)

    return <div style={{
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center'
    }}>

        {loading && <Spin/>}
        {flights.length > 0 && flights.map(flight => <FlightCard flight={flight} />)}


    </div>
}

export default ListFlights
