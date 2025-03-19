import { Bar, BarChart, ResponsiveContainer, XAxis, YAxis } from "recharts";
import { convertVND } from "../../../config/convertVND";

export function Overview({ orders }) {
    // Chuyển đổi dữ liệu từ orders thành định dạng cho biểu đồ
    const chartData = orders.map((order) => ({
        name: new Date(order.created_at).toLocaleString("default", {
            month: "short",
        }), // Lấy tháng từ created_at
        total: order.tong_gia_tri || 0, // Sử dụng tong_gia_tri từ CSDL
    }));

    return (
        <ResponsiveContainer width="100%" height={350}>
            <BarChart data={chartData}>
                <XAxis
                    dataKey="name"
                    stroke="#888888"
                    fontSize={12}
                    tickLine={false}
                    axisLine={false}
                />
                <YAxis
                    stroke="#888888"
                    fontSize={12}
                    tickLine={false}
                    axisLine={false}
                    tickFormatter={(value) => convertVND(value)}
                />
                <Bar
                    dataKey="total"
                    fill="currentColor"
                    radius={[4, 4, 0, 0]}
                    className="fill-primary"
                />
            </BarChart>
        </ResponsiveContainer>
    );
}
