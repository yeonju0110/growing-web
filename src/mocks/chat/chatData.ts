import { ParentChildChattingDto } from 'models/chat';
import { ImgDefaultProfile } from 'assets/image';
import heart from './data/Heart.png';

export const originData: ParentChildChattingDto[] = [
  {
    parentChatting: {
      id: '1',
      content: '안녕하세용',
      emojiUrl: null,
      imageUrls: [],
      videoUrls: [],
      voiceMsgUrls: [],
      createdAt: new Date('2024-01-01'),
      isMine: true,
      Writer: {
        id: '1',
        name: '연쥬',
        imageUrl: ImgDefaultProfile,
      },
    },
    childChatting: null,
  },
  {
    parentChatting: {
      id: '2',
      content: '방가방가',
      emojiUrl: null,
      imageUrls: [],
      videoUrls: [],
      voiceMsgUrls: [],
      createdAt: new Date('2024-01-01'),
      isMine: false,
      Writer: {
        id: '2',
        name: '밍지',
        imageUrl: ImgDefaultProfile,
      },
    },
    childChatting: null,
  },
  {
    parentChatting: {
      id: '3',
      content:
        '방가방가방가방가방가방가방가방가방가방가방가방가방가방가방가방가방가방가방가방가방가방가방가방가방가방가방가방가방가방가방가방가방가방가방가방가방가방가방가방가방가방가방가방가방가방가방가방가방가방가방가방가방가방가방가방가방가방가방가방가방가방가방가방가방가방가방가방가방가방가방가방가방가방가방가방가방가방가방가방가방가방가방가방가방가방가방가방가방가방가방가방가방가방가방가방가방가방가방가방가방가방가방가방가방가방가방가방가방가방가방가방가방가방가방가방가방가방가방가방가방가방가방가방가방가방가방가방가방가방가방가방가방가방가방가방가방가방가방가방가방가방가방가방가방가방가방가방가방가방가방가방가방가방가방가방가방가방가방가방가방가방가방가방가방가방가방가방가방가방가방가방가방가방가방가방가방가방가방가방가방가방가방가방가방가방가방가방가방가방가방가방가방가방가방가방가방가방가방가방가',
      emojiUrl: null,
      imageUrls: [],
      videoUrls: [],
      voiceMsgUrls: [],
      createdAt: new Date('2024-01-01'),
      isMine: true,
      Writer: {
        id: '1',
        name: '연쥬',
        imageUrl: ImgDefaultProfile,
      },
    },
    childChatting: null,
  },
  {
    parentChatting: {
      id: '4',
      content: null,
      emojiUrl: null,
      imageUrls: [heart, heart, heart],
      videoUrls: [],
      voiceMsgUrls: [],
      createdAt: new Date('2024-01-01'),
      isMine: false,
      Writer: {
        id: '2',
        name: '밍지',
        imageUrl: ImgDefaultProfile,
      },
    },
    childChatting: null,
  },
  {
    parentChatting: {
      id: '5',
      content: null,
      emojiUrl: null,
      imageUrls: [ImgDefaultProfile],
      videoUrls: [],
      voiceMsgUrls: [],
      createdAt: new Date('2024-01-01'),
      isMine: false,
      Writer: {
        id: '1',
        name: '연쥬',
        imageUrl: ImgDefaultProfile,
      },
    },
    childChatting: null,
  },
];
