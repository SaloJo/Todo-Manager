import { Select } from "antd";

const { Option } = Select;

const TodoSelect = ({width, onChange, options, value}) => (
  <>
    <Select
      value={value}
      placeholder="Select"
      style={{
        width: width,
      }}
      onChange={onChange}
    >
      {options.map(option => <Option key={option} value={option}>{option}</Option>)}
    </Select>
  </>
);

export default TodoSelect;
