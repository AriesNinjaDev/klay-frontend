import EventEmitter from "eventemitter3";
import type { DataCreateAccount, DataLogin, DataOnboard, InviteResponse } from "revolt-api";
import type { RevoltConfig, Metadata } from "revolt-api";
import { API, MemberCompositeKey, Role } from "revolt-api";
import Bots from "./maps/Bots";
import Channels, { Channel } from "./maps/Channels";
import Members, { Member } from "./maps/Members";
import Messages, { Message } from "./maps/Messages";
import Servers, { Server } from "./maps/Servers";
import Users, { User } from "./maps/Users";
import Emojis, { Emoji } from "./maps/Emojis";
import { WebSocketClient } from "./websocket/client";
import { ClientboundNotification } from "./websocket/notifications";
import { Nullable } from "./util/null";
import Unreads from "./util/Unreads";
/**
 * Client options object
 */
export interface ClientOptions {
    apiURL: string;
    debug: boolean;
    cache: boolean;
    unreads: boolean;
    heartbeat: number;
    autoReconnect: boolean;
    /**
     * Automatically reconnect the client if no
     * `pong` is received after X seconds of sending a `ping`.
     * This is a temporary fix for an issue where the client
     * would randomly stop receiving websocket messages.
     */
    pongTimeout?: number;
    /**
     * If `pongTimeout` is set, this decides what to do when
     * the timeout is triggered. Default is `RECONNECT`.
     */
    onPongTimeout?: "EXIT" | "RECONNECT";
    ackRateLimiter: boolean;
}
export declare interface Client {
    on(event: "connected", listener: () => void): this;
    on(event: "connecting", listener: () => void): this;
    on(event: "dropped", listener: () => void): this;
    on(event: "ready", listener: () => void): this;
    on(event: "logout", listener: () => void): this;
    on(event: "packet", listener: (packet: ClientboundNotification) => void): this;
    on(event: "message", listener: (message: Message) => void): this;
    on(event: "message/update", listener: (message: Message) => void): this;
    on(event: "message/delete", listener: (id: string, message?: Message) => void): this;
    on(event: "message/updated", listener: (message: Message, packet: ClientboundNotification) => void): this;
    on(event: "channel/create", listener: (channel: Channel) => void): this;
    on(event: "channel/update", listener: (channel: Channel) => void): this;
    on(event: "channel/delete", listener: (id: string, channel?: Channel) => void): this;
    on(event: "server/update", listener: (server: Server) => void): this;
    on(event: "server/delete", listener: (id: string, server?: Server) => void): this;
    on(event: "role/update", listener: (roleId: string, role: Role, serverId: string) => void): this;
    on(event: "role/delete", listener: (id: string, serverId: string) => void): this;
    on(event: "member/join", listener: (member: Member) => void): this;
    on(event: "member/update", listener: (member: Member) => void): this;
    on(event: "member/leave", listener: (id: MemberCompositeKey) => void): this;
    on(event: "user/relationship", listener: (user: User) => void): this;
    on(event: "emoji/create", listener: (emoji: Emoji) => void): this;
    on(event: "emoji/delete", listener: (id: string, emoji?: Emoji) => void): this;
}
/**
 * Regular expression for mentions.
 */
export declare const RE_MENTIONS: RegExp;
/**
 * Regular expression for spoilers.
 */
