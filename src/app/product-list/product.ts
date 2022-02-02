import {PhotoAlbumModel} from '../services/photo-album-model';

export interface Product {

  text: string;
  sellerId: string;
  title: string;
  price: number;
  quantity: number;
  comments: Comment[];
  boughtByList: string[];
  photoAlbum: PhotoAlbumModel;
}
