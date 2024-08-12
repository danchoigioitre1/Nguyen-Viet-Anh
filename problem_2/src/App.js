import "./App.css";
import InputMoney from "./components/InputMoney/index";
import { useState, useEffect } from "react";
import { Button, notification } from "antd";
import axios from "axios";
function App() {
  const [fromToken, setFromToken] = useState({});
  const [toToken, setToToken] = useState({});
  const [tokenTypeList, setTokenTypeList] = useState([]);
  const [isSwapped, setIsSwapped] = useState(true);
  const removeDuplicatesByKey = (arr, key) => {
    const list = [];
    arr.forEach((item) => {
      const keys = list.map((item) => item[key]);

      if (!keys.includes(item[key])) {
        list.push(item);
      }
    });

    return list;
  };

  const renderLabel = (token) => {
    return (
      <div className="token-label">
        <img
          src={`https://raw.githubusercontent.com/Switcheo/token-icons/main/tokens/${token.currency}.svg`}
          alt={token.currency}
        />
        {token.currency}
      </div>
    );
  };

  const handleSwapTokenPrice = () => {
    const newPrice = (fromToken.number * fromToken.price) / toToken.price;
    setToToken({ ...toToken, number: newPrice });
    setIsSwapped(true);
  };

  const callback = () => {
    setIsSwapped(false);
  };

  const openNotificationWithIcon = () => {
    if (fromToken.number < 0) {
      notification.open({
        message: <span className="warning-title">Warning</span>,
        description: "Input value must be greater than 0",
      });
      return;
    }
    handleSwapTokenPrice();
  };

  useEffect(() => {
    const fetchData = async () => {
      const response = await axios.get(
        "https://interview.switcheo.com/prices.json"
      );

      try {
        if (response.status === 200) {
          const tokens = removeDuplicatesByKey(response.data, "currency");
          const list = tokens.map((item) => {
            return {
              label: renderLabel(item),
              value: item.price,
              date: item.date,
              price: item.price,
              currency: item.currency,
            };
          });
          setTokenTypeList(list);

          setFromToken({ number: 0, price: list[0].price });
          setToToken({ number: 0, price: list[0].price });
        }
      } catch (error) {}
    };
    fetchData();
  }, []);

  return (
    <div className="App">
      <div className="form-swap">
        <h2>Currency swap form</h2>
        <div className="container">
          <InputMoney
            setToken={setFromToken}
            token={fromToken}
            tokenType={tokenTypeList}
            callback={callback}
          />
          <span className="equal">=</span>
          <InputMoney
            isToPrice={true}
            setToken={setToToken}
            token={toToken}
            tokenType={tokenTypeList}
            callback={callback}
          />
        </div>
        <Button onClick={openNotificationWithIcon}>
          {isSwapped ? "Swap" : "Swap again"}
        </Button>
      </div>
    </div>
  );
}

export default App;
