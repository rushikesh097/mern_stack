import React from 'react'
import shoes from '../assets/shoes.jpg'

const ProductCard = (props) => {
  return (
    <div className="flex font-sans rounded-lg bg-gradient-to-l from-indigo-600 to-blue-300 hover:shadow-sm hover:shadow-indigo-900">
      <div className="flex-none sm:w-28 md:w-32 2xl:w-96 relative">
        <img
          src={shoes}
          alt=""
          className="absolute inset-0 w-full h-full object-cover rounded-l-lg"
          loading="lazy"
        />
      </div>
      <div className="flex-auto max-w-xs p-6">
        <div className="flex flex-wrap">
          <h1 className="flex-auto text-lg font-semibold text-slate-900">
            {props.product.name}
          </h1>
          <div className="text-lg text-amber-400 font-semibold">
            &#8377;{props.product.price}
          </div>
          <div className="w-full flex-none text-sm font-medium text-slate-700 mt-2">
            {props.product.description}
          </div>
        </div>
        <div className="flex mt-7 space-x-4 mb-6 text-sm font-medium">
          <div className="flex-auto flex space-x-4">
            <button
              className="h-10 px-6 font-semibold rounded-md bg-yellow-400 hover:shadow-md text-black active:bg-yellow-200"
              onClick={() => {
                props.doTrasaction(props.product)
              }}
            >
              {props.text}
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}

export default ProductCard