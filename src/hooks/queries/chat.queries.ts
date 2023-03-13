import {
  QueryKey,
  useInfiniteQuery,
  useMutation,
  UseMutationResult,
  useQuery,
} from '@tanstack/react-query';
import { AxiosError, AxiosResponse } from 'axios';
import { CHAT_LIMIT } from '../../constants/constants';
import queryKeys from '../../constants/queryKeys';
import {
  UseQueryOptionsType,
  UseMutationOptionsType,
  UseInfiniteQueryOptionsType,
} from '../../services';
import { CHAT_API, CHAT_QNA_API } from '../../services/chat.service';
import { ParentChildChattingDto } from '../../types/chat/Chatting.dto';
import { AnswerDto } from '../../types/chat/questions/Answer.dto';
import { IsToDoQuestion } from '../../types/chat/questions/IsToDoQuestion';
import { QuestionsAndAnswers } from '../../types/chat/questions/QuestionAndAnswers';

export const useChatData = ({
  coupleId,
  storeCode,
  options,
}: {
  coupleId: string;
  storeCode?: QueryKey[];
  options?: Omit<
    UseInfiniteQueryOptionsType<ParentChildChattingDto[]>,
    'queryKey' | 'queryFn'
  >;
}) =>
  useInfiniteQuery(
    [...queryKeys.chatKeys.all, ...(storeCode ?? [])],
    ({ pageParam = 0 }) =>
      CHAT_API.getChats(coupleId, {
        base: pageParam,
        limit: CHAT_LIMIT,
        offset: 0,
      }),
    {
      getNextPageParam: (_, allPages) => {
        return allPages.length * CHAT_LIMIT;
      },
      select: (data) => ({
        pages: [...data.pages]
          .map((res) =>
            res.data.sort(
              (a, b) =>
                new Date(a.parentChatting.createdAt).getTime() -
                new Date(b.parentChatting.createdAt).getTime()
            )
          )
          .reverse(),
        pageParams: [...data.pageParams].reverse(),
      }),
      refetchOnWindowFocus: false,
      ...options,
    }
  );

const useQuestionBoxData = ({
  coupleId,
  storeCode,
  options,
}: {
  coupleId: string;
  storeCode?: QueryKey[];
  options?: UseQueryOptionsType<QuestionsAndAnswers[]>;
}) =>
  useQuery(
    [...queryKeys.qnaKeys.all, ...(storeCode ?? [])],
    () => CHAT_QNA_API.getQuestions(coupleId),
    {
      select: (data) => data.data,
      ...options,
    }
  );

export const useHasQuestionData = ({
  coupleId,
  storeCode,
  options,
}: {
  coupleId: string;
  storeCode?: QueryKey[];
  options?: UseQueryOptionsType<IsToDoQuestion>;
}) =>
  useQuery(
    [...queryKeys.qnaKeys.hasTodo, ...(storeCode ?? [])],
    () => CHAT_QNA_API.getHasToDoQuestions(coupleId),
    {
      select: (data) => data.data,
      ...options,
    }
  );

export function useAnswerMutation({
  coupleId,
  questionId,
  options,
}: {
  coupleId: string;
  questionId: string;
  options?: UseMutationOptionsType<AnswerDto>;
}): UseMutationResult<AxiosResponse, AxiosError, AnswerDto, unknown> {
  return useMutation({
    mutationFn: (dto: AnswerDto) =>
      CHAT_QNA_API.postQuestions(coupleId, questionId, dto),
    ...options,
  });
}

export default useQuestionBoxData;
