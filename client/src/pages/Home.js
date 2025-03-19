import React from "react";
import Hero from "../components/Hero/Hero";
import ProductRelease from "../components/Products/ProductRelease";
import ProductFeature from "../components/Products/ProductFeature";
const Home = () => {
    return (
        <div>
            <Hero />
            <ProductRelease />
            <ProductFeature />
        </div>
    );
};

export default Home;
