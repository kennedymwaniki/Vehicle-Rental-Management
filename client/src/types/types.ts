export interface TUser {
  userId: number | null | undefined;
  fullName: string;
  email: string;
  contactPhone: string;
  address: string;
  role: string;
}

export interface TFleet {
  fleetId: number;
  vehicleId: number;
  acquisitionDate: string;
  depreciationRate: number;
  currentValue: number;
  maintenanceCost: number;
  status: string;
  createdAt: string;
  updatedAt: string;
}

export interface TPayment {
  paymentId: number | null | undefined;
  bookingId: number;
  amount: number;
  paymentStatus: "Pending" | "Completed" | "Failed";
  paymentDate: string;
  paymentMethod: string;
  transactionId: string;
  createdAt: string;
  updatedAt: string;
}
export interface TBooking {
  bookingId: number | null | undefined;
  userId: number;
  vehicleId: number;
  locationId: number;
  bookingDate: string;
  returnDate: string;
  totalAmount: number;
  bookingStatus: "Pending" | "Completed" | "Failed";
  createdAt: string;
  updatedAt: string;
}

export interface TVehicle {
  vehicleId: number;
  vehicleSpecsId: number;
  rentalRate: number;
  availability: boolean;
  createdAt: string;
  updatedAt: string;
}

export interface TTicket {
  ticketId: number | null | undefined;
  userId: number;
  subject: string;
  description: string;
  status: string;
  createdAt: string;
  updatedAt: string;
}
export interface TVehicleSpecs {
  vehicleSpec_id: number;
  manufacturer: string;
  model: string;
  year: number;
  fuel_type: string;
  engine_capacity: string;
  transmission: string;
  seating_capacity: number;
  color: string;
  features: string;
}
