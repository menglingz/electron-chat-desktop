import request from "../requestWaiFChat";
// ts
import type { AddNotesResponseData, NotesData, GetNotesResponseData, DelNotesResponseData } from './type'
import queryString from "query-string";

enum API {
    ADDNOTES_URL = '/notes/add',
    GETNOTES_URL = '/notes/get',
    DELNOTES_URL = '/notes/del'
}

// 新增便签接口
export const reqAddNotes = (notesData: NotesData) => request<any, AddNotesResponseData>({ url: API.ADDNOTES_URL, method: 'post', data: queryString.stringify(notesData) })
// 获取便签列表接口
export const reqGetNotes = (pageNum: number = 1) => request<any, GetNotesResponseData>({ url: API.GETNOTES_URL, method: 'get', params: { pageNum } })
// 删除便签接口
export const reqDelNotes = (_id: string) => request<any, DelNotesResponseData>({url: API.DELNOTES_URL, method: 'get', params: { _id }})