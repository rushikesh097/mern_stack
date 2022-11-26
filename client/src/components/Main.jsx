import React from "react";
import axios from "axios";
import { useEffect } from "react";
import { useState } from "react";
import ProductDetails from "./ProductDetails";
import BuyedProductDetails from "./BuyedProductDetails";
import { USER_LINK, APP_NAME } from "../Data";
import MoneySvg from '../assets/money.svg'

const Main = (props) => {
  const [isShown,setHasShown] = useState(false)
  const [bg, setBg] = useState("bg-green-500");
  const [user, setUser] = useState({
    name: "",
    email: "",
    balance: 0,
  });

  const [products, setProducts] = useState([]);
  const [buyedItems, setBuyedItems] = useState([]);

  const [money, setMoney] = useState(user.balance);
  useEffect(() => {
    axios
      .get(`${USER_LINK}getuser/${props.id}`)
      .then((resonse) => {
        setUser({
          name: resonse.data[0].name,
          email: resonse.data[0].email,
          balance: resonse.data[0].balance,
        });
        setMoney(resonse.data[0].balance);
      })
      .catch((err) => console.log(err));
  });

  return (
    <div>
      <div className="flex justify-between items-center bg-indigo-800 w-full sm:w-full">
        <div>
          <h1 className="text-5xl text-gray-300 font-extrabold ml-7">
            {APP_NAME}
          </h1>
        </div>
        <div className="flex  flex-col items-center bg-blue-900 pt-1 pr-5 pl-6">
          <h1 className="text-cyan-300 text-center font-semibold text-xl">
            {user.name}
          </h1>
          <div
            className={`flex bg-gradient-to-r ${bg} items-center flex-col  w-24 rounded-md mb-1 px-1`}
          >
            <div className="flex flex-row">
              <img src={MoneySvg} alt="currency" className="w-8 p-1" />
              <h4 className="text-slate-800 my-1 font-semibold">
                &#8377;{money.toLocaleString("en-IN")}
              </h4>
            </div>
            <div className="text-xs font-semibold">
              {isShown ? "Low Money !" : ""}
            </div>
          </div>
          <div className="flex align-baseline">
            <button
              className=" flex items-center h-6 px-3 text-sm font-semibold rounded-md bg-slate-400 text-slate-800 mb-2"
              onClick={() => {
                props.setOnHome(false);
              }}
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="16"
                height="16"
                className="fill-black mr-2"
                fill="text-black"
                viewBox="0 0 16 16"
              >
                <path
                  fillRule="evenodd"
                  d="M6 12.5a.5.5 0 0 0 .5.5h8a.5.5 0 0 0 .5-.5v-9a.5.5 0 0 0-.5-.5h-8a.5.5 0 0 0-.5.5v2a.5.5 0 0 1-1 0v-2A1.5 1.5 0 0 1 6.5 2h8A1.5 1.5 0 0 1 16 3.5v9a1.5 1.5 0 0 1-1.5 1.5h-8A1.5 1.5 0 0 1 5 12.5v-2a.5.5 0 0 1 1 0v2z"
                />
                <path
                  fillRule="evenodd"
                  d="M.146 8.354a.5.5 0 0 1 0-.708l3-3a.5.5 0 1 1 .708.708L1.707 7.5H10.5a.5.5 0 0 1 0 1H1.707l2.147 2.146a.5.5 0 0 1-.708.708l-3-3z"
                />
              </svg>
              Log Out
            </button>
          </div>
        </div>
      </div>
      <div className="flex p-3 mx-12 flex-row gap-6 justify-between m-5">
        <ProductDetails
          setProducts={setProducts}
          products={products}
          setBuyedItems={(buyedItems) => {
            setBuyedItems(buyedItems);
          }}
          setMoney={(money) => {
            setMoney(money);
          }}
          money={money}
          id={props.id}
          setHasShown={setHasShown}
          setBg={setBg}
        />

        <BuyedProductDetails
          setProducts={(products) => {
            setProducts(products);
          }}
          setBuyedItems={setBuyedItems}
          buyedItems={buyedItems}
          setMoney={(money) => {
            setMoney(money);
          }}
          money={money}
          id={props.id}
        />
      </div>
    </div>
  );
};

export default Main;
