export interface TUser {
  [x: string]: string | number | null | undefined;
  userId: number | null | undefined;
  fullName: string;
  image: string;

  password?: string;
  email: string;
  contactPhone: string;
  address: string;
  role: string;
}
export interface User {
  token: string;
  user: {
    role: "admin" | "user";
    id: string;
    fullName: string;
    image: string;
  };
}

export interface AuthState {
  user: User | null;
  token: string | null;
  isAuthenticated: boolean;
}

export interface TFleet {
  fleetId: number | null | undefined;
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
  bookingId: number;
  userId: number;
  vehicleId: number;
  locationId: number;
  bookingDate: string;
  returnDate: string;
  totalAmount: number;
  bookingStatus: "Pending" | "Completed" | "Failed";
  createdAt: Date;
  updatedAt: Date;
}

export interface TVehicle {
  vehicleId: number;
  image_url: string;
  vehicleSpecsId: number;
  rentalRate: number;
  availability: boolean;
  createdAt: string;
  updatedAt: string;
  vehicleSpec: {
    color: string;
    model: string;
    year: number;
    seatingCapacity: number;
    manufacturer: string;
    fuelType: string;
    engineCapacity: string;
  };
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
  image: string;
  model: string;
  year: number;
  fuel_type: string;
  engine_capacity: string;
  transmission: string;
  seating_capacity: number;
  color: string;
  features: string;
}

export interface TLocation {
  locationId: number;
  name: string;
  address: string;
  contactPhone: string;
}

export interface TUserBookingsResponse {
  user: TUser;
  bookings: TBooking[];
}

export interface TUserTicketsResponse {
  user: TUser;
  supportTickets: TTicket[];
}
export interface TuserRealtions {
  user: TUser;
  tickets: TTicket[];
  bookings: TBooking[];
}

export interface TAlluserRelations {
  user: TUser;
  bookings: TBooking[];
  customerSupportTickets: TTicket[];
}

export interface BarChartData {
  name: string;
  value: number;
}
