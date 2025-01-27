import {
  ChatPhotoDto,
  ChatPhotoLineDto,
  ChatRequestDto,
  ChattingArchivedDto,
  CreatePhotoRequestDto,
  CreatePhotoResponseDto,
  CreateVoiceMsgDto,
  GetDownloadUrlResponseDto,
  GetUploadUrlRequestDto,
  GetUploadUrlResponseDto,
  Notice,
  NoticeIsFolden,
  ParentChildChattingDto,
  VoiceMSGDto,
} from 'models/chat';
import {
  AnswerDto,
  IsToDoQuestion,
  QuestionsAndAnswers,
} from 'models/chat-question';
import fetcher from './fetcher';

export const CHAT_API = {
  getChats: (coupleId: string, params: ChatRequestDto) =>
    fetcher
      .create()
      .get<ParentChildChattingDto[]>(`couples/${coupleId}/chattings`, {
        params,
      }),
  deleteOurChat: (coupleId: string, chattingId: string) =>
    fetcher
      .create()
      .delete(`couples/${coupleId}/chattings/${chattingId}/delete-ours`),
  deleteMyChat: (coupleId: string, chattingId: string) =>
    fetcher
      .create()
      .delete(`couples/${coupleId}/chattings/${chattingId}/delete-mine`),
};

export const CHAT_NOTICE_API = {
  getNotices: (coupleId: string) =>
    fetcher
      .create()
      .get<Notice | null>(`couples/${coupleId}/chattings/notices`),
  postNotice: (coupleId: string, chattingId: string) =>
    fetcher.create().post(`couples/${coupleId}/chattings/${chattingId}/notify`),
  postNoticeFold: (coupleId: string, noticeId: string) =>
    fetcher
      .create()
      .post<NoticeIsFolden>(
        `couples/${coupleId}/chattings/notices/${noticeId}/fold`
      ),
  postNoticeInvisible: (coupleId: string, noticeId: string) =>
    fetcher
      .create()
      .post(`couples/${coupleId}/chattings/notices/${noticeId}/invisible`),
};

export const CHAT_ARCHIVED_API = {
  getArchivedChat: (coupleId: string) =>
    fetcher
      .create()
      .get<ChattingArchivedDto[]>(`couples/${coupleId}/archived-chattings`),
  postArchivedChat: (coupleId: string, chattingId: string) =>
    fetcher
      .create()
      .post<ChattingArchivedDto>(
        `couples/${coupleId}/chattings/${chattingId}/archive`
      ),
  deleteArchivedChat: (coupleId: string, chattingId: string) =>
    fetcher
      .create()
      .delete(`couples/${coupleId}/archived-chattings/${chattingId}`),
};

export const CHAT_PHOTO_API = {
  getPhotos: (coupleId: string) =>
    fetcher
      .create()
      .get<ChatPhotoLineDto[]>(`couples/${coupleId}/chattings/photos`),
  getPhotoDetail: (coupleId: string, chattingId: string) =>
    fetcher
      .create()
      .get<ChatPhotoDto>(`couples/${coupleId}/chattings/${chattingId}/photos`),
  postPutGallery: (coupleId: string, photoId: string) =>
    fetcher
      .create()
      .post(`couples/${coupleId}/chattings/photos/${photoId}/put-gallery`),
  getDownloadUrl: (coupleId: string, photoId: string) =>
    fetcher
      .create()
      .post<GetDownloadUrlResponseDto>(
        `couples/${coupleId}/chattings/photos/${photoId}/get-download-url`
      ),
  getUploadUrl: (coupleId: string, data: GetUploadUrlRequestDto) =>
    fetcher
      .create()
      .post<GetUploadUrlResponseDto>(
        `couples/${coupleId}/chattings/photos/get-upload-url`,
        data
      ),
  createPhoto: (coupleId: string, data: CreatePhotoRequestDto) =>
    fetcher
      .create()
      .post<CreatePhotoResponseDto>(
        `couples/${coupleId}/chattings/photos/create`,
        data
      ),
};

export const CHAT_VOICE_API = {
  getVoices: (coupleId: string) =>
    fetcher.create().get(`couples/${coupleId}/chattings/voice-messages`),
  getUploadUrl: (coupleId: string, data: GetUploadUrlRequestDto) =>
    fetcher
      .create()
      .post<GetUploadUrlResponseDto>(
        `couples/${coupleId}/chattings/voice-messages/get-upload-url`,
        data
      ),
  createPhoto: (coupleId: string, data: CreateVoiceMsgDto) =>
    fetcher
      .create()
      .post<VoiceMSGDto>(
        `couples/${coupleId}/chattings/voice-messages/create`,
        data
      ),
  getDownloadUrl: (coupleId: string) =>
    fetcher
      .create()
      .post<GetDownloadUrlResponseDto>(
        `couples/${coupleId}/chattings/voice-messages/get-download-url`
      ),
};

export const CHAT_QNA_API = {
  getQuestions: (coupleId: string) =>
    fetcher
      .create()
      .get<QuestionsAndAnswers[]>(`couples/${coupleId}/questions?to-do=false`),
  getHasToDoQuestions: (coupleId: string) =>
    fetcher
      .create()
      .get<IsToDoQuestion>(`couples/${coupleId}/questions?to-do=true`),
  postQuestions: (coupleId: string, questionId: string, data: AnswerDto) =>
    fetcher
      .create()
      .post<QuestionsAndAnswers>(
        `couples/${coupleId}/questions/${questionId}/answer`,
        data
      ),
};
