import moment from "moment-timezone";

export const momentWita = (value?: string) => {
    return moment(value).tz('Asia/Makassar')
}