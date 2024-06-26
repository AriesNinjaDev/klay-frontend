var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
import { makeAutoObservable, action, runInAction, computed } from "mobx";
import isEqual from "lodash.isequal";
import { toNullable } from "../util/null";
import { Permission } from "../permissions/definitions";
import Collection from "./Collection";
import { decodeTime } from "ulid";
import { bitwiseAndEq, calculatePermission } from "../permissions/calculator";
export class Server {
    constructor(client, data) {
        this.description = null;
        this.channel_ids = [];
        this.categories = null;
        this.system_messages = null;
        this.roles = null;
        this.icon = null;
        this.banner = null;
        this.nsfw = null;
        this.flags = null;
        this.client = client;
        this._id = data._id;
        this.owner = data.owner;
        this.name = data.name;
        this.description = toNullable(data.description);
        this.channel_ids = data.channels;
        this.categories = toNullable(data.categories);
        this.system_messages = toNullable(data.system_messages);
        this.roles = toNullable(data.roles);
        this.default_permissions = data.default_permissions;
        this.icon = toNullable(data.icon);
        this.banner = toNullable(data.banner);
        this.nsfw = toNullable(data.nsfw);
        this.flags = toNullable(data.flags);
        makeAutoObservable(this, {
            _id: false,
            client: false,
        });
    }
    get channels() {
        return this.channel_ids
            .map((x) => this.client.channels.get(x))
            .filter((x) => x);
    }
    /**
     * Get timestamp when this server was created.
     */
    get createdAt() {
        return decodeTime(this._id);
    }
    /**
     * Absolute pathname to this server in the client.
     */
    get path() {
        return `/server/${this._id}`;
    }
    /**
     * Get URL to this server.
     */
    get url() {
        var _a;
        return ((_a = this.client.configuration) === null || _a === void 0 ? void 0 : _a.app) + this.path;
    }
    /**
     * Get an array of ordered categories with their respective channels.
     * Uncategorised channels are returned in `id="default"` category.
     */
    get orderedChannels() {
        const uncategorised = new Set(this.channel_ids.filter((key) => this.client.channels.has(key)));
        const elements = [];
        let defaultCategory;
        if (this.categories) {
            for (const category of this.categories) {
                const channels = [];
                for (const key of category.channels) {
                    if (uncategorised.delete(key)) {
                        channels.push(this.client.channels.get(key));
                    }
                }
                const cat = Object.assign(Object.assign({}, category), { channels });
                if (cat.id === "default") {
                    if (channels.length === 0)
                        continue;
                    defaultCategory = cat;
                }
                elements.push(cat);
            }
        }
        if (uncategorised.size > 0) {
            const channels = [...uncategorised].map((key) => this.client.channels.get(key));
            if (defaultCategory) {
                defaultCategory.channels = [
                    ...defaultCategory.channels,
                    ...channels,
                ];
            }
            else {
                elements.unshift({
                    id: "default",
                    title: "Default",
                    channels,
                });
            }
        }
        return elements;
    }
    /**
     * Get the default channel for this server
     */
    get defaultChannel() {
        var _a;
        return (_a = this.orderedChannels.find((cat) => cat.channels.length)) === null || _a === void 0 ? void 0 : _a.channels[0];
    }
    /**
     * Get an ordered array of roles with their IDs attached.
     * The highest ranking roles will be first followed by lower
     * ranking roles. This is dictated by the "rank" property
     * which is smaller for higher priority roles.
     */
    get orderedRoles() {
        var _a;
        return Object.keys((_a = this.roles) !== null && _a !== void 0 ? _a : {})
            .map((id) => {
            return Object.assign({ id }, this.roles[id]);
        })
            .sort((a, b) => (a.rank || 0) - (b.rank || 0));
    }
    /**
     * Check whether the server is currently unread
     * @param permit Callback function to determine whether a server has certain properties
     * @returns Whether the server is unread
     */
    isUnread(permit) {
        if (permit === null || permit === void 0 ? void 0 : permit.isMuted(this))
            return false;
        return this.channels.find((channel) => !(permit === null || permit === void 0 ? void 0 : permit.isMuted(channel)) && (channel === null || channel === void 0 ? void 0 : channel.unread));
    }
    /**
     * Find all message IDs of unread messages
     * @param permit Callback function to determine whether a server has certain properties
     * @returns Array of message IDs which are unread
     */
    getMentions(permit) {
        if (permit === null || permit === void 0 ? void 0 : permit.isMuted(this))
            return [];
        const arr = this.channels
            .filter((channel) => !(permit === null || permit === void 0 ? void 0 : permit.isMuted(channel)))
            .map((channel) => channel === null || channel === void 0 ? void 0 : channel.mentions);
        return [].concat(...arr);
    }
    update(data, clear = []) {
        const apply = (key, target) => {
            // This code has been tested.
            if (
            // @ts-expect-error TODO: clean up types here
            typeof data[key] !== "undefined" &&
                // @ts-expect-error TODO: clean up types here
                !isEqual(this[target !== null && target !== void 0 ? target : key], data[key])) {
                // @ts-expect-error TODO: clean up types here
                this[target !== null && target !== void 0 ? target : key] = data[key];
            }
        };
        for (const entry of clear) {
            switch (entry) {
                case "Banner":
                    this.banner = null;
                    break;
                case "Description":
                    this.description = null;
                    break;
                case "Icon":
                    this.icon = null;
                    break;
            }
        }
        apply("owner");
        apply("name");
        apply("description");
        apply("channels", "channel_ids");
        apply("categories");
        apply("system_messages");
        apply("roles");
        apply("default_permissions");
        apply("icon");
        apply("banner");
        apply("nsfw");
        apply("flags");
    }
    /**
     * Create a channel
     * @param data Channel create route data
     * @returns The newly-created channel
     */
    createChannel(data) {
        return __awaiter(this, void 0, void 0, function* () {
            return yield this.client.api.post(`/servers/${this._id}/channels`, data);
        });
    }
    /**
     * Edit a server
     * @param data Server editing route data
     */
    edit(data) {
        return __awaiter(this, void 0, void 0, function* () {
            return yield this.client.api.patch(`/servers/${this._id}`, data);
        });
    }
    /**
     * Delete a guild
     */
    delete(leave_silently, avoidReq) {
        return __awaiter(this, void 0, void 0, function* () {
            if (!avoidReq)
                yield this.client.api.delete(`/servers/${this._id}`, {
                    leave_silently,
                });
            runInAction(() => {
                this.client.servers.delete(this._id);
            });
        });
    }
    /**
     * Mark a server as read
     */
    ack() {
        return __awaiter(this, void 0, void 0, function* () {
            return yield this.client.api.put(`/servers/${this._id}/ack`);
        });
    }
    /**
     * Ban user
     * @param user_id User ID
     */
    banUser(user_id, data) {
        return __awaiter(this, void 0, void 0, function* () {
            return yield this.client.api.put(`/servers/${this._id}/bans/${user_id}`, data);
        });
    }
    /**
     * Unban user
     * @param user_id User ID
     */
    unbanUser(user_id) {
        return __awaiter(this, void 0, void 0, function* () {
            return yield this.client.api.delete(`/servers/${this._id}/bans/${user_id}`);
        });
    }
    /**
     * Fetch a server's invites
     * @returns An array of the server's invites
     */
    fetchInvites() {
        return __awaiter(this, void 0, void 0, function* () {
            return yield this.client.api.get(`/servers/${this._id}/invites`);
        });
    }
    /**
     * Fetch a server's bans
     * @returns An array of the server's bans.
     */
    fetchBans() {
        return __awaiter(this, void 0, void 0, function* () {
            return yield this.client.api.get(`/servers/${this._id}/bans`);
        });
    }
    /**
     * Set role permissions
     * @param role_id Role Id, set to 'default' to affect all users
     * @param permissions Permission value
     */
    setPermissions(role_id = "default", permissions) {
        return __awaiter(this, void 0, void 0, function* () {
            return yield this.client.api.put(`/servers/${this._id}/permissions/${role_id}`, { permissions: permissions });
        });
    }
    /**
     * Create role
     * @param name Role name
     */
    createRole(name) {
        return __awaiter(this, void 0, void 0, function* () {
            return yield this.client.api.post(`/servers/${this._id}/roles`, {
                name,
            });
        });
    }
    /**
     * Edit a role
     * @param role_id Role ID
     * @param data Role editing route data
     */
    editRole(role_id, data) {
        return __awaiter(this, void 0, void 0, function* () {
            return yield this.client.api.patch(`/servers/${this._id}/roles/${role_id}`, data);
        });
    }
    /**
     * Delete role
     * @param role_id Role ID
     */
    deleteRole(role_id) {
        return __awaiter(this, void 0, void 0, function* () {
            return yield this.client.api.delete(`/servers/${this._id}/roles/${role_id}`);
        });
    }
    /**
     * Fetch a server member
     * @param user User or User ID
     * @returns Server member object
     */
    fetchMember(user) {
        return __awaiter(this, void 0, void 0, function* () {
            const user_id = typeof user === "string" ? user : user._id;
            const existing = this.client.members.getKey({
                server: this._id,
                user: user_id,
            });
            if (existing)
                return existing;
            const member = yield this.client.api.get(`/servers/${this._id}/members/${user_id}`);
            return this.client.members.createObj(member);
        });
    }
    /**
     * Optimised member fetch route.
     * @param exclude_offline
     */
    syncMembers(exclude_offline) {
        return __awaiter(this, void 0, void 0, function* () {
            const data = yield this.client.api.get(`/servers/${this._id}/members`, { exclude_offline });
            runInAction(() => {
                if (exclude_offline) {
                    for (let i = 0; i < data.users.length; i++) {
                        const user = data.users[i];
                        if (user.online) {
                            this.client.users.createObj(user);
                            this.client.members.createObj(data.members[i]);
                        }
                    }
                }
                else {
                    for (let i = 0; i < data.users.length; i++) {
                        this.client.users.createObj(data.users[i]);
                        this.client.members.createObj(data.members[i]);
                    }
                }
            });
        });
    }
    /**
     * Fetch a server's members.
     * @returns An array of the server's members and their user objects.
     */
    fetchMembers() {
        return __awaiter(this, void 0, void 0, function* () {
            const data = yield this.client.api.get(`/servers/${this._id}/members`, { exclude_offline: false });
            // Note: this takes 986 ms (Testers server)
            return runInAction(() => {
                return {
                    members: data.members.map(this.client.members.createObj),
                    users: data.users.map(this.client.users.createObj),
                };
            });
        });
    }
    /**
     * Generate URL to icon for this server
     * @param args File parameters
     * @returns File URL
     */
    generateIconURL(...args) {
        var _a;
        return this.client.generateFileURL((_a = this.icon) !== null && _a !== void 0 ? _a : undefined, ...args);
    }
    /**
     * Generate URL to banner for this server
     * @param args File parameters
     * @returns File URL
     */
    generateBannerURL(...args) {
        var _a;
        return this.client.generateFileURL((_a = this.banner) !== null && _a !== void 0 ? _a : undefined, ...args);
    }
    /**
     * Get our own member object for this server
     */
    get member() {
        return this.client.members.getKey({
            server: this._id,
            user: this.client.user._id,
        });
    }
    /**
     * Permission the currently authenticated user has against this server
     */
    get permission() {
        return calculatePermission(this);
    }
    /**
     * Check whether we have a given permission in a server
     * @param permission Permission Names
     * @returns Whether we have this permission
     */
    havePermission(...permission) {
        return bitwiseAndEq(this.permission, ...permission.map((x) => Permission[x]));
    }
}
__decorate([
    computed
], Server.prototype, "orderedChannels", null);
__decorate([
    computed
], Server.prototype, "defaultChannel", null);
__decorate([
    computed
], Server.prototype, "orderedRoles", null);
__decorate([
    computed
], Server.prototype, "isUnread", null);
__decorate([
    computed
], Server.prototype, "getMentions", null);
__decorate([
    action
], Server.prototype, "update", null);
__decorate([
    computed
], Server.prototype, "generateIconURL", null);
__decorate([
    computed
], Server.prototype, "generateBannerURL", null);
__decorate([
    computed
], Server.prototype, "member", null);
__decorate([
    computed
], Server.prototype, "permission", null);
__decorate([
    computed
], Server.prototype, "havePermission", null);
export default class Servers extends Collection {
    constructor(client) {
        super(client);
        this.createObj = this.createObj.bind(this);
    }
    $get(id, data) {
        const server = this.get(id);
        if (data)
            server.update(data);
        return server;
    }
    /**
     * Fetch a server
     * @param id Server ID
     * @returns The server
     */
    fetch(id, data, channels) {
        return __awaiter(this, void 0, void 0, function* () {
            if (this.has(id))
                return this.$get(id, data);
            const res = data !== null && data !== void 0 ? data : (yield this.client.api.get(`/servers/${id}`, {
                include_channels: false,
            }));
            return runInAction(() => __awaiter(this, void 0, void 0, function* () {
                if (channels) {
                    for (const channel of channels) {
                        yield this.client.channels.fetch(channel._id, channel);
                    }
                }
                else {
                    for (const channel of res.channels) {
                        // ! FIXME: add route for fetching all channels
                        // ! FIXME: OR the WHOLE server
                        try {
                            yield this.client.channels.fetch(channel);
                            // future proofing for when not
                        }
                        catch (err) { }
                    }
                }
                return this.createObj(res);
            }));
        });
    }
    /**
     * Create a server object.
     * This is meant for internal use only.
     * @param data: Server Data
     * @returns Server
     */
    createObj(data) {
        if (this.has(data._id))
            return this.$get(data._id, data);
        const server = new Server(this.client, data);
        runInAction(() => {
            this.set(data._id, server);
        });
        return server;
    }
    /**
     * Create a server
     * @param data Server create route data
     * @returns The newly-created server
     */
    createServer(data) {
        return __awaiter(this, void 0, void 0, function* () {
            const { server, channels } = yield this.client.api.post(`/servers/create`, data);
            return yield this.fetch(server._id, server, channels);
        });
    }
}
__decorate([
    action
], Servers.prototype, "$get", null);
