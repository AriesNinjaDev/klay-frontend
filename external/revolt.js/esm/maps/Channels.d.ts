import type { Channel as ChannelI, DataCreateGroup, DataEditChannel, DataMessageSend, FieldsChannel, OptionsMessageSearch } from "revolt-api";
import type { File } from "revolt-api";
import { Nullable } from "../util/null";
import Collection from "./Collection";
import { Message } from "./Messages";
import { Client, FileArgs } from "..";
import { Permission } from "../permissions/definitions";
import { INotificationChecker } from "../util/Unreads";
import { Override, OverrideField } from "revolt-api";
import type { APIRoutes } from "revolt-api/dist/routes";
export declare class Channel {
    client: Client;
    _id: string;
    channel_type: ChannelI["channel_type"];
    /**
     * Whether this DM is active.
     * @requires `DirectMessage`
     */
    active: Nullable<boolean>;
    /**
     * The ID of the group owner.
     * @requires `Group`
     */
    owner_id: Nullable<string>;
    /**
     * The ID of the server this channel is in.
     * @requires `TextChannel`, `VoiceChannel`
     */
    server_id: Nullable<string>;
    /**
     * Permissions for group members.
     * @requires `Group`
     */
    permissions: Nullable<number>;
    /**
     * Default server channel permissions.
     * @requires `TextChannel`, `VoiceChannel`
     */
    default_permissions: Nullable<OverrideField>;
    /**
     * Channel permissions for each role.
     * @requires `TextChannel`, `VoiceChannel`
     */
    role_permissions: Nullable<{
        [key: string]: OverrideField;
    }>;
    /**
     * Channel name.
     * @requires `Group`, `TextChannel`, `VoiceChannel`
     */
    name: Nullable<string>;
    /**
     * Channel icon.
     * @requires `Group`, `TextChannel`, `VoiceChannel`
     */
    icon: Nullable<File>;
    /**
     * Channel description.
     * @requires `Group`, `TextChannel`, `VoiceChannel`
     */
    description: Nullable<string>;
    /**
     * Group / DM members.
     * @requires `Group`, `DM`
     */
    recipient_ids: Nullable<string[]>;
    /**
     * Id of last message in channel.
     * @requires `Group`, `DM`, `TextChannel`, `VoiceChannel`
     */
    last_message_id: Nullable<string>;
    /**
     * Users typing in channel.
     */
    typing_ids: Set<string>;
    /**
     * Channel is not safe for work.
     * @requires `Group`, `TextChannel`, `VoiceChannel`
     */
    nsfw: Nullable<boolean>;
    /**
     * The group owner.
     * @requires `Group`
     */
    get owner(): import("./Users").User | undefined;
    /**
     * Server this channel belongs to.
     * @requires `Server`
     */
    get server(): import("./Servers").Server | undefined;
    /**
     * The DM recipient.
     * @requires `DM`
     */
    get recipient(): import("./Users").User | undefined;
    /**
     * Last message sent in this channel.
     * @requires `Group`, `DM`, `TextChannel`, `VoiceChannel`
     */
    get last_message(): Message | undefined;
    /**
     * Get the last message ID if it is present or the origin timestamp.
     * TODO: deprecate
     */
    get last_message_id_or_past(): string;
    /**
     * Group recipients.
     * @requires `Group`
     */
    get recipients(): (import("./Users").User | undefined)[] | undefined;
    /**
     * Users typing.
     */
    get typing(): (import("./Users").User | undefined)[];
    /**
     * Get timestamp when this channel was created.
     */
    get createdAt(): number;
    /**
     * Get timestamp when this channel last had a message sent or when it was created
     */
    get updatedAt(): number;
    /**
     * Absolute pathname to this channel in the client.
     */
    get path(): string;
    /**
     * Get URL to this channel.
     */
    get url(): string;
    /**
     * Check whether the channel is currently unread
     * @param permit Callback function to determine whether a channel has certain properties
     * @returns Whether the channel is unread
     */
    isUnread(permit: INotificationChecker): boolean;
    /**
     * Find all message IDs of unread messages
     * @param permit Callback function to determine whether a channel has certain properties
     * @returns Array of message IDs which are unread
     */
    getMentions(permit: INotificationChecker): string[];
    /**
     * Get whether this channel is unread.
     */
    get unread(): boolean;
    /**
     * Get mentions in this channel for user.
     */
    get mentions(): string[];
    constructor(client: Client, data: ChannelI);
    update(data: Partial<ChannelI>, clear?: FieldsChannel[]): void;
    updateGroupJoin(user: string): void;
    updateGroupLeave(user: string): void;
    updateStartTyping(id: string): void;
    updateStopTyping(id: string): void;
    /**
     * Fetch a channel's members.
     * @requires `Group`
     * @returns An array of the channel's members.
     */
    fetchMembers(): Promise<import("./Users").User[]>;
    /**
     * Edit a channel
     * @param data Edit data
     */
    edit(data: DataEditChannel): Promise<void>;
    /**
     * Delete a channel
     * @requires `DM`, `Group`, `TextChannel`, `VoiceChannel`
     */
    delete(leave_silently?: boolean, avoidReq?: boolean): Promise<void>;
    /**
     * Add a user to a group
     * @param user_id ID of the target user
     */
    addMember(user_id: string): Promise<undefined>;
    /**
     * Remove a user from a group
     * @param user_id ID of the target user
     */
    removeMember(user_id: string): Promise<undefined>;
    /**
     * Send a message
     * @param data Either the message as a string or message sending route data
     * @returns The message
     */
    sendMessage(data: string | DataMessageSend, idempotencyKey?: string): Promise<Message>;
    /**
     * Fetch a message by its ID
     * @param message_id ID of the target message
     * @returns The message
     */
    fetchMessage(message_id: string): Promise<Message>;
    /**
     * Fetch multiple messages from a channel
     * @param params Message fetching route data
     * @returns The messages
     */
    fetchMessages(params?: Omit<(APIRoutes & {
        method: "get";
        path: "/channels/{target}/messages";
    })["params"], "include_users">): Promise<Message[]>;
    /**
     * Fetch multiple messages from a channel including the users that sent them
     * @param params Message fetching route data
     * @returns Object including messages and users
     */
    fetchMessagesWithUsers(params?: Omit<(APIRoutes & {
        method: "get";
        path: "/channels/{target}/messages";
    })["params"], "include_users">): Promise<{
        messages: Message[];
        users: import("./Users").User[];
        members: import("./Members").Member[] | undefined;
    }>;
    /**
     * Search for messages
     * @param params Message searching route data
     * @returns The messages
     */
    search(params: Omit<OptionsMessageSearch, "include_users">): Promise<Message[]>;
    /**
     * Search for messages including the users that sent them
     * @param params Message searching route data
     * @returns The messages
     */
    searchWithUsers(params: Omit<OptionsMessageSearch, "include_users">): Promise<{
        messages: Message[];
        users: import("./Users").User[];
        members: import("./Members").Member[] | undefined;
    }>;
    /**
     * Fetch stale messages
     * @param ids IDs of the target messages
     * @returns The stale messages
     */
    fetchStale(ids: string[]): Promise<{
        deprecated: string[];
    }>;
    deleteMessages(ids: string[]): Promise<void>;
    /**
     * Create an invite to the channel
     * @returns Newly created invite code
     */
    createInvite(): Promise<{
        type: "Server";
        _id: string;
        server: string;
        creator: string;
        channel: string;
    } | {
        type: "Group";
        _id: string;
        creator: string;
        channel: string;
    }>;
    /**
     * Join a call in a channel
     * @returns Join call response data
     */
    joinCall(): Promise<{
        token: string;
    }>;
    private ackTimeout?;
    private ackLimit?;
    /**
     * Mark a channel as read
     * @param message Last read message or its ID
     * @param skipRateLimiter Whether to skip the internal rate limiter
     */
    ack(message?: Message | string, skipRateLimiter?: boolean): Promise<void>;
    /**
     * Set role permissions
     * @param role_id Role Id, set to 'default' to affect all users
     * @param permissions Permission value
     */
    setPermissions(role_id: string | undefined, permissions: Override): Promise<{
        _id: string;
        owner: string;
        name: string;
        description?: string | null | undefined;
        channels: string[];
        categories?: {
            id: string;
            title: string;
            channels: string[];
        }[] | null | undefined;
        system_messages?: {
            user_joined?: string | null | undefined;
            user_left?: string | null | undefined;
            user_kicked?: string | null | undefined;
            user_banned?: string | null | undefined;
        } | null | undefined;
        roles?: {
            [key: string]: {
                name: string;
                permissions: {
                    a: number;
                    d: number;
                };
                colour?: string | null | undefined;
                hoist?: boolean | undefined;
                rank?: number | undefined;
            };
        } | undefined;
        default_permissions: number;
        icon?: {
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
        banner?: {
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
        flags?: number | null | undefined;
        nsfw?: boolean | undefined;
        analytics?: boolean | undefined;
        discoverable?: boolean | undefined;
    }>;
    /**
     * Start typing in this channel
     */
    startTyping(): void;
    /**
     * Stop typing in this channel
     */
    stopTyping(): void;
    /**
     * Generate URL to icon for this channel
     * @param args File parameters
     * @returns File URL
     */
    generateIconURL(...args: FileArgs): string | undefined;
    /**
     * Permission the currently authenticated user has against this channel
     */
    get permission(): number;
    /**
     * Check whether we have a given permission in a channel
     * @param permission Permission Names
     * @returns Whether we have this permission
     */
    havePermission(...permission: (keyof typeof Permission)[]): boolean;
}
export default class Channels extends Collection<string, Channel> {
    constructor(client: Client);
    $get(id: string, data?: ChannelI): Channel;
    /**
     * Check whether a channel should currently exist
     * @param id Channel ID
     * @returns Whether it should current exist
     */
    exists(id: string): Nullable<boolean>;
    /**
     * Fetch a channel
     * @param id Channel ID
     * @returns The channel
     */
    fetch(id: string, data?: ChannelI): Promise<Channel>;
    /**
     * Create a channel object.
     * This is meant for internal use only.
     * @param data: Channel Data
     * @param emit Whether to emit creation event
     * @returns Channel
     */
    createObj(data: ChannelI, emit?: boolean | number): Channel;
    /**
     * Create a group
     * @param data Group create route data
     * @returns The newly-created group
     */
    createGroup(data: DataCreateGroup): Promise<Channel>;
}
