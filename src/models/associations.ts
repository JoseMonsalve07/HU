import { User } from "./users.model.ts";
import { Client } from "./clients.model.ts";
import { Order } from "./orders.model.ts";
import { Product } from "./products.model.ts";
import { OrderDetail } from "./orderDetails.model.ts";

/* ==========================
   USER <-> CLIENT
========================== */
User.hasMany(Client, {
    foreignKey: "user_id",
    as: "clients",
});
Client.belongsTo(User, {
    foreignKey: "user_id",
    as: "user",
});

/* ==========================
   USER <-> ORDER
========================== */
User.hasMany(Order, {
    foreignKey: "user_id",
    as: "orders",
});
Order.belongsTo(User, {
    foreignKey: "user_id",
    as: "user",
});

/* ==========================
   CLIENT <-> ORDER
========================== */
Client.hasMany(Order, {
    foreignKey: "client_id",
    as: "orders",
});
Order.belongsTo(Client, {
    foreignKey: "client_id",
    as: "client",
});

/* ==========================
   ORDER <-> ORDER_DETAILS
========================== */
Order.hasMany(OrderDetail, {
    foreignKey: "order_id",
    as: "orderDetail",
});
OrderDetail.belongsTo(Order, {
    foreignKey: "order_id",
    as: "order",
});

/* ==========================
   PRODUCT <-> ORDER_DETAILS
========================== */
Product.hasMany(OrderDetail, {
    foreignKey: "product_id",
    as: "orderDetail",
});
OrderDetail.belongsTo(Product, {
    foreignKey: "product_id",
    as: "product",
});

/* ==========================
   ORDER <-> PRODUCT (Many-to-Many)
   A través de OrderDetail
========================== */
Order.belongsToMany(Product, {
    through: OrderDetail,
    foreignKey: "order_id",
    otherKey: "product_id",
    as: "products",
});
Product.belongsToMany(Order, {
    through: OrderDetail,
    foreignKey: "product_id",
    otherKey: "order_id",
    as: "orders",
});

console.log("✅ Relaciones Sequelize aplicadas correctamente.");
