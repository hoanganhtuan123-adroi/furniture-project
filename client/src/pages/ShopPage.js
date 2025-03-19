import React, { useState } from "react";
import HeroNav from "../components/Hero/HeroNav";
import ShopProducts from "../components/Products/ShopProducts";
const ShopPage = () => {
    const [quantityProduct, setQuantityProduct] = useState(0);
    return (
        <div>
            <HeroNav header="Shop" quantityProduct={quantityProduct} />
            <ShopProducts setQuantityProduct={setQuantityProduct} />
        </div>
    );
};

export default ShopPage;
