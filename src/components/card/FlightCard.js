import {Card, Steps} from "antd";
import moment from "moment";

const {Step} = Steps;

function FlightCard({flight}) {
    const {id, dTime, aTime, countryFrom, countryTo, price, cityFrom, cityTo, distance, fly_duration} = flight
    return <div style={{marginBottom: 15}}>
        <Card bodyStyle={{display: 'flex'}} key={id} style={{width: 350}}>

            <Steps progressDot current={1} direction="vertical">
                <Step title={moment(dTime * 1000).format("DD MMM YYYY hh:mm a")}
                      description={`${cityFrom},${countryFrom.name}`}/>
                <span>
               </span>
                <Step title={moment(aTime * 1000).format("DD MMM YYYY hh:mm a")}
                      description={`${cityTo},${countryTo.name}`}/>
            </Steps>
            <div style={{alignSelf: 'center', textAlign: 'center'}}>
                <p>{price}€</p>
                <p>{fly_duration}</p>
                <p>{distance}KM</p>

            </div>
        </Card>
    </div>
}

export default FlightCard
