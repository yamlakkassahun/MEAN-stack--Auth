export interface AdminPayload {
  email: string;
}

export interface VendorPayload {
  email: string;
}

export interface CustomerPayload {
  email: string;
}

export type JwtPayload = AdminPayload | VendorPayload | CustomerPayload;
