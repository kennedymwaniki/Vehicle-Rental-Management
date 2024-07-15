export interface TUser {
  userId: number | null | undefined;
  fullName: string;
  password?:string,
  email: string;
  contactPhone: string;
  address: string;
  role: string;
}
export interface User {
  token: string;
  user: {
    role: string;
    userId: string;
    fullName: string;
  };
}



export interface AuthState {
  user: User | null;
  token: string | null;
  isAuthenticated: boolean;
}

export interface TFleet {
  fleetId: number|null| undefined;
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

export interface TLocation{
  locationId:number,
    name: string,
    address:string,
    contactPhone:string,
}

export interface TUserBookingsResponse {
  user: TUser;
  bookings: TBooking[];
}