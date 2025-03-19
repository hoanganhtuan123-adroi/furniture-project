import { useState, useEffect } from "react";
import { Activity, CreditCard, DollarSign, Users } from "lucide-react";
import {
    Card,
    CardHeader,
    CardTitle,
    CardBody,
    CardText,
    Tabs,
    Tab,
} from "react-bootstrap";
import { RecentSales } from "./RecentSales";
import { Overview } from "./Overview";
import { getAllOrdersApi } from "../../../services/apiOrder";
import { convertVND } from "../../../config/convertVND";
import "bootstrap/dist/css/bootstrap.min.css";

export default function MainDashboard() {
    const [dashboardData, setDashboardData] = useState({
        totalRevenue: 0,
        totalSales: 0,
        activeOrders: 0,
        recentSales: [],
    });

    useEffect(() => {
        const fetchDashboardData = async () => {
            try {
                const res = await getAllOrdersApi();
                if (res && res.ER === 0) {
                    const orders = res.data;

                    const totalRevenue = orders.reduce(
                        (sum, order) =>
                            sum + parseFloat(order.tong_gia_tri || 0),
                        0
                    );

                    const totalSales = orders.length;

                    const activeOrders = orders.filter(
                        (order) =>
                            order.trang_thai_don_hang === "Đang xử lý" ||
                            order.trang_thai_don_hang === "Chưa giao hàng"
                    ).length;

                    const recentSales = orders
                        .sort(
                            (a, b) =>
                                new Date(b.created_at).getTime() -
                                new Date(a.created_at).getTime()
                        )
                        .slice(0, 5)
                        .map((order) => ({
                            name: order.ho_va_ten || "Khách hàng ẩn danh",
                            email: order.email || "no-email@example.com",
                            amount: parseFloat(order.tong_gia_tri || 0),
                        }));

                    setDashboardData({
                        totalRevenue,
                        totalSales,
                        activeOrders,
                        recentSales,
                    });
                }
            } catch (error) {
                console.error("Error fetching dashboard data:", error);
            }
        };

        fetchDashboardData();
    }, []);

    return (
        <div className="flex min-h-screen w-full flex-col">
            <div className="flex-1 space-y-4 p-8 pt-6">
                <div className="d-flex justify-content-between align-items-center mb-2">
                    <h2 className="text-3xl font-bold tracking-tight">
                        Dashboard
                    </h2>
                    <div className="d-none d-md-flex">
                        <span className="text-sm text-muted-foreground">
                            Welcome back
                        </span>
                    </div>
                </div>
                <Tabs
                    defaultActiveKey="overview"
                    id="dashboard-tabs"
                    className="space-y-4"
                >
                    <Tab eventKey="overview" title="Overview">
                        <div className="space-y-4">
                            <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
                                <Card>
                                    <CardHeader className="d-flex justify-content-between align-items-center pb-2">
                                        <CardTitle className="text-sm font-medium">
                                            Total Revenue
                                        </CardTitle>
                                        <DollarSign className="h-4 w-4 text-muted-foreground" />
                                    </CardHeader>
                                    <CardBody>
                                        <div className="text-2xl font-bold">
                                            {convertVND(
                                                dashboardData.totalRevenue
                                            )}
                                        </div>
                                        <CardText className="text-xs text-muted-foreground">
                                            +20.1% from last month
                                        </CardText>
                                    </CardBody>
                                </Card>
                                <Card>
                                    <CardHeader className="d-flex justify-content-between align-items-center pb-2">
                                        <CardTitle className="text-sm font-medium">
                                            Sales
                                        </CardTitle>
                                        <CreditCard className="h-4 w-4 text-muted-foreground" />
                                    </CardHeader>
                                    <CardBody>
                                        <div className="text-2xl font-bold">
                                            {dashboardData.totalSales}
                                        </div>
                                        <CardText className="text-xs text-muted-foreground">
                                            +19% from last month
                                        </CardText>
                                    </CardBody>
                                </Card>
                            </div>
                            <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-7">
                                <Card className="col-span-3">
                                    <CardHeader>
                                        <CardTitle>Recent Sales</CardTitle>
                                        <CardText className="text-muted">
                                            You made {dashboardData.totalSales}{" "}
                                            sales this month.
                                        </CardText>
                                    </CardHeader>
                                    <CardBody>
                                        <RecentSales
                                            recentSales={
                                                dashboardData.recentSales
                                            }
                                        />
                                    </CardBody>
                                </Card>
                            </div>
                        </div>
                    </Tab>
                </Tabs>
            </div>
        </div>
    );
}
