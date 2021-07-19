import {Form, Button, Select, DatePicker, Spin} from 'antd';
import {useState} from "react";
import {searchLocation} from "../../api";
import {useDispatch} from "react-redux";
import {$search} from "../../reducers/flights.slice";

const {RangePicker} = DatePicker;


const dateFormat = 'YYYY/MM/DD';

function SearchForm() {
    const [form] = Form.useForm();
    const [options, setOptions] = useState([]);
    const [fetching, setFetching] = useState(false);

    const dispatch = useDispatch()
    const onFinish = ({flyFrom, to, date}) => {
        console.log(date);

        const params = {
            flyFrom, limit: 30, sort: 'price', locale: 'en-US', to,
            dateFrom: date[0].format('DD/MM/YYYY'), dateTO: date[1].format('DD/MM/YYYY'),
            returnFrom: date[1].format('DD/MM/YYYY'), returnTo: date[1].format('DD/MM/YYYY'),
        }

        dispatch($search({...params}))
        console.log(params)
    };


    const onSearch = async (searchText) => {
        setFetching(true)
        const locations = await searchLocation(searchText, 5, 'name', 'en-US', 'airport', 'true')

        console.log(locations)
        setOptions(
            !searchText ? [] : locations.locations.map(location => {
                return {label: location.name, value: location.city.id}
            }),
        );
        setFetching(false)
    };

    const layout = {
        labelCol: {span: 8},
        wrapperCol: {span: 16},
    };
    return <div style={{marginTop: 20}}>
        <Form {...layout} style={{display: 'flex', flexDirection: 'column'}} form={form} name="search-flights"
              onFinish={onFinish}>
            <div style={{display: 'flex', alignSelf: 'center'}}>
                <Form.Item
                    name="flyFrom"
                    label="From"
                    rules={[
                        {
                            required: true,
                        },
                    ]}
                >
                    <Select
                        showSearch
                        options={options}
                        style={{width: 200}}
                        onSearch={onSearch}
                        notFoundContent={fetching ? <Spin size="small"/> : null}
                        placeholder="input here"
                    />
                </Form.Item>
                <Form.Item
                    name="to"
                    label="TO"
                    rules={[
                        {
                            required: true,
                        },
                    ]}
                >
                    <Select
                        showSearch
                        options={options}
                        style={{width: 200}}
                        onSearch={onSearch}
                        notFoundContent={fetching ? <Spin size="small"/> : null}
                        placeholder="input here"
                    />
                </Form.Item>

                <Form.Item
                    name="date"
                    label="Date"
                    rules={[
                        {
                            required: true,
                        },
                    ]}
                >
                    <RangePicker
                        format={dateFormat}
                    />
                </Form.Item>
            </div>

            <Form.Item style={{justifyContent: 'center'}}>
                <Button style={{width: '100%'}} type="primary" htmlType="submit">
                    Search
                </Button>
            </Form.Item>
        </Form>
    </div>

}

export default SearchForm
