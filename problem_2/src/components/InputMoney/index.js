import "./style.css";
import { InputNumber, Select } from "antd";
import { useState, useEffect } from "react";
import { memo } from "react";
function InputMoney(props) {
  const { token, setToken, tokenType, isToPrice, callback } = props;
  const [tokenList, setTokenList] = useState([]);
  console.log(tokenList);

  useEffect(() => {
    setTokenList([...tokenType]);
  }, [tokenType]);
  const handleChange = (e, key) => {
    callback();
    setToken({ ...token, [key]: e });
  };

  return (
    <div className="input-token">
      {!isToPrice ? (
        <InputNumber
          className="input-number"
          value={token.number}
          onChange={(e) => handleChange(e, "number")}
          placeholder="Enter number"
        />
      ) : (
        <div>
          <span className="to-token-value">{token.number}</span>
        </div>
      )}
      <Select
        showSearch
        filterOption={(input, option) =>
          (option?.currency ?? "").toLowerCase().includes(input.toLowerCase())
        }
        className="select-token-type"
        value={token.price}
        options={tokenList}
        onChange={(e) => handleChange(e, "price")}
      />
    </div>
  );
}

export default memo(InputMoney);
