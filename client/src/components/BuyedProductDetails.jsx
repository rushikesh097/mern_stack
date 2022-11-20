import React from "react";
import { useEffect } from "react";
import axios from "axios";
import { LINK } from "../Data";
import ProductCard from "./ProductCard";

const BuyedProductDetails = (props) => {
  useEffect(() => {
    axios
      .get(`${LINK}buyedproducts/${props.id}`)
      .then((resonse) => {
        props.setBuyedItems(resonse.data);
      })
      .catch((err) => console.log(err));
  }, []);

  const updateBalance = (id, price) => {
    axios
      .put(`${LINK}updatebalance`, {
        id: id,
        balance: price,
      })
      .then((resonse) => {
        props.setMoney(price);
      })
      .catch((err) => console.log(err));
  };

  const deleteBuyedProduct = (id) => {
    console.log(id);
    if (id !== undefined) {
      console.log(id);
      props.setBuyedItems(
        props.buyedItems.filter((item) => {
          return item.id !== id;
        })
      );

      axios
        .delete(`${LINK}deletebuyedproduct/${id}`)
        .then((resonse) => {
          console.log("Zal");
        })
        .catch((err) => console.log(err));
    }
  };

  const addProduct = (product) => {
    axios
      .post(`${LINK}addproduct`, {
        name: product.name,
        description: product.description,
        price: product.price,
      })
      .then((resonse) => {
        props.setProducts((products) => [
          ...products,
          {
            name: product.name,
            description: product.description,
            price: product.price,
          },
        ]);
        deleteBuyedProduct(product.id);
        updateBalance(props.id, props.money + product.price);
      })
      .catch((err) => console.log(err));
  };

  const doTrasaction = (product) => {
    addProduct(product);
  };

  return (
    <div className="flex w-2/5 p-3 flex-col gap-4 bg-indigo-300 rounded-md">
      <div className="text-xl text-slate-200 font-semibold text-center bg-indigo-700 p-3 rounded-md">
        Sell Items
      </div>
      {props.buyedItems.length !== 0 ? (
        props.buyedItems.map((product, key) => {
          return (
            <ProductCard
              key={key}
              text={"Sell now"}
              doTrasaction={doTrasaction}
              product={product}
            />
          );
        })
      ) : (
        <div className="text-slate-200 text-xl first-letter:text-red-600 font-semibold">
          No Data
        </div>
      )}
    </div>
  );
};

export default BuyedProductDetails;
