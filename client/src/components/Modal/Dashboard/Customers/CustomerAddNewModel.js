import { useState, useEffect } from "react";
import Button from "react-bootstrap/Button";
import Modal from "react-bootstrap/Modal";
import Nav from "react-bootstrap/Nav";
import Form from "react-bootstrap/Form";
import { IoIosSave } from "react-icons/io";
import { FaEdit } from "react-icons/fa";
import { createCustomerApi } from "../../../../services/apiCustomer";
import { toast } from "react-toastify";
function CustomerAddNewModel(props) {
    const { show, setShow } = props;
    const [previewAvatar, setPreviewAvatar] = useState([]);
    const [eventkey, setEventkey] = useState("1");

    const [customerName, setCustomerName] = useState("");
    const [birthDate, setBirthDate] = useState("");
    const [phoneNumber, setPhoneNumber] = useState("");
    const [address, setAddress] = useState("");
    const [username, setUsername] = useState("");
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [image, setImage] = useState("");
    const convertToBase64 = async (imageUrl) => {
        try {
            const response = await fetch(imageUrl);
            const blob = await response.blob();
            return new Promise((resolve, reject) => {
                const reader = new FileReader();
                reader.onloadend = () => resolve(reader.result);
                reader.onerror = reject;
                reader.readAsDataURL(blob);
            });
        } catch (error) {
            console.error("Error converting image to base64:", error);
            return null;
        }
    };

    const handleUploadAvatar = async (e) => {
        const file = e.target.files[0];
        setPreviewAvatar(URL.createObjectURL(file));
        const imgBase64 = await convertToBase64(URL.createObjectURL(file));
        setImage(imgBase64);
    };

    const handleClose = () => {
        setShow(false);
        setEventkey("1");
        setPreviewAvatar("");
        setCustomerName("");
        setBirthDate("");
        setPhoneNumber("");
        setAddress("");
        setUsername("");
        setEmail("");
        setPassword("");
        setImage("");
    };

    const handleSubmit = async () => {
        try {
            const data = {
                ho_va_ten: customerName,
                ngay_sinh: birthDate,
                so_dien_thoai: phoneNumber,
                dia_chi: address,
                username: username,
                email: email,
                mat_khau: password,
                anh: image,
            };
            const response = await createCustomerApi(data);

            if (response && response.ER === 0) {
                toast.success(response.message);
                handleClose();
                // callApiCustomer();
            } else {
                toast.error(response.message);
            }
        } catch (error) {
            toast.error("Có lỗi xảy ra, vui lòng thử lại sau", error);
        }
    };

    const handleSelect = (eventKey) => setEventkey(eventKey);

    return (
        <>
            <Modal show={show} onHide={handleClose}>
                <Modal.Header className="d-flex flex-column align-items-start">
                    <Modal.Title>Thêm mới khách hàng</Modal.Title>
                </Modal.Header>
                <Nav
                    variant="underline"
                    defaultActiveKey={eventkey}
                    style={{
                        backgroundColor: "#0070f4",
                        padding: "5px 16px",
                    }}
                    onSelect={handleSelect}
                >
                    <Nav.Item>
                        <Nav.Link className="text-white" eventKey="1">
                            Thông tin
                        </Nav.Link>
                    </Nav.Item>
                    <Nav.Item>
                        <Nav.Link className="text-white" eventKey="2">
                            Tài khoản
                        </Nav.Link>
                    </Nav.Item>
                </Nav>
                <Modal.Body>
                    <Form
                        className="p-3"
                        style={{
                            display: "grid",
                            gridTemplateColumns: "30% 70%",
                        }}
                    >
                        <div className="d-flex flex-column align-items-center gap-3">
                            <div
                                className="border border-1 rounded"
                                style={{ width: "100px", height: "100px" }}
                            >
                                <img
                                    alt="avatar"
                                    src={image ? image : previewAvatar}
                                    style={{
                                        width: "100%",
                                        height: "100%",
                                        objectFit: "cover",
                                    }}
                                />
                            </div>
                            <Form.Group className="mb-3">
                                <Form.Label
                                    className="btn btn-success"
                                    htmlFor="fileAvatar"
                                >
                                    Tải ảnh
                                </Form.Label>
                                <Form.Control
                                    id="fileAvatar"
                                    type="file"
                                    hidden
                                    accept="image/*"
                                    onChange={(e) => handleUploadAvatar(e)}
                                />
                            </Form.Group>
                        </div>
                        {eventkey === "1" ? (
                            <div className="d-flex flex-column gap-3">
                                <Form.Group
                                    style={{
                                        display: "grid",
                                        gridTemplateColumns: "40% 60%",
                                    }}
                                >
                                    <Form.Label>Họ và tên</Form.Label>
                                    <Form.Control
                                        type="text"
                                        value={customerName}
                                        onChange={(e) =>
                                            setCustomerName(e.target.value)
                                        }
                                    />
                                </Form.Group>
                                <Form.Group
                                    style={{
                                        display: "grid",
                                        gridTemplateColumns: "40% 60%",
                                    }}
                                >
                                    <Form.Label>Ngày sinh</Form.Label>
                                    <Form.Control
                                        type="text"
                                        value={birthDate}
                                        onChange={(e) =>
                                            setBirthDate(e.target.value)
                                        }
                                    />
                                </Form.Group>
                                <Form.Group
                                    style={{
                                        display: "grid",
                                        gridTemplateColumns: "40% 60%",
                                    }}
                                >
                                    <Form.Label>Số điện thoại</Form.Label>
                                    <Form.Control
                                        type="text"
                                        value={phoneNumber}
                                        onChange={(e) =>
                                            setPhoneNumber(e.target.value)
                                        }
                                    />
                                </Form.Group>
                                <Form.Group
                                    style={{
                                        display: "grid",
                                        gridTemplateColumns: "40% 60%",
                                    }}
                                >
                                    <Form.Label>Địa chỉ</Form.Label>
                                    <Form.Control
                                        type="text"
                                        value={address}
                                        onChange={(e) =>
                                            setAddress(e.target.value)
                                        }
                                    />
                                </Form.Group>
                            </div>
                        ) : (
                            <div className="d-flex flex-column gap-3">
                                <Form.Group
                                    style={{
                                        display: "grid",
                                        gridTemplateColumns: "40% 60%",
                                    }}
                                >
                                    <Form.Label>Tài khoản</Form.Label>
                                    <Form.Control
                                        type="text"
                                        value={username}
                                        onChange={(e) =>
                                            setUsername(e.target.value)
                                        }
                                    />
                                </Form.Group>
                                <Form.Group
                                    style={{
                                        display: "grid",
                                        gridTemplateColumns: "40% 60%",
                                    }}
                                >
                                    <Form.Label>Email</Form.Label>
                                    <Form.Control
                                        type="email"
                                        value={email}
                                        onChange={(e) =>
                                            setEmail(e.target.value)
                                        }
                                    />
                                </Form.Group>
                                <Form.Group
                                    style={{
                                        display: "grid",
                                        gridTemplateColumns: "40% 60%",
                                    }}
                                >
                                    <Form.Label>Mật khẩu</Form.Label>
                                    <Form.Control
                                        type="password"
                                        value={password}
                                        onChange={(e) =>
                                            setPassword(e.target.value)
                                        }
                                    />
                                </Form.Group>
                            </div>
                        )}
                    </Form>
                </Modal.Body>
                <Modal.Footer>
                    <Button
                        className="d-flex align-items-center gap-2"
                        variant="primary"
                        onClick={handleSubmit}
                    >
                        <IoIosSave />
                        Thêm mới
                    </Button>

                    <Button
                        className="mx-3"
                        variant="secondary"
                        onClick={handleClose}
                    >
                        Đóng
                    </Button>
                </Modal.Footer>
            </Modal>
        </>
    );
}

export default CustomerAddNewModel;
