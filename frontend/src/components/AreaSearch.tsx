import { Select } from "antd";

export type Area = {
  pky: number
  ctm: number
  utm: number
  name: string
  lat: number
  long: number
}

export type AreaSearchProps = {
  areas: Area[]
}

const AreaSearch = ({ areas }: AreaSearchProps) => {
  if (!areas) {
    areas = []
  }
  return (
    <Select
      mode="multiple"
      size="middle"
      placeholder="See up to 3 Areas at once"
      style={{ width: '100%' }}
      options={areas}
      maxTagCount={3}
    ></Select>
  )
}

export default AreaSearch;