import { pgTable, serial, varchar, integer, decimal, boolean, timestamp, text, date } from 'drizzle-orm/pg-core';

// Enum for user roles
enum UserRole {
  USER = 'user',
  ADMIN = 'admin',
}

export const UsersTable = pgTable('users', {
  userId: serial('user_id').primaryKey(),
  fullName: varchar('full_name').notNull(),
  email: varchar('email').unique().notNull(),
  contactPhone: varchar('contact_phone'),
  address: text('address'),
  role: varchar('role').default(UserRole.USER),
  createdAt: timestamp('created_at').defaultNow(),
  updatedAt: timestamp('updated_at').defaultNow(),
});

export const VehicleSpecificationsTable = pgTable('vehiclespecifications', {
  vehicleId: serial('vehicle_id').primaryKey(),
  manufacturer: varchar('manufacturer').notNull(),
  model: varchar('model').notNull(),
  year: integer('year').notNull(),
  fuelType: varchar('fuel_type'),
  engineCapacity: varchar('engine_capacity'),
  transmission: varchar('transmission'),
  seatingCapacity: integer('seating_capacity'),
  color: varchar('color'),
  features: text('features'),
});

export const VehiclesTable = pgTable('vehicles', {
  vehicleSpecId: serial('vehicleSpec_id').primaryKey(),
  vehicleId: integer('vehicle_id').references(() => VehicleSpecificationsTable.vehicleId, { onDelete: 'cascade' }),
  rentalRate: decimal('rental_rate').notNull(),
  availability: boolean('availability').default(true),
  createdAt: timestamp('created_at').defaultNow(),
  updatedAt: timestamp('updated_at').defaultNow(),
});

export const LocationsTable = pgTable('locations', {
  locationId: serial('location_id').primaryKey(),
  name: varchar('name').notNull(),
  address: text('address'),
  contactPhone: varchar('contact_phone'),
  createdAt: timestamp('created_at').defaultNow(),
  updatedAt: timestamp('updated_at').defaultNow(),
});

export const BookingsTable = pgTable('bookings', {
  bookingId: serial('booking_id').primaryKey(),
  userId: integer('user_id').references(() => UsersTable.userId, { onDelete: 'cascade' }),
  vehicleId: integer('vehicle_id').references(() => VehiclesTable.vehicleSpecId, { onDelete: 'cascade' }),
  locationId: integer('location_id').references(() => LocationsTable.locationId, { onDelete: 'cascade' }),
  bookingDate: date('booking_date').notNull(),
  returnDate: date('return_date').notNull(),
  totalAmount: decimal('total_amount').notNull(),
  bookingStatus: varchar('booking_status').default('Pending'),
  createdAt: timestamp('created_at').defaultNow(),
  updatedAt: timestamp('updated_at').defaultNow(),
});

export const PaymentsTable = pgTable('payments', {
  paymentId: serial('payment_id').primaryKey(),
  bookingId: integer('booking_id').references(() => BookingsTable.bookingId, { onDelete: 'cascade' }),
  amount: decimal('amount').notNull(),
  paymentStatus: varchar('payment_status').default('Pending'),
  paymentDate: timestamp('payment_date').defaultNow(),
  paymentMethod: varchar('payment_method'),
  transactionId: varchar('transaction_id'),
  createdAt: timestamp('created_at').defaultNow(),
  updatedAt: timestamp('updated_at').defaultNow(),
});

export const AuthenticationTable = pgTable('authentication', {
  authId: serial('auth_id').primaryKey(),
  userId: integer('user_id').references(() => UsersTable.userId, { onDelete: 'cascade' }),
  password: varchar('password').notNull(),
  createdAt: timestamp('created_at').defaultNow(),
  updatedAt: timestamp('updated_at').defaultNow(),
});

export const CustomerSupportTicketsTable = pgTable('customersupporttickets', {
  ticketId: serial('ticket_id').primaryKey(),
  userId: integer('user_id').references(() => UsersTable.userId, { onDelete: 'cascade' }),
  subject: varchar('subject').notNull(),
  description: text('description').notNull(),
  status: varchar('status').default('Open'),
  createdAt: timestamp('created_at').defaultNow(),
  updatedAt: timestamp('updated_at').defaultNow(),
});

export const FleetManagementTable = pgTable('fleetmanagement', {
  fleetId: serial('fleet_id').primaryKey(),
  vehicleId: integer('vehicle_id').references(() => VehiclesTable.vehicleSpecId, { onDelete: 'cascade' }),
  acquisitionDate: date('acquisition_date').notNull(),
  depreciationRate: decimal('depreciation_rate'),
  currentValue: decimal('current_value'),
  maintenanceCost: decimal('maintenance_cost'),
  status: varchar('status').default('Active'),
  createdAt: timestamp('created_at').defaultNow(),
  updatedAt: timestamp('updated_at').defaultNow(),
});

