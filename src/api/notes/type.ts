export interface ResponseData {
    status: number
}

export interface NotesData {
    userId: string,
    text: string,
    color: string,
    time: string | Date
}

export interface NotesResponseData {
    _id: string,
    userId: {
        _id: string,
        nick: string,
        imgUrl: string
    },
    text: string,
    color: string,
    time: string | Date
}

export interface AddNotesResponseData extends ResponseData {
    msg: string,
    _id: string
}

export interface GetNotesResponseData extends ResponseData {
    data: NotesResponseData[]
}

export interface DelNotesResponseData extends ResponseData {
    msg: string
}