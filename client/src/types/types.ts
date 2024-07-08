export interface TUser {
  id: number;
  fullName: string;
  email: string;
  phone: string;
  address: string;
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
  paymentId: number;
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
  bookingId: number;
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
  ticketId: number;
  userId: number;
  subject: string;
  description: string;
  status: string;
  createdAt: string;
  updatedAt: string;
}
