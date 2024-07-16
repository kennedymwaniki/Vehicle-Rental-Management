"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.vehicleSpecificationsRelations = exports.userRelations = exports.fleetManagementRelations = exports.customerSupportTicketRelations = exports.paymentRelations = exports.bookingRelations = exports.vehicleRelations = exports.authenticationRelations = exports.FleetManagementTable = exports.CustomerSupportTicketsTable = exports.AuthUsersTable = exports.PaymentsTable = exports.paymentStatusEnum = exports.BookingsTable = exports.bookingStatusEnum = exports.LocationsTable = exports.VehiclesTable = exports.VehicleSpecificationsTable = exports.UsersTable = exports.roleEnum = void 0;
const pg_core_1 = require("drizzle-orm/pg-core");
const drizzle_orm_1 = require("drizzle-orm");
// Enum for user roles
exports.roleEnum = (0, pg_core_1.pgEnum)("role", ["user", "admin", "both"]);
exports.UsersTable = (0, pg_core_1.pgTable)("users", {
    userId: (0, pg_core_1.serial)("user_id").primaryKey(),
    fullName: (0, pg_core_1.varchar)("full_name").notNull(),
    email: (0, pg_core_1.varchar)("email").unique().notNull(),
    password: (0, pg_core_1.varchar)("password"),
    contactPhone: (0, pg_core_1.varchar)("contact_phone"),
    address: (0, pg_core_1.text)("address"),
    role: (0, exports.roleEnum)("role").default("user").notNull(),
    createdAt: (0, pg_core_1.timestamp)("created_at").defaultNow(),
    updatedAt: (0, pg_core_1.timestamp)("updated_at").defaultNow(),
});
exports.VehicleSpecificationsTable = (0, pg_core_1.pgTable)("vehiclespecifications", {
    vehicleSpecId: (0, pg_core_1.serial)("vehicleSpec_id").primaryKey(),
    manufacturer: (0, pg_core_1.varchar)("manufacturer").notNull(),
    model: (0, pg_core_1.varchar)("model").notNull(),
    year: (0, pg_core_1.integer)("year").notNull(),
    fuelType: (0, pg_core_1.varchar)("fuel_type"),
    engineCapacity: (0, pg_core_1.varchar)("engine_capacity"),
    transmission: (0, pg_core_1.varchar)("transmission"),
    seatingCapacity: (0, pg_core_1.integer)("seating_capacity"),
    color: (0, pg_core_1.varchar)("color"),
    features: (0, pg_core_1.text)("features"),
});
exports.VehiclesTable = (0, pg_core_1.pgTable)("vehicles", {
    vehicleId: (0, pg_core_1.serial)("vehicle_id").primaryKey(),
    vehicleSpecsId: (0, pg_core_1.integer)("vehicle_specId").references(() => exports.VehicleSpecificationsTable.vehicleSpecId, { onDelete: "cascade" }),
    rentalRate: (0, pg_core_1.decimal)("rental_rate").notNull(),
    availability: (0, pg_core_1.boolean)("availability").default(true),
    createdAt: (0, pg_core_1.timestamp)("created_at").defaultNow(),
    updatedAt: (0, pg_core_1.timestamp)("updated_at").defaultNow(),
});
exports.LocationsTable = (0, pg_core_1.pgTable)("locations", {
    locationId: (0, pg_core_1.serial)("location_id").primaryKey(),
    name: (0, pg_core_1.varchar)("name").notNull(),
    address: (0, pg_core_1.text)("address"),
    contactPhone: (0, pg_core_1.varchar)("contact_phone"),
    createdAt: (0, pg_core_1.timestamp)("created_at").defaultNow(),
    updatedAt: (0, pg_core_1.timestamp)("updated_at").defaultNow(),
});
// payment Enum (['Pending', 'Completed', 'Failed']
exports.bookingStatusEnum = (0, pg_core_1.pgEnum)("booking_status", [
    "Pending",
    "Completed",
    "Failed",
]);
exports.BookingsTable = (0, pg_core_1.pgTable)("bookings", {
    bookingId: (0, pg_core_1.serial)("booking_id").primaryKey(),
    userId: (0, pg_core_1.integer)("user_id").references(() => exports.UsersTable.userId, {
        onDelete: "cascade",
    }),
    vehicleId: (0, pg_core_1.integer)("vehicle_id").references(() => exports.VehiclesTable.vehicleId, {
        onDelete: "cascade",
    }),
    locationId: (0, pg_core_1.integer)("location_id").references(() => exports.LocationsTable.locationId, { onDelete: "cascade" }),
    bookingDate: (0, pg_core_1.date)("booking_date").notNull(),
    returnDate: (0, pg_core_1.date)("return_date").notNull(),
    totalAmount: (0, pg_core_1.decimal)("total_amount").notNull(),
    bookingStatus: (0, exports.bookingStatusEnum)("booking_status")
        .default("Pending")
        .notNull(),
    createdAt: (0, pg_core_1.timestamp)("created_at").defaultNow(),
    updatedAt: (0, pg_core_1.timestamp)("updated_at").defaultNow(),
});
// payment Enum (['Pending', 'Completed', 'Failed']
exports.paymentStatusEnum = (0, pg_core_1.pgEnum)("payment_status", [
    "Pending",
    "Completed",
    "Failed",
]);
exports.PaymentsTable = (0, pg_core_1.pgTable)("payments", {
    paymentId: (0, pg_core_1.serial)("payment_id").primaryKey(),
    bookingId: (0, pg_core_1.integer)("booking_id").references(() => exports.BookingsTable.bookingId, {
        onDelete: "cascade",
    }),
    amount: (0, pg_core_1.integer)("amount").notNull(),
    paymentStatus: (0, exports.paymentStatusEnum)("payment_status")
        .default("Pending")
        .notNull(),
    paymentDate: (0, pg_core_1.timestamp)("payment_date").defaultNow(),
    paymentMethod: (0, pg_core_1.varchar)("payment_method"),
    transactionId: (0, pg_core_1.varchar)("transaction_id"),
    createdAt: (0, pg_core_1.timestamp)("created_at").defaultNow(),
    updatedAt: (0, pg_core_1.timestamp)("updated_at").defaultNow(),
});
exports.AuthUsersTable = (0, pg_core_1.pgTable)("auth_users", {
    authId: (0, pg_core_1.serial)("auth_id").primaryKey(),
    userId: (0, pg_core_1.integer)("user_id").references(() => exports.UsersTable.userId, {
        onDelete: "cascade",
    }),
    email: (0, pg_core_1.varchar)("email").unique(),
    role: (0, exports.roleEnum)("role").default("user"),
    password: (0, pg_core_1.varchar)("password").notNull(),
    createdAt: (0, pg_core_1.timestamp)("created_at").defaultNow(),
    updatedAt: (0, pg_core_1.timestamp)("updated_at").defaultNow(),
});
exports.CustomerSupportTicketsTable = (0, pg_core_1.pgTable)("customersupporttickets", {
    ticketId: (0, pg_core_1.serial)("ticket_id").primaryKey(),
    userId: (0, pg_core_1.integer)("user_id").references(() => exports.UsersTable.userId, {
        onDelete: "cascade",
    }),
    subject: (0, pg_core_1.varchar)("subject").notNull(),
    description: (0, pg_core_1.text)("description").notNull(),
    status: (0, pg_core_1.varchar)("status").default("Open"),
    createdAt: (0, pg_core_1.timestamp)("created_at").defaultNow(),
    updatedAt: (0, pg_core_1.timestamp)("updated_at").defaultNow(),
});
exports.FleetManagementTable = (0, pg_core_1.pgTable)("fleetmanagement", {
    fleetId: (0, pg_core_1.serial)("fleet_id").primaryKey(),
    vehicleId: (0, pg_core_1.integer)("vehicle_id").references(() => exports.VehiclesTable.vehicleId, {
        onDelete: "cascade",
    }),
    acquisitionDate: (0, pg_core_1.date)("acquisition_date").notNull(),
    depreciationRate: (0, pg_core_1.decimal)("depreciation_rate"),
    currentValue: (0, pg_core_1.decimal)("current_value"),
    maintenanceCost: (0, pg_core_1.decimal)("maintenance_cost"),
    status: (0, pg_core_1.varchar)("status").default("Active"),
    createdAt: (0, pg_core_1.timestamp)("created_at").defaultNow(),
    updatedAt: (0, pg_core_1.timestamp)("updated_at").defaultNow(),
});
//relationships
// Authentication relations (one-to-one with Users)
exports.authenticationRelations = (0, drizzle_orm_1.relations)(exports.AuthUsersTable, ({ one }) => ({
    user: one(exports.UsersTable, {
        fields: [exports.AuthUsersTable.userId],
        references: [exports.UsersTable.userId],
    }),
}));
// Vehicles relations (many-to-one with VehicleSpecifications)
exports.vehicleRelations = (0, drizzle_orm_1.relations)(exports.VehiclesTable, ({ one }) => ({
    vehicleSpec: one(exports.VehicleSpecificationsTable, {
        fields: [exports.VehiclesTable.vehicleSpecsId],
        references: [exports.VehicleSpecificationsTable.vehicleSpecId],
    }),
}));
// Bookings relations (many-to-one with Users, Vehicles, and Locations, one-to-many with Payments)
exports.bookingRelations = (0, drizzle_orm_1.relations)(exports.BookingsTable, ({ one, many }) => ({
    user: one(exports.UsersTable, {
        fields: [exports.BookingsTable.userId],
        references: [exports.UsersTable.userId],
    }),
    vehicle: one(exports.VehiclesTable, {
        fields: [exports.BookingsTable.vehicleId],
        references: [exports.VehiclesTable.vehicleId],
    }),
    location: one(exports.LocationsTable, {
        fields: [exports.BookingsTable.locationId],
        references: [exports.LocationsTable.locationId],
    }),
    payments: many(exports.PaymentsTable),
}));
// Payments relations (many-to-one with Bookings)
exports.paymentRelations = (0, drizzle_orm_1.relations)(exports.PaymentsTable, ({ one }) => ({
    booking: one(exports.BookingsTable, {
        fields: [exports.PaymentsTable.bookingId],
        references: [exports.BookingsTable.bookingId],
    }),
}));
// CustomerSupportTickets relations (many-to-one with Users)
exports.customerSupportTicketRelations = (0, drizzle_orm_1.relations)(exports.CustomerSupportTicketsTable, ({ one }) => ({
    user: one(exports.UsersTable, {
        fields: [exports.CustomerSupportTicketsTable.userId],
        references: [exports.UsersTable.userId],
    }),
}));
// FleetManagement relations (one-to-one with Vehicles)
exports.fleetManagementRelations = (0, drizzle_orm_1.relations)(exports.FleetManagementTable, ({ one }) => ({
    vehicle: one(exports.VehiclesTable, {
        fields: [exports.FleetManagementTable.vehicleId],
        references: [exports.VehiclesTable.vehicleId],
    }),
}));
// User relations (one-to-many with Bookings and CustomerSupportTickets, one-to-one with Authentication)
exports.userRelations = (0, drizzle_orm_1.relations)(exports.UsersTable, ({ one, many }) => ({
    bookings: many(exports.BookingsTable),
    customerSupportTickets: many(exports.CustomerSupportTicketsTable),
    authentication: many(exports.AuthUsersTable),
}));
// VehicleSpecifications relations (one-to-many with Vehicles)
exports.vehicleSpecificationsRelations = (0, drizzle_orm_1.relations)(exports.VehicleSpecificationsTable, ({ many }) => ({
    vehicles: many(exports.VehiclesTable),
}));
