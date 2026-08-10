import React from "react";
import AdminLayout from "@/Layouts/AdminLayout";
import { Head, Link } from "@inertiajs/react";
import "./Sales.css";

export default function Index({ sales }) {
    const formatMoney = (amount) => {
        return new Intl.NumberFormat("en-TZ", {
            minimumFractionDigits: 0,
            maximumFractionDigits: 2,
        }).format(Number(amount) || 0);
    };

    const formatDate = (date) => {
        return new Intl.DateTimeFormat("en-TZ", {
            dateStyle: "medium",
            timeStyle: "short",
        }).format(new Date(date));
    };

    const paymentLabel = (method) => {
        const labels = {
            cash: "Cash",
            mobile_money: "Mobile",
            bank: "Bank",
            credit: "Credit",
        };

        return labels[method] || method;
    };

    return (
        <AdminLayout>
            <Head title="Sales History" />

            <div className="sales-page">

                {/* Header */}
                <div className="sales-header">

                    <div>
                        <h1>Sales History</h1>

                        <p>
                            View and manage completed sales
                        </p>
                    </div>

                    <div className="sales-header-actions">

                        <Link
                            href={route("admin.sales.create")}
                            className="complete-sale-button"
                        >
                            + New Sale
                        </Link>

                    </div>

                </div>

                {/* Sales Panel */}
                <section className="products-panel">

                    <div className="panel-header">

                        <div>
                            <h2>All Sales</h2>

                            <span>
                                {sales.total} sales found
                            </span>
                        </div>

                    </div>

                    {/* Desktop Table */}
                    <div className="sales-history-table-wrapper">

                        <table className="sales-history-table">

                            <thead>
                                <tr>
                                    <th>Invoice</th>
                                    <th>Date</th>
                                    <th>Cashier</th>
                                    <th>Items</th>
                                    <th>Total</th>
                                    <th>Payment</th>
                                    <th>Status</th>
                                    <th>Action</th>
                                </tr>
                            </thead>

                            <tbody>

                                {sales.data.length === 0 ? (

                                    <tr>
                                        <td
                                            colSpan="8"
                                            className="sales-empty"
                                        >
                                            <div>
                                                <div className="empty-icon">
                                                    🧾
                                                </div>

                                                <h3>
                                                    No sales found
                                                </h3>

                                                <p>
                                                    Completed sales will
                                                    appear here.
                                                </p>
                                            </div>
                                        </td>
                                    </tr>

                                ) : (

                                    sales.data.map((sale) => (

                                        <tr key={sale.id}>

                                            <td>
                                                <strong>
                                                    {sale.invoice_number}
                                                </strong>
                                            </td>

                                            <td>
                                                {formatDate(
                                                    sale.created_at
                                                )}
                                            </td>

                                            <td>
                                                {sale.user?.name || "—"}
                                            </td>

                                            <td>
                                                {sale.items?.reduce(
                                                    (total, item) =>
                                                        total +
                                                        Number(
                                                            item.quantity
                                                        ),
                                                    0
                                                )}
                                            </td>

                                            <td>
                                                <strong>
                                                    TZS{" "}
                                                    {formatMoney(
                                                        sale.total
                                                    )}
                                                </strong>
                                            </td>

                                            <td>
                                                <span
                                                    className={`payment-badge payment-${sale.payment_method}`}
                                                >
                                                    {paymentLabel(
                                                        sale.payment_method
                                                    )}
                                                </span>
                                            </td>

                                            <td>
                                                <span
                                                    className={`status-badge status-${sale.status}`}
                                                >
                                                    {sale.status}
                                                </span>
                                            </td>

                                            <td>

                                                <Link
                                                    href={route("admin.sales.show", sale.id)}
                                                    className="view-sale-button"
                                                >
                                                    View
                                                </Link>

                                            </td>

                                        </tr>

                                    ))

                                )}

                            </tbody>

                        </table>

                    </div>

                    {/* Pagination */}
                    {sales.links &&
                        sales.links.length > 3 && (

                            <div className="sales-pagination">

                                {sales.links.map(
                                    (link, index) => (

                                        <Link
                                            key={index}
                                            href={
                                                link.url || "#"
                                            }
                                            className={
                                                link.active
                                                    ? "active"
                                                    : ""
                                            }
                                            dangerouslySetInnerHTML={{
                                                __html:
                                                    link.label,
                                            }}
                                        />

                                    )
                                )}

                            </div>

                        )}

                </section>

            </div>
        </AdminLayout>
    );
}