import React from "react";
import { Image, Row, Col } from "react-bootstrap";
import { convertVND } from "../../../config/convertVND"; // Giả định hàm convertVND

export function RecentSales({ recentSales }) {
    return (
        <div className="space-y-8">
            {recentSales.length > 0 ? (
                recentSales.map((sale, index) => (
                    <Row key={index} className="align-items-center">
                        <Col xs={2} className="p-0">
                            <Image
                                src={`/placeholder.svg?height=36&width=36`}
                                alt="Avatar"
                                roundedCircle
                                width={36}
                                height={36}
                                className="border"
                            />
                            {!sale.name && (
                                <span className="position-absolute top-50 start-50 translate-middle text-dark fw-bold">
                                    {sale.name
                                        .split(" ")
                                        .map((n) => n[0])
                                        .join("")}
                                </span>
                            )}
                        </Col>
                        <Col xs={8} className="ml-4">
                            <p className="mb-0 text-sm font-medium leading-none">
                                {sale.name}
                            </p>
                            <p className="mb-0 text-sm text-muted-foreground">
                                {sale.email}
                            </p>
                        </Col>
                        <Col xs={2} className="text-end font-medium">
                            {convertVND(sale.amount)}
                        </Col>
                    </Row>
                ))
            ) : (
                <p className="text-center text-muted-foreground">
                    No recent sales available.
                </p>
            )}
        </div>
    );
}
