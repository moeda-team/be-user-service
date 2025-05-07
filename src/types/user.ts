export interface User {
  id: string;
  name: string;
  position: string;
  email: string;
  password: string;
  address: string;
  gender: string;
  phone_number: string;
  fee: number;
  status: string;
  created_at: Date;
  updated_at: Date;
}

export interface CreateUserDTO {
  name: string;
  position: string;
  email: string;
  password: string;
  address: string;
  gender: string;
  phone_number: string;
  fee: number;
  status: string;
}

export interface UpdateUserDTO extends Partial<CreateUserDTO> {}
