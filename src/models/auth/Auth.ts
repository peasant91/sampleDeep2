/**
 * Created by Widiana Putra on 30/06/2022
 * Copyright (c) 2022 - Made with love
 */

export interface Image {
  id: number;
  public_id?: any;
  image: string;
  thumbnail: string;
}

export interface User {
  id: number;
  name: string;
  gender?: any;
  email: string;
  phone: string;
  phone_code: string;
  birth_date?: any;
  user_referral: string;
  is_verified: string;
  profile_picture: Image;
  id_card?: any;
  selfie_picture?: any;
  vaccine_certificate?: any;
  member_card?: any;
  nationality?: any;
  member_id?: any;
  member_status: string;
}

export interface LoginItem {
  access_token: string;
  refresh_token: string;
  user_data: User;
}

export interface LoginResponse {
  data: LoginItem;
}


