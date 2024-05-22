import React, { useContext, useEffect, useState } from 'react';
import SummaryApi from '../common';
import Context from '../context';
import displayINRCurrency from '../helpers/displayCurrency';

const CartPanel = () => {
    const [cartData, setCartData] = useState([]);
    const [loading, setLoading] = useState(false);
    const context = useContext(Context);
    const loadingCart = new Array(4).fill(null);

    const fetchCartData = async () => {
        setLoading(true);
        try {
            const response = await fetch(SummaryApi.allCartViewProduct.url, {
                method: SummaryApi.allCartViewProduct.method,
                credentials: 'include',
                headers: {
                    'content-type': 'application/json'
                }
            });
            const responseData = await response.json();
            if (responseData.success) {
                setCartData(responseData.data);
            } else {
                console.error('Failed to fetch cart data:', responseData.message);
            }
        } catch (error) {
            console.error('Error fetching cart data:', error);
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        fetchCartData();
    }, []);

    return (
        <div className='container mx-auto'>
            <div className='text-center text-lg my-3'>
                {cartData.length === 0 && !loading && (
                    <p className='bg-white py-5'>No Data</p>
                )}
            </div>

            <div className='flex flex-col lg:flex-row gap-10 lg:justify-between p-4'>
                <div className='w-full max-w-3xl'>
                    {loading ? (
                        loadingCart.map((el, index) => (
                            <div
                                key={index}
                                className='w-full bg-slate-200 h-32 my-2 border border-slate-300 animate-pulse rounded'></div>
                        ))
                    ) : (
                        cartData.map((product) => (
                            <div
                                key={product?._id}
                                className='w-full bg-white h-32 my-2 border border-slate-300 rounded grid grid-cols-[128px,1fr]'>
                                <div className='w-32 h-32 bg-slate-200'>
                                    <img
                                        src={product?.productId?.productImage[0]}
                                        alt={product?.productId?.productName} // Add alt text for accessibility
                                        className='w-full h-full object-scale-down mix-blend-multiply'
                                    />
                                </div>
                                <div className='px-5  relative'>
                                    <h2 className='text-lg lg:text-xl text-ellipsis line-clamp-1'>
                                        {product?.productId?.productName}
                                    </h2>
                                    <p className='capitalize text-slate-500'>
                                        {product?.productId?.category}
                                    </p>
                                    <div className='flex items-center justify-between'>
                                        <p className='text-red-600 font-medium text-lg'>
                                            {displayINRCurrency(product?.productId?.sellingPrice)}
                                        </p>
                                        <p className='text-slate-600 font-semibold text-lg'>
                                            {displayINRCurrency(product?.productId?.sellingPrice * product?.quantity)}
                                        </p>
                                    </div>
                                    
                                    <p>User name: {product.userName}</p>
                                    <p>User mail: {product.userMail}</p>
                                </div>
                            </div>
                        ))
                    )}
                </div>
            </div>
        </div>
    );
};

export default CartPanel;
