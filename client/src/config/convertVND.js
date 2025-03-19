export const convertVND = (amount) => {
    // Kiểm tra nếu amount là undefined hoặc null, trả về chuỗi mặc định
    if (amount === undefined || amount === null) {
        return "0 đ";
    }
    // Chuyển đổi thành số nếu amount là chuỗi, và định dạng
    const numberAmount = Number(amount);
    return numberAmount.toLocaleString("vi-VN") + " đ";
};

export const calculateDiscountedPrice = (originalPrice, discountPercentage) => {
    // Kiểm tra và chuyển đổi kiểu dữ liệu nếu cần
    const price =
        typeof originalPrice === "string"
            ? parseFloat(originalPrice)
            : originalPrice;
    const discount =
        typeof discountPercentage === "string"
            ? parseFloat(discountPercentage)
            : discountPercentage;

    if (typeof price !== "number" || price <= 0) {
        throw new Error("Giá gốc phải là số dương.");
    }

    if (typeof discount !== "number" || discount < 0 || discount > 100) {
        throw new Error("Phần trăm giảm giá phải là số từ 0 đến 100.");
    }

    const discountAmount = price * (discount / 100);
    const discountedPrice = price - discountAmount;

    return Number(discountedPrice.toFixed(2));
};

export const normalizeProductCode = (codeProduct) => {
    if (!codeProduct) return ""; // Xử lý trường hợp rỗng

    // Kiểm tra và xử lý các trường hợp
    let normalizedCode = codeProduct.trim(); // Loại bỏ khoảng trắng thừa ở đầu/cuối

    // Trường hợp 1: Item# - 1510435 -> Item1510435
    if (normalizedCode.includes("# - ")) {
        normalizedCode = normalizedCode.replace("# - ", "");
    }
    // Trường hợp 2: Item 1510435 -> Item1510435
    else if (normalizedCode.includes(" ")) {
        normalizedCode = normalizedCode.replace(" ", "");
    }
    // Trường hợp 3: Đã ở dạng Item1510435 -> Không thay đổi

    return normalizedCode;
};
