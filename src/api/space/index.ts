import request from '../requestWaiFChat';
import queryString from 'query-string';
// 引入ts类型
import type {
  SpaceListResponseData,
  SpaceData,
  AddSpaceResponseData,
  LikeData,
  SpaceLikeResponseData,
  SpaceCommentResponseData,
  DelSpaceCommentResponseData,
  DelSpaceResponseData,
} from './type';

enum API {
  GETSPACE_URL = '/space/get', // 获取空间动态接口
  UPLOADSPACE_PHOTO_URL = '/space/upload/photos', // 空间上传图片接口
  ADDSPACE_URL = '/space/add', // 空间动态发布接口
  SPACELIKE_URL = '/space/like', // 空间动态点赞接口
  ADDSPACECOMMENT_URL = '/space/comment/add', // 动态评论接口
  DELSPACECOMMENT_URL = '/space/comment/del', // 评论删除接口
  DELSPACE_URL = '/space/del', // 动态删除接口
}

// 获取空间动态接口
export const reqGetSpaceList = (userId: string) =>
  request<any, SpaceListResponseData>({ url: API.GETSPACE_URL, method: 'get', params: { userId } });
// 上传空间接口
export const reqUploadPhoto = API.UPLOADSPACE_PHOTO_URL;
// 空间动态发布接口
export const reqAddSpace = (spaceData: SpaceData) =>
  request<any, AddSpaceResponseData>({ url: API.ADDSPACE_URL, method: 'post', data: queryString.stringify(spaceData) });
// 空间动态点赞接口
export const reqSpaceLike = (data: LikeData) =>
  request<any, SpaceLikeResponseData>({ url: API.SPACELIKE_URL, method: 'post', data: queryString.stringify(data) });
// 动态评论接口  评论类型(0 => 自己评论, 1 => 回复评论)
export const reqAddSpaceComment = (type: number, commentData: any) =>
  request<any, SpaceCommentResponseData>({
    url: `${API.ADDSPACECOMMENT_URL}/${type}`,
    method: 'post',
    data: queryString.stringify(commentData),
  });
// 评论删除接口
export const reqDelSpaceComment = (type: number, _id: string) =>
  request<any, DelSpaceCommentResponseData>({
    url: `${API.DELSPACECOMMENT_URL}/${type}`,
    method: 'get',
    params: { _id },
  });
// 动态删除接口
export const reqDelSpace = (_id: string) =>
  request<any, DelSpaceResponseData>({ url: API.DELSPACE_URL, method: 'get', params: { _id } });
