export interface SafeUser {
    id:              string
    name:            string
    surname:         string
    fullname:        string
    email:           string
    avatar?:         any
    hashedPassword:  string
    createdAt:       Date
    updatedAt:       Date

    likes?:            any
    posts?:            any
    followers?:        any
    followings?:        any
}