export declare const RE_SPOILER: RegExp;
export declare type FileArgs = [
    options?: {
        max_side?: number;
        size?: number;
        width?: number;
        height?: number;
    },
    allowAnimation?: boolean,
    fallback?: string
];
export declare type Session = {
    token: string;
};
export declare class Client extends EventEmitter {
    heartbeat: number;
    api: API;
    session?: Session | string;
    user: Nullable<User>;
    options: ClientOptions;
    websocket: WebSocketClient;
    configuration?: RevoltConfig;
    users: Users;
    channels: Channels;
    servers: Servers;
    members: Members;
    messages: Messages;
    bots: Bots;
    emojis: Emojis;
    unreads?: Unreads;
    constructor(options?: Partial<ClientOptions>);
    /**
     * ? Configuration.
     */
    /**
     * Get the current API base URL.
     */
    get apiURL(): string;
    /**
     * Whether debug mode is turned on.
     */
    get debug(): boolean;
    /**
     * Whether revolt.js should auto-reconnect
     */
    get autoReconnect(): boolean;
    /**
     * ? Authentication and connection.
     */
    /**
     * Fetches the configuration of the server.
     *
     * @remarks
     * Unlike `fetchConfiguration`, this function also fetches the
     * configuration if it has already been fetched before.
     */
    connect(): Promise<void>;
    /**
     * Fetches the configuration of the server if it has not been already fetched.
     */
    fetchConfiguration(): Promise<void>;
    /**
     * Update API object to use authentication.
     */
    private $updateHeaders;
    /**
     * Log in with auth data, creating a new session in the process.
     * @param details Login data object
     * @returns An onboarding function if onboarding is required, undefined otherwise
     */
    login(details: DataLogin): Promise<((username: string, loginAfterSuccess?: boolean | undefined) => Promise<void>) | undefined>;
    /**
     * Use an existing session to log into Revolt.
     * @param session Session data object
     * @returns An onboarding function if onboarding is required, undefined otherwise
     */
    useExistingSession(session: Session): Promise<((username: string, loginAfterSuccess?: boolean | undefined) => Promise<void>) | undefined>;
    /**
     * Log in as a bot.
     * @param token Bot token
     */
    loginBot(token: string): Promise<void>;
    /**
     * Check onboarding status and connect to notifications service.
     * @returns
     */
    private $connect;
    /**
     * Finish onboarding for a user, for example by providing a username.
     * @param data Onboarding data object
     * @param loginAfterSuccess Defines whether to automatically log in and connect after onboarding finishes
     */
    completeOnboarding(data: DataOnboard, loginAfterSuccess?: boolean): Promise<void>;
    /**
     * ? Miscellaneous API routes.
     */
    /**
     * Fetch information about a given invite code.
     * @param code The invite code.
     * @returns Invite information.
     */
    fetchInvite(code: string): Promise<{
        type: "Server";
        code: string;
        server_id: string;
        server_name: string;
        server_icon?: {
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
        server_banner?: {
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
        server_flags?: number | null | undefined;
        channel_id: string;
        channel_name: string;
        channel_description?: string | null | undefined;
        user_name: string;
        user_avatar?: {
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
        member_count: number;
    } | {
        type: "Group";
        code: string;
        channel_id: string;
        channel_name: string;
        channel_description?: string | null | undefined;
        user_name: string;
        user_avatar?: {
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
    joinInvite(code: string): Promise<Server>;
    joinInvite(invite: InviteResponse): Promise<Server>;
    /**
     * Delete an invite.
     * @param code The invite code.
     */
    deleteInvite(code: string): Promise<void>;
    /**
     * Fetch user settings for current user.
     * @param keys Settings keys to fetch, leave blank to fetch full object.
     * @returns Key-value object of settings.
     */
    syncFetchSettings(keys: string[]): Promise<{
        [key: string]: [number, string];
    }>;
    /**
     * Set user settings for current user.
     * @param data Data to set as an object. Any non-string values will be automatically serialised.
     * @param timestamp Timestamp to use for the current revision.
     */
    syncSetSettings(data: {
        [key: string]: object | string;
    }, timestamp?: number): Promise<void>;
    /**
     * Fetch user unreads for current user.
     * @returns Array of channel unreads.
     */
    syncFetchUnreads(): Promise<{
        _id: {
            channel: string;
            user: string;
        };
        last_id?: string | null | undefined;
        mentions?: string[] | null | undefined;
    }[]>;
    /**
     * ? Utility functions.
     */
    /**
     * Log out of Revolt. Disconnect the WebSocket, request a session invalidation and reset the client.
     */
    logout(avoidRequest?: boolean): Promise<void>;
    /**
     * Reset the client by setting properties to their original value or deleting them entirely.
     * Disconnects the current WebSocket.
     */
    reset(): void;
    /**
     * Register for a new account.
     * @param data Registration data object
     * @returns A promise containing a registration response object
     */
    register(data: DataCreateAccount): Promise<undefined>;
    /**
     * Prepare a markdown-based message to be displayed to the user as plain text.
     * @param source Source markdown text
     * @returns Modified plain text
     */
    markdownToText(source: string): string;
    /**
     * Proxy a file through January.
     * @param url URL to proxy
     * @returns Proxied media URL
     */
    proxyFile(url: string): string | undefined;
    /**
     * Generates a URL to a given file with given options.
     * @param attachment Partial of attachment object
     * @param options Optional query parameters to modify object
     * @param allowAnimation Returns GIF if applicable, no operations occur on image
     * @param fallback Fallback URL
     * @returns Generated URL or nothing
     */
    generateFileURL(attachment?: {
        tag: string;
        _id: string;
        content_type?: string;
        metadata?: Metadata;
    }, ...args: FileArgs): string | undefined;
}
