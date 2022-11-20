import React from "react";
import { useEffect } from "react";
import axios from "axios";
import { useRef } from "react";
import { LINK } from "../Data";
import ProductCard from "./ProductCard";

const ProductDetails = (props) => {
  const counter = useRef(0);

  useEffect(() => {
    axios
      .get(`${LINK}products`)
      .then((resonse) => {
        props.setProducts(resonse.data);
      })
      .catch((err) => {
        console.log(err);
      });
    counter.current = counter.current + 1;
    console.log(counter.current);
  }, []);

  const updateBalance = (id, price) => {
    console.log(id);
    axios
      .put(`${LINK}updatebalance`, {
        id: id,
        balance: props.money - price,
      })
      .then((resonse) => {
        props.setMoney((money) => money - price);
      })
      .catch((err) => console.log(err));
  };

  const addBuyedItem = (product) => {
    axios
      .post(`${LINK}addbuyedproduct`, {
        name: product.name,
        description: product.description,
        price: product.price,
        userId: props.id,
      })
      .then((resonse) => {
        updateBalance(props.id, product.price);
        props.setBuyedItems((buyedItems) => [
          {
            name: product.name,
            description: product.description,
            price: product.price,
            userId: props.id,
          },
          ...buyedItems,
        ]);
        deleteProduct(product.id);
      })
      .catch((err) => console.log(err));
  };

  const deleteProduct = (id) => {
    axios
      .delete(`${LINK}deleteproduct/${id}`)
      .then((resonse) => {
        props.setProducts(
          props.products.filter((product) => {
            return product.id !== id;
          })
        );
      })
      .catch((err) => console.log(err));
  };

  const showMsg = () => {
    props.setBg("from-red-400 to-red-600 shadow-xl shadow-red-500 ");
    props.setHasShown(true)
    setTimeout(() => {
      props.setBg("bg-green-400");
      props.setHasShown(false);
    }, 2000);
  }

  const doTrasaction = (product) => {
    product.price <= props.money
      ? addBuyedItem(product)
      : showMsg();
  }

  return (
    <div className="p-3 flex flex-col gap-4 w-3/5 bg-indigo-300 rounded-md">
      <div className="text-xl text-slate-200 font-semibold text-center bg-indigo-700 p-3 rounded-md">
        Buy Items
      </div>
      {props.products.length !== 0 ? (
        props.products.map((product, key) => {
          return <ProductCard key={key} text={"Buy now"} doTrasaction={doTrasaction} product={product} />
        })
      ) : (
        <div className="text-slate-200 text-xl first-letter:text-red-600">
          No Data
        </div>
      )}
    </div>
  );
};

export default ProductDetails;
