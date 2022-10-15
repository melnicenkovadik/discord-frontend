import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';
const AuthorizationBearer = `Bearer ${JSON.parse(localStorage.getItem('auth') || '{}').token}`;

export const friendsApi = createApi({
  reducerPath: 'friendsApi',
  baseQuery: fetchBaseQuery({
    baseUrl: `${process.env.REACT_APP_API_ENDPOINT}`,
  }),
  endpoints: builder => ({
    sendFriendInvitation: builder.query<string, string>({
      query: mail => ({
        url: '/friend-invitation/invite',
        method: 'POST',
        body: {
          targetMailAddress: mail,
        },
        headers: {
          Authorization: `${AuthorizationBearer}`,
        },
      }),
    }),
    acceptFriendInvitation: builder.query<string, string>({
      query: id => ({
        url: '/friend-invitation/accept',
        method: 'POST',
        body: {
          id,
        },
        headers: {
          Authorization: `${AuthorizationBearer}`,
        },
      }),
    }),
    rejectFriendInvitation: builder.query<string, string>({
      query: id => ({
        url: '/friend-invitation/reject',
        method: 'POST',
        body: {
          id,
        },
        headers: {
          Authorization: `${AuthorizationBearer}`,
        },
      }),
    }),
  }),
});

export const {
  useLazySendFriendInvitationQuery,
  useLazyAcceptFriendInvitationQuery,
  useLazyRejectFriendInvitationQuery,
} = friendsApi;
