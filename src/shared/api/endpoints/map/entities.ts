export type Document = {
  address_name: string;
  category_group_code: string;
  category_group_name: string;
  category_name: string;
  distance: string;
  id: string;
  phone: string;
  place_name: string;
  place_url: string;
  road_address_name: string;
  x: string;
  y: string;
};

export type Place = {
  address_name: string;
  category_group_code: string;
  category_group_name: string;
  category_name: string;
  distance: string;
  id: string;
  phone: string;
  place_name: string;
  place_url: string;
  road_address_name: string;
  x: string;
  y: string;
};

export type UserPlace = {
  id: number;
  x: string;
  y: string;
  review: string;
  placeId: string;
  user: {
    id: number;
    username: string;
    token: string | null;
  };
};

/* eslint @typescript-eslint/no-explicit-any: "warn" */
export type Map = { [key: string]: any };

export type Marker = { [key: string]: any };
