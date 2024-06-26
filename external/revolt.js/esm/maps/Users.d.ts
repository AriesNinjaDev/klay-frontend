import type { BotInformation, UserStatus, User as UserI, RelationshipStatus, FieldsUser, DataEditUser } from "revolt-api";
import type { File } from "revolt-api";
import { Nullable } from "../util/null";
import Collection from "./Collection";
import { Client, FileArgs } from "..";
export declare class User {
    client: Client;
    _id: string;
    username: string;
    discriminator: string;
    display_name: Nullable<string>;
    avatar: Nullable<File>;
    badges: Nullable<number>;
    status: Nullable<UserStatus>;
    relationship: Nullable<RelationshipStatus>;
    online: boolean;
    privileged: boolean;
    flags: Nullable<number>;
    bot: Nullable<BotInformation>;
    /**
     * Get timestamp when this user was created.
     */
    get createdAt(): number;
    constructor(client: Client, data: UserI);
    update(data: Partial<UserI>, clear?: FieldsUser[]): void;
    /**
     * Open a DM with a user
     * @returns DM Channel
     */
    openDM(): Promise<import("./Channels").Channel>;
    /**
     * Send a friend request to a user
     */
    addFriend(): Promise<{
        _id: string;
        username: string;
        discriminator: string;
        display_name: string;
        avatar?: {
            _id: string;
            tag: string;
            filename: string;
            metadata: {
                type: "File";
            } | {
                type: "Text";
            } | {
                type: "Image";
                width: number;
                height: number;
            } | {
                type: "Video";
                width: number;
                height: number;
            } | {
                type: "Audio";
            };
            content_type: string;
            size: number;
            deleted?: boolean | null | undefined;
            reported?: boolean | null | undefined;
            message_id?: string | null | undefined;
            user_id?: string | null | undefined;
            server_id?: string | null | undefined;
            object_id?: string | null | undefined;
        } | null | undefined;
        relations?: {
            _id: string;
            status: "User" | "None" | "Friend" | "Outgoing" | "Incoming" | "Blocked" | "BlockedOther";
        }[] | null | undefined;
        badges?: number | null | undefined;
        status?: {
            text?: string | null | undefined;
            presence?: "Online" | "Idle" | "Focus" | "Busy" | "Invisible" | null | undefined;
        } | null | undefined;
        profile?: {
            content?: string | null | undefined;
            background?: {
                _id: string;
                tag: string;
                filename: string;
                metadata: {
                    type: "File";
                } | {
                    type: "Text";
                } | {
                    type: "Image";
                    width: number;
                    height: number;
                } | {
                    type: "Video";
                    width: number;
                    height: number;
                } | {
                    type: "Audio";
                };
                content_type: string;
                size: number;
                deleted?: boolean | null | undefined;
                reported?: boolean | null | undefined;
                message_id?: string | null | undefined;
                user_id?: string | null | undefined;
                server_id?: string | null | undefined;
                object_id?: string | null | undefined;
            } | null | undefined;
        } | null | undefined;
        flags?: number | null | undefined;
        privileged?: boolean | undefined;
        bot?: {
            owner: string;
        } | null | undefined;
        relationship?: "User" | "None" | "Friend" | "Outgoing" | "Incoming" | "Blocked" | "BlockedOther" | null | undefined;
        online?: boolean | null | undefined;
    }>;
    /**
     * Remove a user from the friend list
     */
    removeFriend(): Promise<{
        _id: string;
        username: string;
        discriminator: string;
        display_name: string;
        avatar?: {
            _id: string;
            tag: string;
            filename: string;
            metadata: {
                type: "File";
            } | {
                type: "Text";
            } | {
                type: "Image";
                width: number;
                height: number;
            } | {
                type: "Video";
                width: number;
                height: number;
            } | {
                type: "Audio";
            };
            content_type: string;
            size: number;
            deleted?: boolean | null | undefined;
            reported?: boolean | null | undefined;
            message_id?: string | null | undefined;
            user_id?: string | null | undefined;
            server_id?: string | null | undefined;
            object_id?: string | null | undefined;
        } | null | undefined;
        relations?: {
            _id: string;
            status: "User" | "None" | "Friend" | "Outgoing" | "Incoming" | "Blocked" | "BlockedOther";
        }[] | null | undefined;
        badges?: number | null | undefined;
        status?: {
            text?: string | null | undefined;
            presence?: "Online" | "Idle" | "Focus" | "Busy" | "Invisible" | null | undefined;
        } | null | undefined;
        profile?: {
            content?: string | null | undefined;
            background?: {
                _id: string;
                tag: string;
                filename: string;
                metadata: {
                    type: "File";
                } | {
                    type: "Text";
                } | {
                    type: "Image";
                    width: number;
                    height: number;
                } | {
                    type: "Video";
                    width: number;
                    height: number;
                } | {
                    type: "Audio";
                };
                content_type: string;
                size: number;
                deleted?: boolean | null | undefined;
                reported?: boolean | null | undefined;
                message_id?: string | null | undefined;
                user_id?: string | null | undefined;
                server_id?: string | null | undefined;
                object_id?: string | null | undefined;
            } | null | undefined;
        } | null | undefined;
        flags?: number | null | undefined;
        privileged?: boolean | undefined;
        bot?: {
            owner: string;
        } | null | undefined;
        relationship?: "User" | "None" | "Friend" | "Outgoing" | "Incoming" | "Blocked" | "BlockedOther" | null | undefined;
        online?: boolean | null | undefined;
    }>;
    /**
     * Block a user
     */
    blockUser(): Promise<{
        _id: string;
        username: string;
        discriminator: string;
        display_name: string;
        avatar?: {
            _id: string;
            tag: string;
            filename: string;
            metadata: {
                type: "File";
            } | {
                type: "Text";
            } | {
                type: "Image";
                width: number;
                height: number;
            } | {
                type: "Video";
                width: number;
                height: number;
            } | {
                type: "Audio";
            };
            content_type: string;
            size: number;
            deleted?: boolean | null | undefined;
            reported?: boolean | null | undefined;
            message_id?: string | null | undefined;
            user_id?: string | null | undefined;
            server_id?: string | null | undefined;
            object_id?: string | null | undefined;
        } | null | undefined;
        relations?: {
            _id: string;
            status: "User" | "None" | "Friend" | "Outgoing" | "Incoming" | "Blocked" | "BlockedOther";
        }[] | null | undefined;
        badges?: number | null | undefined;
        status?: {
            text?: string | null | undefined;
            presence?: "Online" | "Idle" | "Focus" | "Busy" | "Invisible" | null | undefined;
        } | null | undefined;
        profile?: {
            content?: string | null | undefined;
            background?: {
                _id: string;
                tag: string;
                filename: string;
                metadata: {
                    type: "File";
                } | {
                    type: "Text";
                } | {
                    type: "Image";
                    width: number;
                    height: number;
                } | {
                    type: "Video";
                    width: number;
                    height: number;
                } | {
                    type: "Audio";
                };
                content_type: string;
                size: number;
                deleted?: boolean | null | undefined;
                reported?: boolean | null | undefined;
                message_id?: string | null | undefined;
                user_id?: string | null | undefined;
                server_id?: string | null | undefined;
                object_id?: string | null | undefined;
            } | null | undefined;
        } | null | undefined;
        flags?: number | null | undefined;
        privileged?: boolean | undefined;
        bot?: {
            owner: string;
        } | null | undefined;
        relationship?: "User" | "None" | "Friend" | "Outgoing" | "Incoming" | "Blocked" | "BlockedOther" | null | undefined;
        online?: boolean | null | undefined;
    }>;
    /**
     * Unblock a user
     */
    unblockUser(): Promise<{
        _id: string;
        username: string;
        discriminator: string;
        display_name: string;
        avatar?: {
            _id: string;
            tag: string;
            filename: string;
            metadata: {
                type: "File";
            } | {
                type: "Text";
            } | {
                type: "Image";
                width: number;
                height: number;
            } | {
                type: "Video";
                width: number;
                height: number;
            } | {
                type: "Audio";
            };
            content_type: string;
            size: number;
            deleted?: boolean | null | undefined;
            reported?: boolean | null | undefined;
            message_id?: string | null | undefined;
            user_id?: string | null | undefined;
            server_id?: string | null | undefined;
            object_id?: string | null | undefined;
        } | null | undefined;
        relations?: {
            _id: string;
            status: "User" | "None" | "Friend" | "Outgoing" | "Incoming" | "Blocked" | "BlockedOther";
        }[] | null | undefined;
        badges?: number | null | undefined;
        status?: {
            text?: string | null | undefined;
            presence?: "Online" | "Idle" | "Focus" | "Busy" | "Invisible" | null | undefined;
        } | null | undefined;
        profile?: {
            content?: string | null | undefined;
            background?: {
                _id: string;
                tag: string;
                filename: string;
                metadata: {
                    type: "File";
                } | {
                    type: "Text";
                } | {
                    type: "Image";
                    width: number;
                    height: number;
                } | {
                    type: "Video";
                    width: number;
                    height: number;
                } | {
                    type: "Audio";
                };
                content_type: string;
                size: number;
                deleted?: boolean | null | undefined;
                reported?: boolean | null | undefined;
                message_id?: string | null | undefined;
                user_id?: string | null | undefined;
                server_id?: string | null | undefined;
                object_id?: string | null | undefined;
            } | null | undefined;
        } | null | undefined;
        flags?: number | null | undefined;
        privileged?: boolean | undefined;
        bot?: {
            owner: string;
        } | null | undefined;
        relationship?: "User" | "None" | "Friend" | "Outgoing" | "Incoming" | "Blocked" | "BlockedOther" | null | undefined;
        online?: boolean | null | undefined;
    }>;
    /**
     * Fetch the profile of a user
     * @returns The profile of the user
     */
    fetchProfile(): Promise<{
        content?: string | null | undefined;
        background?: {
            _id: string;
            tag: string;
            filename: string;
            metadata: {
                type: "File";
            } | {
                type: "Text";
            } | {
                type: "Image";
                width: number;
                height: number;
            } | {
                type: "Video";
                width: number;
                height: number;
            } | {
                type: "Audio";
            };
            content_type: string;
            size: number;
            deleted?: boolean | null | undefined;
            reported?: boolean | null | undefined;
            message_id?: string | null | undefined;
            user_id?: string | null | undefined;
            server_id?: string | null | undefined;
            object_id?: string | null | undefined;
        } | null | undefined;
    }>;
    /**
     * Fetch the mutual connections of the current user and a target user
     * @returns The mutual connections of the current user and a target user
     */
    fetchMutual(): Promise<{
        users: string[];
        servers: string[];
    }>;
    /**
     * Get the default avatar URL of a user
     */
    get defaultAvatarURL(): string;
    /**
     * Get a pre-configured avatar URL of a user
     */
    get avatarURL(): string;
    /**
     * Get a pre-configured animated avatar URL of a user
     */
    get animatedAvatarURL(): string;
    generateAvatarURL(...args: FileArgs): string;
    get permission(): number;
}
export default class Users extends Collection<string, User> {
    constructor(client: Client);
    $get(id: string, data?: UserI): User;
    /**
     * Fetch a user
     * @param id User ID
     * @returns User
     */
    fetch(id: string, data?: UserI): Promise<User>;
    /**
     * Create a user object.
     * This is meant for internal use only.
     * @param data: User Data
     * @returns User
     */
    createObj(data: UserI): User;
    /**
     * Edit the current user
     * @param data User edit data object
     */
    edit(data: DataEditUser): Promise<void>;
    /**
     * Change the username of the current user
     * @param username New username
     * @param password Current password
     */
    changeUsername(username: string, password: string): Promise<{
        _id: string;
        username: string;
        discriminator: string;
        display_name: string;
        avatar?: {
            _id: string;
            tag: string;
            filename: string;
            metadata: {
                type: "File";
            } | {
                type: "Text";
            } | {
                type: "Image";
                width: number;
                height: number;
            } | {
                type: "Video";
                width: number;
                height: number;
            } | {
                type: "Audio";
            };
            content_type: string;
            size: number;
            deleted?: boolean | null | undefined;
            reported?: boolean | null | undefined;
            message_id?: string | null | undefined;
            user_id?: string | null | undefined;
            server_id?: string | null | undefined;
            object_id?: string | null | undefined;
        } | null | undefined;
        relations?: {
            _id: string;
            status: "User" | "None" | "Friend" | "Outgoing" | "Incoming" | "Blocked" | "BlockedOther";
        }[] | null | undefined;
        badges?: number | null | undefined;
        status?: {
            text?: string | null | undefined;
            presence?: "Online" | "Idle" | "Focus" | "Busy" | "Invisible" | null | undefined;
        } | null | undefined;
        profile?: {
            content?: string | null | undefined;
            background?: {
                _id: string;
                tag: string;
                filename: string;
                metadata: {
                    type: "File";
                } | {
                    type: "Text";
                } | {
                    type: "Image";
                    width: number;
                    height: number;
                } | {
                    type: "Video";
                    width: number;
                    height: number;
                } | {
                    type: "Audio";
                };
                content_type: string;
                size: number;
                deleted?: boolean | null | undefined;
                reported?: boolean | null | undefined;
                message_id?: string | null | undefined;
                user_id?: string | null | undefined;
                server_id?: string | null | undefined;
                object_id?: string | null | undefined;
            } | null | undefined;
        } | null | undefined;
        flags?: number | null | undefined;
        privileged?: boolean | undefined;
        bot?: {
            owner: string;
        } | null | undefined;
        relationship?: "User" | "None" | "Friend" | "Outgoing" | "Incoming" | "Blocked" | "BlockedOther" | null | undefined;
        online?: boolean | null | undefined;
    }>;
}
