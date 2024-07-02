import {
  pgTable,
  serial,
  varchar,
  integer,
  decimal,
  boolean,
  timestamp,
  text,
  date,
} from "drizzle-orm/pg-core";
import { relations } from "drizzle-orm";

// Enum for user roles
enum UserRole {
  USER = "user",
  ADMIN = "admin",
}

export const UsersTable = pgTable("users", {
  userId: serial("user_id").primaryKey(),
  fullName: varchar("full_name").notNull(),
  email: varchar("email").unique().notNull(),
  password: varchar("password"),
  contactPhone: varchar("contact_phone"),
  address: text("address"),
  role: varchar("role").default(UserRole.USER),
  createdAt: timestamp("created_at").defaultNow(),
  updatedAt: timestamp("updated_at").defaultNow(),
});

export const VehicleSpecificationsTable = pgTable("vehiclespecifications", {
  vehicleSpecId: serial("vehicleSpec_id").primaryKey(),
  manufacturer: varchar("manufacturer").notNull(),
  model: varchar("model").notNull(),
  year: integer("year").notNull(),
  fuelType: varchar("fuel_type"),
  engineCapacity: varchar("engine_capacity"),
  transmission: varchar("transmission"),
  seatingCapacity: integer("seating_capacity"),
  color: varchar("color"),
  features: text("features"),
});

export const VehiclesTable = pgTable("vehicles", {
  vehicleId: serial("vehicle_id").primaryKey(),
  vehicleSpecsId: integer("vehicle_specId").references(
    () => VehicleSpecificationsTable.vehicleSpecId,
    { onDelete: "cascade" }
  ),
  rentalRate: decimal("rental_rate").notNull(),
  availability: boolean("availability").default(true),
  createdAt: timestamp("created_at").defaultNow(),
  updatedAt: timestamp("updated_at").defaultNow(),
});

export const LocationsTable = pgTable("locations", {
  locationId: serial("location_id").primaryKey(),
  name: varchar("name").notNull(),
  address: text("address"),
  contactPhone: varchar("contact_phone"),
  createdAt: timestamp("created_at").defaultNow(),
  updatedAt: timestamp("updated_at").defaultNow(),
});

export const BookingsTable = pgTable("bookings", {
  bookingId: serial("booking_id").primaryKey(),
  userId: integer("user_id").references(() => UsersTable.userId, {
    onDelete: "cascade",
  }),
  vehicleId: integer("vehicle_id").references(() => VehiclesTable.vehicleId, {
    onDelete: "cascade",
  }),
  locationId: integer("location_id").references(
    () => LocationsTable.locationId,
    { onDelete: "cascade" }
  ),
  bookingDate: date("booking_date").notNull(),
  returnDate: date("return_date").notNull(),
  totalAmount: decimal("total_amount").notNull(),
  bookingStatus: varchar("booking_status").default("Pending"),
  createdAt: timestamp("created_at").defaultNow(),
  updatedAt: timestamp("updated_at").defaultNow(),
});

export const PaymentsTable = pgTable("payments", {
  paymentId: serial("payment_id").primaryKey(),
  bookingId: integer("booking_id").references(() => BookingsTable.bookingId, {
    onDelete: "cascade",
  }),
  amount: decimal("amount").notNull(),
  paymentStatus: varchar("payment_status").default("Pending"),
  paymentDate: timestamp("payment_date").defaultNow(),
  paymentMethod: varchar("payment_method"),
  transactionId: varchar("transaction_id"),
  createdAt: timestamp("created_at").defaultNow(),
  updatedAt: timestamp("updated_at").defaultNow(),
});

export const AuthenticationTable = pgTable("authentication", {
  authId: serial("auth_id").primaryKey(),
  userId: integer("user_id").references(() => UsersTable.userId, {
    onDelete: "cascade",
  }),
  password: varchar("password").notNull(),
  createdAt: timestamp("created_at").defaultNow(),
  updatedAt: timestamp("updated_at").defaultNow(),
});

export const CustomerSupportTicketsTable = pgTable("customersupporttickets", {
  ticketId: serial("ticket_id").primaryKey(),
  userId: integer("user_id").references(() => UsersTable.userId, {
    onDelete: "cascade",
  }),
  subject: varchar("subject").notNull(),
  description: text("description").notNull(),
  status: varchar("status").default("Open"),
  createdAt: timestamp("created_at").defaultNow(),
  updatedAt: timestamp("updated_at").defaultNow(),
});

export const FleetManagementTable = pgTable("fleetmanagement", {
  fleetId: serial("fleet_id").primaryKey(),
  vehicleId: integer("vehicle_id").references(() => VehiclesTable.vehicleId, {
    onDelete: "cascade",
  }),
  acquisitionDate: date("acquisition_date").notNull(),
  depreciationRate: decimal("depreciation_rate"),
  currentValue: decimal("current_value"),
  maintenanceCost: decimal("maintenance_cost"),
  status: varchar("status").default("Active"),
  createdAt: timestamp("created_at").defaultNow(),
  updatedAt: timestamp("updated_at").defaultNow(),
});

//types
// User types
export type TIUser = typeof UsersTable.$inferInsert;
export type TSUser = typeof UsersTable.$inferSelect;

// Vehicle Specifications types
export type TIVehicleSpecification =
  typeof VehicleSpecificationsTable.$inferInsert;
export type TSVehicleSpecification =
  typeof VehicleSpecificationsTable.$inferSelect;

// Vehicles types
export type TIVehicle = typeof VehiclesTable.$inferInsert;
export type TSVehicle = typeof VehiclesTable.$inferSelect;

// Locations types
export type TILocation = typeof LocationsTable.$inferInsert;
export type TSLocation = typeof LocationsTable.$inferSelect;

// Bookings types
export type TIBooking = typeof BookingsTable.$inferInsert;
export type TSBooking = typeof BookingsTable.$inferSelect;

// Payments types
export type TIPayment = typeof PaymentsTable.$inferInsert;
export type TSPayment = typeof PaymentsTable.$inferSelect;

// Authentication types
export type TIAuthentication = typeof AuthenticationTable.$inferInsert;
export type TSAuthentication = typeof AuthenticationTable.$inferSelect;

// Customer Support Tickets types
export type TICustomerSupportTicket =
  typeof CustomerSupportTicketsTable.$inferInsert;
export type TSCustomerSupportTicket =
  typeof CustomerSupportTicketsTable.$inferSelect;

// Fleet Management types
export type TIFleetManagement = typeof FleetManagementTable.$inferInsert;
export type TSFleetManagement = typeof FleetManagementTable.$inferSelect;
