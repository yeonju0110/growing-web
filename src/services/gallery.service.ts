import fetcher from '.';
import { CreatePhotoDto } from '../types/chat/CreatePhoto.dto';
import { GetDownloadUrlResponseDto } from '../types/chat/GetDownloadUrlResponse.dto';
import { GetUploadUrlRequestDto } from '../types/chat/GetUploadUrlRequest.dto';
import { GetUploadUrlResponseDto } from '../types/chat/GetUploadUrlResponse.dto';
import { CreatePhotoCommentDto } from '../types/gallery/CreatePhotoComment.dto';
import PhotoDto from '../types/gallery/Photo.dto';
import PhotoCommentDto from '../types/gallery/PhotoComment.dto';
import { PhotoLineDto } from '../types/gallery/PhotoLine.dto';

export const GALLERY_API = {
  getPhotos: (coupleId: string) =>
    fetcher.create().get<PhotoLineDto[]>(`couples/${coupleId}/gallerys/photos`),
  getPhotoDetail: (coupleId: string, photoId: string) =>
    fetcher
      .create()
      .get<PhotoDto>(`couples/${coupleId}/gallerys/photos/${photoId}`),
  getUploadUrl: (coupleId: string, data: GetUploadUrlRequestDto) =>
    fetcher
      .create()
      .post<GetUploadUrlResponseDto>(
        `couples/${coupleId}/gallerys/photos/get-upload-url`,
        data
      ),
  createPhoto: (coupleId: string, data: CreatePhotoDto) =>
    fetcher.create().post(`couples/${coupleId}/gallerys/photos/create`, data),
  getDownloadUrl: (coupleId: string, photoId: string) =>
    fetcher
      .create()
      .post<GetDownloadUrlResponseDto>(
        `couples/${coupleId}/gallerys/photos/${photoId}/get-download-url`
      ),
  deletePhoto: (coupleId: string, photoId: string) =>
    fetcher.create().post(`couples/${coupleId}/gallerys/photos/${photoId}`),
};

export const GALLERY_COMMENT_API = {
  getComments: (coupleId: string, photoId: string) =>
    fetcher
      .create()
      .get<PhotoCommentDto[]>(
        `couples/${coupleId}/gallerys/photos/${photoId}/comments`
      ),
  postComment: (
    coupleId: string,
    photoId: string,
    data: CreatePhotoCommentDto
  ) =>
    fetcher
      .create()
      .post<PhotoCommentDto>(
        `couples/${coupleId}/gallerys/photos/${photoId}/comments/create`,
        data
      ),
  deleteComment: (coupleId: string, photoId: string, commentId: string) =>
    fetcher
      .create()
      .delete(
        `couples/${coupleId}/gallerys/photos/${photoId}/comments/${commentId}`
      ),
};
