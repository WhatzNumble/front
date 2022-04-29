// 공통으로 사용하는 타입들을 정의합니다.

export interface Constraint<T> {
    [key: string]: T
}

export interface User extends Constraint<string> {
    id: string
    email: string
    nickname: string
    lastLogin: string
} 

export interface IFVideo {
    id: number
    name: string
}