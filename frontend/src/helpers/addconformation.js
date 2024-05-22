import SummaryApi from "../common";
import { toast } from 'react-toastify';

const addToConformation = async (e, userId, productId) => {
    e?.stopPropagation();
    e?.preventDefault();

    const response = await fetch(SummaryApi.conformation.url, {
        method: SummaryApi.conformation.method,
        credentials: 'include',
        headers: {
            "content-type": 'application/json'
        },
        body: JSON.stringify({
            userId: userId,
            productId: productId
        })
    });

    const responseData = await response.json();

    if (responseData.success) {
        toast.success(responseData.message);
    }

    if (responseData.error) {
        toast.error(responseData.message);
    }

    return responseData;
};

export default addToConformation;
