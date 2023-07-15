import { Col, DatePicker, DatePickerProps, Row } from "antd";
import { FC } from "react";
import { useContextSelector } from "use-context-selector";
import { SwatContext } from "../context/MainContext";

export type DatePickerType = 'Date Time' | 'Date'

const DateTimeToggle: FC = () => {
  const { datetime, setDatetime } = useContextSelector(SwatContext, ({datetime, setDatetime}) => { return { datetime, setDatetime }})

  const onChange = (
    value: DatePickerProps['value'],
    dateString: [string, string] | string,
  ) => {
    if (value?.unix()) {
      setDatetime(value?.unix()*1000)
    } else {
      setDatetime(undefined)
    }
  };
  return (
    <>
      <Row style={{ padding: '10px'}}>
        <Col span={24}>
          <DatePicker
            placeholder='Select Date Time'
            style={{ width: '100%' }}
            showTime={true}
            onChange={onChange}
          ></DatePicker>
        </Col>
      </Row>
    </>
  )
}

export default DateTimeToggle;