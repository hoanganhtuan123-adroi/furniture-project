import { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { updateDetailData } from "../../../../redux/actions/actionProductDS";
import Form from "react-bootstrap/Form";
const FormAddDetail = () => {
    const dispatch = useDispatch();
    const detailData = useSelector((state) => state.product.detailData);
    const [quantityImport, setQuantityImport] = useState(
        detailData.so_luong_nhap || 0
    );
    const [quantityStock, setQuantityStock] = useState(
        detailData.so_luong_ton_kho || 0
    );
    const [quantitySell, setQuantitySell] = useState(
        detailData.so_luong_ban_ra || 0
    );
    const [priceImport, setPriceImport] = useState(detailData.gia_nhap || 0);
    const [dateImport, setDateImport] = useState(detailData.ngay_nhap || "");
    const [batch, setBatch] = useState(detailData.lo_hang || ""); // lô hàng
    const [description, setDescription] = useState(
        detailData.mo_ta_san_pham || ""
    );

    const data = {
        so_luong_nhap: quantityImport,
        so_luong_ton_kho: quantityStock,
        so_luong_ban_ra: quantitySell,
        gia_nhap: priceImport,
        ngay_nhap: dateImport,
        lo_hang: batch,
        mo_ta_san_pham: description,
    };
    useEffect(() => {
        dispatch(updateDetailData(data));
    }, [
        quantityImport,
        quantityStock,
        quantitySell,
        priceImport,
        dateImport,
        batch,
        description,
    ]);
    return (
        <>
            <Form className="form-container">
                <div>
                    <Form.Group className="mb-3 form-container--child">
                        <Form.Label>Số lượng nhập</Form.Label>
                        <Form.Control
                            onChange={(e) => setQuantityImport(e.target.value)}
                            type="text"
                            value={quantityImport}
                        />
                    </Form.Group>
                    <Form.Group className="mb-3 form-container--child">
                        <Form.Label>Số lượng tồn kho</Form.Label>
                        <Form.Control
                            onChange={(e) => setQuantityStock(e.target.value)}
                            type="text"
                            value={quantityStock}
                        />
                    </Form.Group>
                    <Form.Group className="mb-3 form-container--child">
                        <Form.Label>Số lượng bán ra</Form.Label>
                        <Form.Control
                            onChange={(e) => setQuantitySell(e.target.value)}
                            type="text"
                            value={quantitySell}
                        />
                    </Form.Group>
                </div>
                <div>
                    <Form.Group className=" mb-3 form-container--child">
                        <Form.Label>Giá nhập</Form.Label>
                        <Form.Control
                            onChange={(e) => setPriceImport(e.target.value)}
                            type="text"
                            value={priceImport}
                        />
                    </Form.Group>
                    <Form.Group className=" mb-3 form-container--child">
                        <Form.Label>Ngày nhập</Form.Label>
                        <Form.Control
                            onChange={(e) => setDateImport(e.target.value)}
                            type="text"
                            value={dateImport}
                        />
                    </Form.Group>
                    <Form.Group className=" mb-3 form-container--child">
                        <Form.Label>Lô hàng</Form.Label>
                        <Form.Control
                            onChange={(e) => setBatch(e.target.value)}
                            type="text"
                            value={batch}
                        />
                    </Form.Group>
                </div>
            </Form>
            <div>
                <Form.Label>Mô tả sản phẩm</Form.Label>
                <Form.Control
                    as="textarea"
                    aria-label="With textarea"
                    style={{ height: "100px" }}
                    onChange={(e) => setDescription(e.target.value)}
                    value={description}
                />
            </div>
        </>
    );
};

export default FormAddDetail;
