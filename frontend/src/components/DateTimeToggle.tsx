import { Col, DatePicker, Row, Switch } from "antd";
import { FC, useState } from "react";

export type DatePickerType = 'Date Time' | 'Date'

const DateTimeToggle: FC = () => {
  const [toggle, setToggle] = useState<DatePickerType>('Date Time')

  const changeDatePicker = (checked: boolean) => {
    setToggle(checked ? 'Date Time' : 'Date')
  }

  return (
    <>
      <Row>
        <Col span={24}>
          <Switch defaultChecked onChange={changeDatePicker} checkedChildren="Date Time" unCheckedChildren="Date"></Switch>
        </Col>
      </Row>
      <Row>
        <Col span={24}>
          <DatePicker
            placeholder={toggle === 'Date Time' ? 'Select Date Time' : 'Select Date'}
            style={{ width: '100%' }}
            showTime={toggle === 'Date Time'}
          ></DatePicker>
        </Col>
      </Row>
    </>
  )
}

export default DateTimeToggle;