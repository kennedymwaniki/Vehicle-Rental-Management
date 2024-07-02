import { z } from "zod";

export const UserSchema = z.object({
  fullName: z.string(),
  email: z.string(),
  password: z.string(),
  contactPhone: z.string(),
  address: z.string(),
  role: z.string(),
});

export const VehicleSpecificationSchema = z.object({
  manufacturer: z.string(),
  model: z.string(),
  year: z.number(),
  fuelType: z.string().nullable(),
  engineCapacity: z.string().nullable(),
  transmission: z.string().nullable(),
  seatingCapacity: z.number().nullable(),
  color: z.string().nullable(),
  features: z.string().nullable(),
});

export const VehicleSchema = z.object({
  rentalRate: z.number(),
  availability: z.boolean(),
});

export const LocationSchema = z.object({
  name: z.string(),
  address: z.string().nullable(),
  contactPhone: z.string().nullable(),
});

export const BookingSchema = z.object({
  userId: z.number(),
  vehicleId: z.number(),
  locationId: z.number(),
  bookingDate: z.string(),
  returnDate: z.string(),
  totalAmount: z.number(),
  bookingStatus: z.string(),
});

export const PaymentSchema = z.object({
  bookingId: z.number(),
  amount: z.number(),
  paymentStatus: z.string(),
  paymentDate: z.string(),
  paymentMethod: z.string().nullable(),
  transactionId: z.string().nullable(),

});

export const AuthenticationSchema = z.object({
  userId: z.number(),
  password: z.string(),
  createdAt: z.string().optional(),
  updatedAt: z.string().optional(),
});

export const CustomerSupportTicketSchema = z.object({
  userId: z.number(),
  subject: z.string(),
  description: z.string(),
  status: z.string(),

});

export const FleetManagementSchema = z.object({
  vehicleId: z.number(),
  acquisitionDate: z.string(),
  depreciationRate: z.number().nullable(),
  currentValue: z.number().nullable(),
  maintenanceCost: z.number().nullable(),
  status: z.string(),
  
});
