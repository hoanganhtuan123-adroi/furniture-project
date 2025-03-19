import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import HeroNav from "../components/Hero/HeroNav";
import CartDetail from "../components/Products/CartDetail";
import { getCartApi } from "../services/apiUser";
const CartPage = () => {
    const { id } = useParams();
    const [listCarts, setListCarts] = useState([]);

    const fetchCarts = async () => {
        const response = await getCartApi(id);
        if (response && response.ER === 0) {
            setListCarts(response.data);
        } else {
            setListCarts([]);
        }
    };
    useEffect(() => {
        fetchCarts();
    }, [id]);
    return (
        <div>
            <HeroNav header="Cart" />
            <CartDetail listCarts={listCarts} fetchCarts={fetchCarts} />
        </div>
    );
};

export default CartPage;
